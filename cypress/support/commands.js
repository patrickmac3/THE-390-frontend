// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="submit-button"]').click();
});

Cypress.Commands.add('goToTajMahal', () => {
  cy.contains('Dashboard').click();
  cy.contains('Profile').click();
  cy.contains('Dashboard').click();
  cy.url().should('include', '/dashboard');
  cy.wait(1000); // Waits for 1000 milliseconds
  cy.contains('Taj Mahal').click();
  cy.url().should('include', '/property-page');
});

Cypress.Commands.add('createProperty', () => {
  cy.get('[data-testid="create-property-button"]').click();
  cy.url().should('include', '/create-property');
  cy.get('[data-testid="property-name-input"]').type('test')
  cy.get('[data-testid="property-address-input"]').type('test')
  cy.get('[data-testid="property-city-input"]').type('test')
  cy.get('[data-testid="province-select-test"]').select("QC")
  cy.get('[data-testid="property-city-input"]').type('test')
  cy.get('[data-testid="property-postal-code-input"]').type('H3H3H3')
  cy.get('[data-testid="submit-button"]').click()
});

Cypress.Commands.add('createCondoUnit', () => {
  cy.get('[data-testid="create-condo-unit-button"]').click()
  cy.get('[data-testid="unit-location-input"]').type('1234')
  cy.get('[data-testid="unit-size-input"]').type('1000')
  cy.get('[data-testid="unit_purchase_price-input"]').type('1000')
  cy.get('[data-testid="unit_rental_price-input"]').type('1000')
  cy.get('[data-testid="unit-info-input"]').type('random info')
  cy.get('[data-testid="submit-button"]').click()
  cy.url().should('include', '/property-page')
});

Cypress.Commands.add('createParkingUnit', () => {
  cy.get('[data-testid="create-parking-unit-button"]').click()
  cy.get('[data-testid="parking-location-input"]').type('1234')
  cy.get('[data-testid="parking-size-input"]').type('1000')
  cy.get('[data-testid="parking-purchase_price-input"]').type('1000')
  cy.get('[data-testid="parking-rent_price-input"]').type('1000')
  cy.get('[data-testid="parking-extra_information-input"]').type('random info')
  cy.get('[data-testid="submit-button"]').click()
  cy.url().should('include', '/property-page')
});

Cypress.Commands.add('createStorageUnit', () => {
  cy.get('[data-testid="create-storage-unit-button"]').click()
  cy.get('[data-testid="locker-location-input"]').type('1234')
  cy.get('[data-testid="locker-size-input"]').type('1000')
  cy.get('[data-testid="locker-purchase_price-input"]').type('1000')
  cy.get('[data-testid="locker-rent_price-input"]').type('1000')
  cy.get('[data-testid="locker-extra_information-input"]').type('random info')
  cy.get('[data-testid="submit-button"]').click()
  cy.url().should('include', '/property-page')
});

Cypress.Commands.add('goToOperationalCostFromHomePage', () => {
  cy.contains('Dashboard').click();
  cy.contains('Operation').click();
  cy.url().should('include', '/operation');
  cy.contains('Operation Cost');
  cy.contains('Property Fees: $');
  cy.contains('Property Expenses: $');
  cy.contains('Taj Mahal');
  cy.contains('Type');
  cy.contains('Unit Number');
  cy.contains('Current Fee');
  cy.contains('Total Expenses');
  cy.contains('Enter New Expense');
  cy.contains('Save');
  cy.contains('Add');
  cy.contains('Delete');
});