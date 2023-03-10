describe('contact form', () => {
    it('should submit the form', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type('MESSAGE');
        cy.get('[data-cy="contact-input-name"]').type('NAME');
        cy.get('[data-cy="contact-input-email"]').type('EMAIL@example.com');

        // example for using "then", this could all be done with "should" / "and" as well
        cy.get('[data-cy="contact-btn-submit').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.eq('Send Message');
        });

        // works but not recommended
        const submitBtn = cy.get('[data-cy="contact-btn-submit');
        submitBtn.click();

        // recommended way (if reusing a "selector" at all)
        cy.get('[data-cy="contact-btn-submit').as('submitBtn');
        cy.get('@submitBtn').contains('Sending');
        cy.get('@submitBtn').should('be.disabled');
        // same as "be.disabled"
        cy.get('[data-cy="contact-btn-submit').should('have.attr', 'disabled');
    });

    it('should validate the form', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-btn-submit')
            .click()
            .contains('Send Message')
            .should('not.have.attr', 'disabled');
    });

    it('should submit the form using the enter key', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type('MESSAGE');
        cy.get('[data-cy="contact-input-name"]').type('NAME');
        // type email and then hit "enter"
        cy.get('[data-cy="contact-input-email"]').type('EMAIL@example.com{enter}');
    });

    it('should validate and style empty form input', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-btn-submit').click();
        cy.get('[data-cy="contact-btn-submit').then(el => {
            expect(el).to.not.have.attr('disabled');
            expect(el).to.not.equal('sending');
        });

        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').then(el => {
            el[0].focus();
            el[0].blur();
            // no worky?
            //expect(el.parent().attr('class')).to.contains('invalid');
        });

        // the same using cypress methods
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').as('msgInput');
        cy.get('@msgInput').focus();
        cy.get('@msgInput').blur();
        cy.get('@msgInput')
            .parent()
            .should(el => {
                expect(el.attr('class')).to.contains('invalid');
            });
        // chaining focus and blur
        cy.get('[data-cy="contact-input-name"]')
            .focus()
            .blur()
            .parent()
            .should('have.attr', 'class').and('match', /invalid/);
        cy.get('[data-cy="contact-input-email"]').focus().blur();


    });
});
