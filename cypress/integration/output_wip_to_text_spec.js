describe("Output poem as text", () => {
    it("Outputs current poem as text so user can edit", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area2"]').type("one and one and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.dragAndDrop(".text-snippet", '[data-testid="line-1"]')
            .wait(500)
        cy.get('[data-testid="add-line-btn"]').click()
        cy.dragAndDrop(".text-snippet", '[data-testid="line-2"]')
            .wait(500)
        cy.get('[data-testid="textify-btn"]').click()
        cy.get('[data-testid="pop-up-text"]').should("have.text", "one and \none and \n")
    })
})