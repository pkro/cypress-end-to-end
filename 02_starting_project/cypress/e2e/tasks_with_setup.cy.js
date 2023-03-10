beforeEach(() => {
    cy.visit('http://localhost:5173/');
    //cy.contains('Add Task').click(); // does the same, just selects by inner text
    cy.get('button[data-cy="start-add-task-button"').click();
    cy.get('#new-task-form');
});

describe('task validation', () => {
    it('should not continue with nothing filled', () => {
        cy.get('button[type="submit"]').click();
        // contains can contain partial text
        cy.get('.error-message').contains('provide');
    });

    it('should not continue with just title filled', () => {
        cy.get('#title').type('NEW_TASK_TITLE');
        cy.get('button[type="submit"]').click();
        // contains can contain partial text
        cy.get('.error-message').contains('provide');
    });
    it('should not continue with just summary filled', () => {
        cy.get('#summary').type('NEW_TASK_SUMMARY');
        cy.get('button[type="submit"]').click();
        // contains can contain partial text
        cy.get('.error-message').contains('provide');
    });

    it('should continue without having to select a category as it is pre-filled', ()=> {
        cy.get('#title').type('NEW_TASK_TITLE');
        cy.get('#summary').type('NEW_TASK_SUMMARY');
        cy.get('button[type="submit"]').click();
        // contains can contain partial text
        cy.get('.error-message').should('not.exist')
    });

    it('should filter tasks', ()=>{
        cy.get('#title').type('NEW_TASK_TITLE');
        cy.get('#summary').type('NEW_TASK_SUMMARY');
        cy.get('button[type="submit"]').click();
        cy.get('#filter').select('moderate');
        cy.get('li.task').should('have.length', 1);
        cy.get('#filter').select('low');
        cy.get('li.task').should('not.exist');
    });

    it('should add multiple tasks', ()=> {
        cy.get('#title').type('TASK1');
        cy.get('#summary').type('T1 TEXT');
        cy.get('button[type="submit"]').click();
        cy.get('li.task').should('have.length', 1);

        cy.get('button[data-cy="start-add-task-button"').click();
        cy.get('#new-task-form');
        cy.get('#title').type('TASK2');
        cy.get('#summary').type('T2 TEXT');
        cy.get('button[type="submit"]').click();
        cy.get('li.task').should('have.length', 2);

        // select index 0 of the list returned by get
        cy.get('li.task').eq(0).contains('TASK1');
        cy.get('li.task').eq(1).contains('TASK2');

        // same thing (if there are 2 tasks)
        cy.get('li.task').first().contains('TASK1');
        cy.get('li.task').last().contains('TASK2');
        //cy.contains('TASK1').should('be.above', cy.contains('TASK2'))

    })

})
