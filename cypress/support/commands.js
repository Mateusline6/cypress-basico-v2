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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

    Cypress.Commands.add('fillMandatoryFileAndSubmit', function(nome, sobreNome, email, comentario){

        cy.get('#firstName').type(nome, {delay: 0})
        cy.get('#lastName').type(sobreNome, {delay: 0})
        cy.get('#email').type(email, {delay: 0})
        cy.get('#open-text-area').type(comentario, {delay: 0})
        cy.contains('button', 'Enviar').click()
       

    })


    Cypress.Commands.add('markEachTypeOfService', function(input){
        cy.get(input).check().should('be.checked')
    })

    Cypress.Commands.add('selectProduct', function(product , index, value){
        cy.get(product)
            .select(index)
            .should('have.value', value)
    })