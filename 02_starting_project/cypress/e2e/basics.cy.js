
describe('tasks page', () => {
  it('should render the main page', () => {
    // implicitly expects the page to render without giving a server error
    cy.visit('http://localhost:5173');
  });
  it('should render the logo', () => {
    cy.visit('http://localhost:5173');
    // implicitly expects the image to exist
    cy.get('.main-header img[src*="logo.png"]');
    // these tests do the same thing but with chained / scoped selectors
    cy.get('.main-header').within($myMain => {
      // only searches withing .main-header
      cy.get('img');
    });
    cy.get('.main-header').find('img');
  });
  it('should have one and only one h1 and it should have the correct text', ()=> {
    cy.visit('http://localhost:5173');
    // only one h1 should exist - explicit expectation / assertion
    cy.get('h1').should('have.length', 1);
    // contains can also be used without a previous selector, in which case
    // it tries to find the text in the whole page
    cy.get('header h1').contains('My Cypress Course Tasks');
  });
})
