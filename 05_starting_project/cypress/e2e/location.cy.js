/// <reference types="cypress" />

beforeEach('share location', () => {
    // make clock / tick available in tests
    cy.clock(); // must be called before initializing the tests
    // no path necessary if it's in the fixtures folder
    // also converts the json to a plain JS object automatically
    cy.fixture('user-location.json').as('userLocation');
    cy.visit('/').then(win => {
        cy.get('@userLocation').then(fakePosition => {
            // replaces window.navigator.geolocation() method with an empty method
            // during runtime
            cy.stub(win.navigator.geolocation, 'getCurrentPosition')
                .as('getUserPosition') // assign alias
                .callsFake((callBack) => {
                    // if we immediately execute the callBack, the button will never
                    // be disabled in the UI as it happens too fast so the DOM will never
                    // go to the disabled state (as it's so fast it will happen between
                    // render frames)
                    // Solution: simulate execution time by using a setTimeout
                    setTimeout(() => {
                        // calls the passed in callback with the expected object
                        callBack(fakePosition);
                    }, 100);
                });
        });



        // stub with empty function that returns a promise that resolves immediately
        cy.stub(win.navigator.clipboard, 'writeText').as('saveToClipboard').resolves();

        // set up spies
        cy.spy(win.localStorage, 'setItem').as('storeLocation');
        cy.spy(win.localStorage, 'getItem').as('getLocation');

    });
});
describe('share location', () => {
    it('should fetch the user location', () => {

        cy.get('[data-cy="get-loc-btn"]').click();
        // aliases defined inside then are still available outside of it!
        cy.get('@getUserPosition').should('have.been.called');

        // check if button is disabled after click
        cy.get('[data-cy="get-loc-btn"]').should('be.disabled');

        // fails because getCurrentPosition is just an empty function so far which doesn't do anything
        cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
    });

    it('should copy the location to the clipboard', () => {
        cy.get('[data-cy="name-input"]').type("John Doe");
        cy.get('[data-cy="get-loc-btn"]').click();
        cy.get('[data-cy="share-loc-btn"]').click();
        cy.get('@saveToClipboard').should('have.been.called');
        // check if it is called with a correct argument
        cy.get('@userLocation').then(fakePosition=>{
            const {latitude, longitude} = fakePosition.coords;
            cy.get('@saveToClipboard').should('have.been.calledWithMatch',
                new RegExp(`.*${latitude}.*${longitude}.*${encodeURI('John Doe')}`));
            cy.get('@storeLocation').should('have.been.called');
            cy.get('@storeLocation').should('have.been.calledWithMatch', /John Doe/, new RegExp(`.*${latitude}.*${longitude}.*${encodeURI('John Doe')}`));
            cy.get('@getLocation').should('have.been.called');

            cy.get('[data-cy="info-message"]').should('be.visible');
            // alternatively if exact class matters:
            cy.get('[data-cy="info-message"]').should('have.class', 'visible');

            cy.tick(2000); // forward the clock by 2 seconds
            // would also work without setting the timer in this case as cypress waits / retries
            // for up to 4 seconds for the test to pass, and the message disappears after 2 seconds
            cy.get('[data-cy="info-message"]').should('not.be.visible');


        });
    });
});
