describe("Add new line", () => {
    it('User can add extra lines', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="add-line-btn"]').click()
        cy.get(".lines-container").children().should("have.length", 2)
    })
})