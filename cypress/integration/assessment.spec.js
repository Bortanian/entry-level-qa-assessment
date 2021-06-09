//Custom Command to open the resources tab and select the redirect.
Cypress.Commands.add('resourcesTab', (redirect) => {
    cy.get('[id="w-dropdown-toggle-1"]').trigger('mouseover')
    cy.get('[class="menu-title"]').contains(redirect).click()
})

describe('QA Assessment', () => {
//Test the path of finding the support docs to change password... Cypress does not support multi tab testing.
    it('Support - Change Password', () => {        
        cy.visit('https://www.award.co/')
        cy.get('[id="w-dropdown-toggle-1"]').trigger('mouseover')
        cy.get('a[href="http://support.awardco.com"]').should('have.attr', 'target', '_blank')
    })
//Test the path of finding the Hunt Brother Pizza customer story.
    it('Customer Stories - Hunt Brother Pizza', () => {
        cy.visit('https://www.award.co/')
        cy.resourcesTab('Customer Stories')
        cy.url().should('include', '/customers')
        cy.get('[class^="blog-card"]').contains('Hunt Brothers Pizza').click()
        cy.url().should('include', '/hunt-brothers-pizza')
    })
//Test the path of a user trying to submit an incomplete form to talk to a sales representative.
    it('Talk to Sales Submition - Missing Field', () => {
        cy.visit('https://www.award.co/')
        cy.get('a[href="/demo"]').contains('Talk to Sales').click()
        cy.url().should('include', '/demo')
    //Fill Form
        cy.get('[id^=firstname-]').type('Bob').should('have.value', 'Bob')
        cy.get('[id^=lastname-]').type('Johnson').should('have.value', 'Johnson')
        cy.get('[id^=email-]').type('Bob.Johnson@email.com').should('have.value', 'Bob.Johnson@email.com')
        cy.get('[id^=company-]').type('Johnsonessities').should('have.value', 'Johnsonessities')
    //Sumbit incomplete form and check for error
        cy.get('[class="hs-button primary large"]').click()
        cy.get('[id^=phone-]').should('have.class', 'invalid error')
    })
})