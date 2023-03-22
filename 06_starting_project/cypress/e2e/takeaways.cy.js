/// <reference types="Cypress" />

describe('Takeaways', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
        cy.visit('/');
    });
    it('should display a list of fetched takeaways', () => {
        cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
    });

    it('should create a new takeaway', () => {
        // block request and stub response
        cy.intercept('POST',
            '/takeaways/new*',
            'success') // the response can be anything we like, e.g. a string we can test easily
            .as('createTakeaway'); // needed later
        cy.login();
        cy.visit('/takeaways/new');
        cy.get('[data-cy="title"]').click();
        cy.get('[data-cy="title"]').type('TestTitle1');
        cy.get('[data-cy="body"]').type('TestBody1');
        cy.get('[data-cy="create-takeaway"]').click();
        cy.wait('@createTakeaway') // wait is needed so we can look at what's posted
            .its('request.body') //
            .should('match', /.*TestTitle.*TestBody1/)
    });
});
