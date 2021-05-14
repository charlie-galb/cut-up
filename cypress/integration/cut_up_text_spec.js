describe("Cut-up app", () => {
    it('Cuts text into chunks and removes punctuation/capitalisation', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area1"]').type("One and?")
        cy.get('[data-testid="cutting-text-area2"]').type("Two and!")
        cy.get('[data-testid="cutting-text-area3"]').type("Three and.")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get('.text-snippet').first().should("have.text", "one and")
        cy.get('.text-snippet').first().next().should("have.text", "two and")
        cy.get('.text-snippet').first().next().next().should("have.text", "three and")
    })
})
