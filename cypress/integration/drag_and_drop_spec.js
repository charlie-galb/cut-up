describe("drag and drop", () => {
    it("user can reorder chunks in the pasteboard using drag and drop", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area"]').type("one and two and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get(".text-snippet").contains("one and")
            .focus()
            .trigger('keydown', { keyCode: 32 })
            .trigger('keydown', { keyCode: 39, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 32, force: true })
            .trigger('keydown', { keyCode: 32, force: true });
        cy.get('.text-snippet').first().should("have.text", "two and")
        cy.get('.text-snippet').first().next().should("have.text", "one and")
    })
    it("user can move chunks from the pasteboard into their current work-in-progress using drag and drop", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area"]').type("one and two and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.dragAndDrop(".text-snippet", ".wip-container")
        cy.get('[data-testid="wip-snippets"] .text-snippet').first().should("have.text", "one and")
    })
})