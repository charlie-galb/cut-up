describe("drag and drop", () => {
    it("user can drag and drop text chunks from the pasteboard into their current poem", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area"]').type("one and two and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get('.text-snippet').first().should("have.text", "one and")
        cy.get('.text-snippet').first().next().should("have.text", "two and")
        cy.get(".text-snippet").contains("one and")
            .focus()
            .trigger('keydown', { keyCode: 32 })
            .trigger('keydown', { keyCode: 40, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 32, force: true })
            .trigger('keydown', { keyCode: 32, force: true });
        cy.get('.text-snippet').first().should("have.text", "two and")
        cy.get('.text-snippet').first().next().should("have.text", "one and")
    })
})