describe("Output poem as text", () => {
    it("Outputs current poem as text so user can edit", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area2"]').type("one and two and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.dragAndDrop(".text-snippet", '.wip-container', -100, -170)
            .wait(500)
        cy.dragAndDrop(".text-snippet", '.wip-container', -80, -10)
            .wait(500)
        cy.get('[data-testid="textify-btn"]').click()
        cy.get('[data-testid="output-box"]').should("have.text", "one and two and \n")
    })
})