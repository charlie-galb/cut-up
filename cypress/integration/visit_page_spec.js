describe("Cut-up app", () => {
    it('Has a main page with a title', () => {
        cy.visit('http://localhost:3000/')
        cy.contains("Cut-up App").should("be.visible")
    })
})