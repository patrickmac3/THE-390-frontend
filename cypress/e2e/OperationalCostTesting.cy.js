describe('As a Company employee Navigate to operational tab in the navigation bar and back', () => {
    beforeEach(() => {
        cy.login('joud.babik@gmail.com', '123qweasd');
    })
    it('Navigate to Property Page from Profile', () => {
        cy.goToOperationalCostFromHomePage();
        cy.contains('CondoCare').click();
    })
})

describe('Operation Expenses Test', () => {
    beforeEach(() => {
        cy.login('joud.babik@gmail.com', '123qweasd');
        cy.goToOperationalCostFromHomePage();
    });
    it('should add a new expense correctly', () => {
        const unitLocation = 106;
        cy.get(`[data-testid="total-expenses-${unitLocation}"]`).invoke('text').then((initialExpenses) => {
            const initialExpenseAmount = parseFloat(initialExpenses.replace(/[^0-9.-]+/g, ""));
            const newExpense = 100;
            cy.get(`[data-testid="expense-input-${unitLocation}"]`).type(`${newExpense}`);
            cy.get(`[data-testid="add-expense-${unitLocation}"]`).click();
            cy.get(`[data-testid="total-expenses-${unitLocation}"]`, { timeout: 10000 }).should(($div) => {
                const newExpenseAmount = parseFloat($div.text().replace(/[^0-9.-]+/g, ""));
                expect(newExpenseAmount).to.eq(initialExpenseAmount + newExpense);
            });
        });
    });
    it('should subtract a new expense correctly', () => {
        const unitLocation = 106;
        cy.get(`[data-testid="total-expenses-${unitLocation}"]`).invoke('text').then((initialExpenses) => {
            const initialExpenseAmount = parseFloat(initialExpenses.replace(/[^0-9.-]+/g, ""));
            const newExpense = 100;
            cy.get(`[data-testid="expense-input-${unitLocation}"]`).type(`${newExpense}`);
            cy.get(`[data-testid="delete-expense-${unitLocation}"]`).click();
            cy.get(`[data-testid="total-expenses-${unitLocation}"]`, { timeout: 10000 }).should(($div) => {
                const newExpenseAmount = parseFloat($div.text().replace(/[^0-9.-]+/g, ""));
                expect(newExpenseAmount).to.eq(initialExpenseAmount - newExpense);
            });
        });
    });
});
