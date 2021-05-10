describe("drag and drop", () => {
    it("user can drag and drop text chunks, changing their order", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area"]').type("one and two and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get('ul li').first().should("have.text", "one and")
        cy.get('ul li').first().next().should("have.text", "two and")
    })
})