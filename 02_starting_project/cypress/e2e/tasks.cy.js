describe('tasks management', ()=>{
    it('should  open and close the new task modal', ()=> {
        cy.visit('http://localhost:5173/');
        //cy.contains('Add Task').click(); // does the same, just selects by inner text
        cy.get('button[data-cy="start-add-task-button"').click();
        cy.get('#new-task-form');

        // test closing

        // this doesn't work as cypress, by default, clicks in the middle of the screen,
        // which is covered by the form popup
        // cy.get('.backdrop').click();

        // workaround 1: force click even if element is covered
        cy.get('.backdrop').click({
            force: true
        });

        // workaround 2: specify click position
        // cy.get('.backdrop').click("topLeft");

        // check if modal is closed now
        cy.get('.backdrop').should('not.exist') // the backdrop is the modals backdrop so it should be gone now, too
        cy.get('dialog.modal').should('not.exist')

        // check if it can be closed with the cancel button, too
        cy.get('button[data-cy="start-add-task-button"').click();

        // the button only exists if the modal is open, so we don't have to
        // check if the dialog is open
        cy.get('.actions button:first-child').click();
        cy.get('dialog.modal').should('not.exist')
    })
})

describe('task creation', ()=> {
    it('should open the new task modal and create a task and save it', ()=> {
        cy.visit('http://localhost:5173/');
        cy.get('button[data-cy="start-add-task-button"').click();
        cy.get('#title').type('NEW_TASK_TITLE');
        cy.get('#summary').type('NEW_TASK_SUMMARY');
        cy.get('#category').select('urgent');

        cy.get('button[type="submit"]').click();
        cy.get('dialog.modal').should('not.exist')

        cy.get('li.task').should('have.length', 1);
        cy.get('.task h2').contains('NEW_TASK_TITLE');
        cy.get('.task p').contains('NEW_TASK_SUMMARY');
        cy.get('.task .task-category').contains('🚨');
    });

    it('should validate user input for all fields', ()=> {
        cy.visit('http://localhost:5173/');
        cy.get('button[data-cy="start-add-task-button"').click();

        // 1. We select / type nothing
        //cy.get('#title').type('NEW_TASK_TITLE');
        //cy.get('#summary').type('NEW_TASK_SUMMARY');
        //cy.get('#category').select('moderate');
        cy.get('button[type="submit"]').click();
        // contains can contain partial text
        cy.get('.error-message').contains('provide');

        // 2. partial fill out tests
        cy.get('#title').type('NEW_TASK_TITLE');
        //cy.get('#summary').type('NEW_TASK_SUMMARY');
        //cy.get('#category').select('moderate');
        cy.get('button[type="submit"]').click();
        // contains can contain partial text
        cy.get('.error-message').contains('provide');
    });
})
