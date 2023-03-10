/// <reference types="cypress" />

describe('share location', () => {
  it('should fetch the user location', () => {
    cy.visit('/').then(win=>{
      // replaces window.navigator.geolocation() method with an empty method
      // during runtime
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .as('getUserPosition') // assign alias
          .callsFake((callBack)=>{
            // if we immediately execute the callBack, the button will never
            // be disabled in the UI as it happens too fast so the DOM will never
            // go to the disabled state (as it's so fast it will happen between
            // render frames)
            // Solution: simulate execution time by using a setTimeout
            setTimeout(()=>{
              const fakePositionObject = {
                coords: {
                  latitude: 37.5,
                  longitude: 48.01,
                }
              }
              // calls the passed in callback with the expected object
              callBack(fakePositionObject);
            }, 100);

          })
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    // aliases defined inside then are still available outside of it!
    cy.get('@getUserPosition').should('have.been.called');

    // check if button is disabled after click
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');

    // fails because getCurrentPosition is just an empty function so far which doesn't do anything
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
  });
});
