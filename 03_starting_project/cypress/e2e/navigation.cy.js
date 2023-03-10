describe('page navigation', ()=> {
    it('should navigate between pages', ()=> {
        cy.visit('http://localhost:5173');
        // recommended selection by data-cy attribute
        cy.get('[data-cy="header-about-link"]').click();
        // check URL
        cy.location('pathname').should('equal', '/about');
        // just make sure the page in the url actually matches what we expect
        cy.get('[data-cy="about-header"');
        // test back button
        cy.go('back');
        cy.location('pathname').should('equal', '/');

        // check "Home" link on about page
        cy.get('[data-cy="header-about-link"]').click();
        cy.get('[data-cy="header-home-link"]').click();
        cy.location('pathname').should('equal', '/');
    })
})
