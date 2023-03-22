/// <reference types="Cypress" />

describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
        cy.visit('/');
    });


    it('should sign a user up to the newsletter via the sign up form', () => {
        cy.get('[data-cy="newsletter-email"]').type('test99@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.get('[data-cy="newsletter-email"]').should('not.exist');
        cy.get('footer').should('contain.text', 'Thanks for signing');

    });

    it('should show an error if the users email already exists when signing up', () => {
        cy.get('[data-cy="newsletter-email"]').type('test2@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.get('[data-cy="newsletter-email"]').should('exist');
        cy.get('footer').should('contain.text', 'exists already');

    });
});
