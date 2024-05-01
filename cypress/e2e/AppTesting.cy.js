

const { Link } = require("react-router-dom")

/* In this file, we are testing the following:
  -Entering the site and navigating to the login page
  -Entering the site and navigating to the profile page
  -Filling out the sign-up form and submitting successfully
  -Filling out the login form and submitting successfully
  -Opening the profile editing modal and submitting successfully
  -Logging out
*/

describe('Header Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to login page', () => {
    cy.contains('LOGIN').click();
    cy.url().should('include', '/login');
  });
});


describe('Sign Up Form', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should fill out the sign-up form and submit successfully', () => {
    cy.get('[data-testid="first-name-input"]').type('Jennifer')
    cy.get('[data-testid="last-name-input"]').type('Lennon')
    cy.get('[data-testid="phone-number-input"]').type('1234567890')
    // cy.get('[data-testid="registration-key-input"]').type('exampleKey')
    cy.get('[data-testid="email-input"]').type('testuser123@example.com')
    cy.get('[data-testid="password-input"]').type('password123')
    cy.get('[data-testid="confirm-password-input"]').type('password123')
    cy.get('[data-testid="address-input"]').type('123 Main St')
    cy.get('[data-testid="city-input"]').type('Anytown')
    cy.get('[data-testid="province-select"]').select('BC')
    cy.get('[data-testid="postal-code-input"]').type('12345')
    cy.get('[data-testid="submit-button"]').click()
  })
})

describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should fill out the form and submit successfully', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('[data-testid="password-input"]').type('password123')
    cy.get('[data-testid="submit-button"]').click()
  })
})

describe('Profile Editing Modal', () => {
  beforeEach(() => {
    cy.visit('/profile')
  });
  it('should open the modal when the "Edit Profile" button is clicked', () => {

    cy.contains('Edit Profile').should('be.visible');
    cy.get('[data-testid="edit-profile"]').click();
    cy.get('[data-testid="phone-number-input1"]').clear().type('0987654321');
    cy.get('[data-testid="address-input1"').clear().type('123 Elm St');
    cy.get('[data-testid="secondary"]').click();
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('[data-testid="edit-profile"]').click();
  });
});
describe('Logout', () => {
  it('Login and then logout', () => {
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('[data-testid="password-input"]').type('password123')
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid ="logout"]').click();
    cy.url().should('include', '/login');
  });
})
