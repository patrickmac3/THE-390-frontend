describe('As a Company employee Navigate to Property Page from Profile and go back', () => {
  beforeEach(() => {
    cy.login('joud.babik@gmail.com', '123qweasd');
  })
  it('Navigate to Property Page from Profile', () => {
    cy.goToProperty3();
    cy.get('[data-testid="dashboard-return"]').click()
  })
})

describe('Navigate to Create Unit/Parking/Locker Form from Profile and go back', () => {
  beforeEach(() => {
    cy.login('joud.babik@gmail.com', '123qweasd');
  })

  it('Navigate to Create Unit from profile', () => {
    cy.goToProperty3();
    cy.get('[data-testid="create-condo-unit-button"]').click()
    cy.contains('Cancel').click();
    cy.url().should('include', '/property-page')
  })
})

describe('Navigate to Create Property Form from Profile and go back', () => {
  beforeEach(() => {
    cy.login('joud.babik@gmail.com', '123qweasd');
  })
  it('Navigate to Create Property from Profile', () => {
    cy.goToProperty3();
    cy.contains('Dashboard').click();
    cy.url().should('include', '/dashboard');
  })
})

describe('Sign in as company and Navigate to Create property and create condo unit', () => {
  beforeEach(() => {
    cy.login('joud.babik@gmail.com', '123qweasd');
  })
  it('Navigate to Create Property from Profile', () => {
    cy.contains('Dashboard').click();
    cy.contains('Profile').click();
    cy.contains('Dashboard').click();
    cy.createProperty();
  })
  it('Navigate to create condo unit from property page and creates a condo unit', () => {
    cy.goToProperty3();
    cy.createCondoUnit();
  })
})

describe('Sign in as company and Navigate to create a parking unit', () => {
  before(() => {
    cy.login('joud.babik@gmail.com', '123qweasd');
  })
  it('Navigate to create parking unit from property page', () => {
    cy.goToProperty3();
    cy.createParkingUnit();
  })
})

describe('Sign in as company and Navigate to create a storage unit', () => {
  before(() => {
    cy.login('joud.babik@gmail.com', '123qweasd');
  })
  it('Navigate to create parking unit from property page', () => {
    cy.goToProperty3();
    cy.createStorageUnit();
  })
})

