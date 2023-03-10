describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
    cy.get('main > ul li').should('have.length', 6);
  })
})
