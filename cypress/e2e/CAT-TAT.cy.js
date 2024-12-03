//// <reference types="Cypress" />

describe('Central de atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000

 beforeEach(function(){
      
      cy.viewport(550, 750) 
      cy.visit('./src/index.html')
      
 })
 
  it('verifica o titulo da aplicacao', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


  it('Preenche os campos obrigatorios e envia o formulario', function() {
    cy.clock()
    cy.get('#firstName').type('Mateus', {delay: 0})
    cy.get('#lastName').type('Padial', {delay: 0})
    cy.get('#email').type('mateuspadial@gmail.com', {delay: 0})
    cy.get('#open-text-area').type('Obrigado pela mentoria', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })


  it('Exibe mensagem de erro ao submeter o formulario com o email com formatação invalida', function() {
    cy.clock()
    cy.get('#firstName').type('Mateus', {delay: 0})
    cy.get('#lastName').type('Padial', {delay: 0})
    cy.get('#email').type('mateuspadialgmail.com', {delay: 0})
    cy.get('#open-text-area').type('Obrigado pela mentoria', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })

  Cypress._.times(5, function(){
    it('Campo telefone continua vazio ao ser preenchido com valor não numerico', function() {
      cy.get('#phone')
        .type('aufasdgsdg',{delay: 0})
        .should('have.value', '')
    })
  })
 


  it('Exibe mensagem de erro quando telefone se torna obrigatorio mas não é preenchido antes do envio do formulario', function() {
    cy.clock()
    cy.get('#firstName').type('Mateus', {delay: 0})
    cy.get('#lastName').type('Padial', {delay: 0})
    cy.get('#email').type('mateuspadialgmail.com', {delay: 0})
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Obrigado pela mentoria', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })


  it('Deve limpar os campos apos ser digitados', function() {
    cy.get('#firstName')
      .type('Mateus', {delay: 0})
      .should('have.value', 'Mateus')
      .clear().should('have.value', '')
    cy.get('#lastName')
      .type('Padial', {delay: 0})
      .should('have.value', 'Padial')
      .clear().should('have.value', '')
    cy.get('#email')
      .type('mateuspadial@gmail.com', {delay: 0})
      .should('have.value', 'mateuspadial@gmail.com')
      .clear().should('have.value', '')
    cy.get('#phone')
      .type('11970146335',{delay: 0})
      .should('have.value', '11970146335')
      .clear().should('have.value', '')
    cy.get('#open-text-area')
      .type('Obrigado pela mentoria', {delay: 0})
      .clear().should('have.value', '')
  })


  it('Erro ao submeter o formulario sem preencher os campos obrigatorios', function() {
   cy.clock()
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible')
      cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })


  
  it('Envia o formulario com sucesso usuando comando customizado', function(){
    cy.clock()
    cy.fillMandatoryFileAndSubmit('Mateus', 'Padial', 'mateuspadial@gmail.com', 'Obrigado')
    cy.get('.success')
      .should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
      cy.get('.success')
      .should('not.be.visible')
  })

  it('Envia o formulario sem sucesso usuando comando customizado', function(){
    cy.clock()
    cy.fillMandatoryFileAndSubmit('Mateus', 'Padial', 'mateuspadialgmail.com', 'Obrigado')
    cy.get('.error')
      .should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error')
      .should('not.be.visible')
  })

  it('Seleciona um produto youtube por seu texto', function(){
   cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('Seleciona um produto mentoria por seu valor', function(){
    cy.get('#product')
     .select('mentoria')
     .should('have.value', 'mentoria')
   })

   it('Seleciona um produto blog por seu indice', function(){
    cy.get('#product')
     .select(1)
     .should('have.value', 'blog')
   })

   it('Seleciona um produto por seu indice commands', function(){
    cy.selectProduct('#product', 2 ,'cursos')

   })


   it('Marca tipo  de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')
     
   })
 
   it('Marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.lengthOf', 3)
        .each(function($radio){
           cy.wrap($radio).check()
           cy.wrap($radio).should('be.checked')
        })
   })

   it('Marca cada tipo de atendimento commands', function(){

      cy.markEachTypeOfService('input[type="radio"][value="feedback"]')
      cy.markEachTypeOfService('input[type="radio"][value="elogio"]')
      cy.markEachTypeOfService('input[type="radio"][value="ajuda"]')

   })

   it('Marca cada tipo checkbox', function(){

    cy.get('input[type="checkbox"]')
      .should('have.lengthOf', 2)
      .each(function($checkbox){
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')
        cy.wrap($checkbox).uncheck()
       
      })
   })


   it('Marca cada tipo checkbox e desmarca o ultimo', function(){

    cy.get('input[type="checkbox"]')
      .should('have.lengthOf', 2).check()
      .last()
      .uncheck()
      .should('not.be.checked')
   })

  it('Seleciona um arquivo da pasta fixtures', function(){

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
      })

  })


  it('Seleciona um arquivo simulando drag-drop', function(){

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { daction: 'drag-drop'})
      .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
      })

    })

    it('Seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function(){

      cy.fixture('example.json').as('sampleFile')

      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
  
      })

    it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de abrir outra aba', function(){

        cy.get('#privacy a').should('have.attr', 'target', '_blank')

      })


      it('Abre a politica de privacidade sem a necessidade de abrir outra aba', function(){

        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
        cy.contains('Talking About Testing').should('be.visible')
  
        })


      it('exibe e esconde as mensagens de sucesso e erro usando o _.invoke', function() {
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
      })


      it('preenche a area de texto usando comando invoke', function(){

        const longText = Cypress._.repeat('0123456789',20)
        cy.get('#open-text-area')
          .invoke('val', longText)
          .should('have.value', longText)
      })


      it('faz um requisição http', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
          const {status, statusText, body} = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')
        })

      })

      it.only('Encontre o gato', function(){
        cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .invoke('hide')

      })

})