describe("Cut-up app", () => {
    it('Cuts text into chunks and removes punctuation/capitalisation', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area"]').type("This should be unformatted, no?")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get('.text-snippet').first().should("have.text", "this should")
        cy.get('.text-snippet').first().next().should("have.text", "be unformatted")
        cy.get('.text-snippet').first().next().next().should("have.text", "no")
    })
})
