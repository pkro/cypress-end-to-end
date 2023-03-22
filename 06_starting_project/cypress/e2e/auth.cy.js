
describe('Auth', ()=>{
    beforeEach(() => {
        cy.task('seedDatabase');
    });
    it('should sign up a user', ()=>{
        cy.visit('/signup');
        cy.get('[data-cy="auth-email"]').click();
        cy.get('[data-cy="auth-email"]').type("test2@example.com");
        cy.get('[data-cy="auth-password"]').type("password");
        cy.get('[data-cy="auth-submit"]').click();

        // 2 indicators that the signup process has succeeded for this application:
        // - url should contain /takeaways
        cy.location('pathname').should("eq", '/takeaways')

        // - session cookie should exist
        cy.getCookie('__session')
            .its('value') // Get a property's value on the previously yielded subject. https://docs.cypress.io/api/commands/its
            .should('not.be.empty');
    });

    // previous user can't be used as the db is reseeded before every test
    // cookies are automatically cleared by cypress
    it('should login', ()=>{
        cy.login();
    })

    it('should logout', ()=>{
        cy.login();
        cy.contains('Logout').click();
        cy.location('pathname').should("eq", '/')
        cy.getCookie('__session').its('value').should('be.empty');
    })
})
