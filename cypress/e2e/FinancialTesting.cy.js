describe('Financial Component Tests', () => {
    beforeEach(() => {
        cy.login('joud.babik@gmail.com', '123qweasd');
        // Mock the API response if needed
        cy.intercept('GET', /\/profiles\/company-profile\/\d+\/finance-report\//, { fixture: 'financials.json' }).as('fetchFinancials');
    });

    it('Navigate to Dashboard from Profile', () => {
        cy.contains('Dashboard').click();
    })
    it('Navigate to Dashboard from Profile and then confirms the financial details are present', () => {
        const name = 'Taj Mahal';
        cy.contains('Dashboard').click();
        cy.contains('Financial Details').should('exist');
        cy.contains('Taj Mahal').should('exist');
        cy.get(`[data-testid="fee-test-${name}"]`).click();
        cy.contains('Condo Number').should('exist');
        cy.contains('Parking Number').should('exist');
        cy.contains('Storage Number').should('exist');
    })
});
