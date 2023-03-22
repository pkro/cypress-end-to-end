/// <reference types="Cypress" />

describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should sign a user up to the newsletter via the sign up form', () => {
        // typically set up before cy.visit or in beforeEach as it's a setup for the actual test
        // intercepts any HTTP POST request to localhost:3000/newsletter... (* is a wildcard)
        cy.intercept('POST',
            '/newsletter*', {status: 201}) // the base api path is already set up in the cypress config file
            .as('subscribe'); // optionally set up an alias

        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test99@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe'); // wait for the intercepted request to finish - usually not necessary
        cy.get('[data-cy="newsletter-email"]').should('not.exist');
        cy.get('footer').should('contain.text', 'Thanks for signing');

    });

    it('should display validation errors', ()=> {
        cy.intercept('POST', '/newsletter*', {message: 'Email exists already'}).as('subscribe');

        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test2@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.get('[data-cy="newsletter-email"]').should('exist');
        cy.get('footer').should('contain.text', 'exists already');
    });

    it('should successfully create a new contact', ()=> {
      cy.request({
          method: 'POST',
          url: '/newsletter',
          body: {email: 'test@example.com'},
          form: true // if formdata is sent, for just JSON data not necessary
      }).then(res => {
          expect(res.status).to.equal(201);
      })
    });
});
