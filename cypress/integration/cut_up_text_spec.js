describe("Cut-up feature", () => {
    it('Cuts text into chunks and removes punctuation/capitalisation', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area1"]').type("One and?")
        cy.get('[data-testid="cutting-text-area2"]').type("Two and!")
        cy.get('[data-testid="cutting-text-area3"]').type("Three and.")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get('.text-snippet').contains("one and").should("be.visible")
        cy.get('.text-snippet').contains("two and").should("be.visible")
        cy.get('.text-snippet').contains("three and").should("be.visible")
    })
    it('Resets when the cut button is clicked, avoiding duplicate text snippets', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area1"]').type("One and?")
        cy.get('[data-testid="cutting-text-area2"]').type("Two and!")
        cy.get('[data-testid="cutting-text-area3"]').type("Three and.")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get('[data-testid="unused-snippets"]').children().should('have.length', 3)
    })
})
