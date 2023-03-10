// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('submitForm', ()=> {
    cy.get('form button[type="submit"]').click();
})

// the parameter goes into the callback, not in the returned function!
Cypress.Commands.addQuery('getById', (cyAttribute) => {
    // prepare custom query ofr future execution
    const getFn = cy.now('get', `[data-cy="${cyAttribute}"]`);
    return () => {
        // runs when the query is actually run in the test
        return getFn();
    }
});
