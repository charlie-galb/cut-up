describe("Cut-up app", () => {
    it('Has a main page with a title', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area"]').type("one and two and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get('.text-snippet').first().should("have.text", "one and")
        cy.get('.text-snippet').first().next().should("have.text", "two and")
    })
})
