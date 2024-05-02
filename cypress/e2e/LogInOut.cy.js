describe('As a Company employee Login', () => {
    it('Login successfully ', () => {
        cy.login('joud.babik@gmail.com', '123qweasd');
        cy.contains('CondoCare');
        cy.contains('Welcome to CondoCare');
        cy.contains('Get Ready for Easy Property Management!');
        cy.contains('Operation')
        cy.contains('Profile')
        cy.contains('Dashboard')
        cy.contains('LOGOUT')
    })
    it('Logout successfully ', () => {
        cy.login('joud.babik@gmail.com', '123qweasd');
        cy.contains('LOGOUT').click();
        cy.contains('Welcome Back!')
        cy.contains('Email')
        cy.contains('Password')
    })
})