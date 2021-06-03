const sizes = ['iphone-6', 'ipad-2', [1024, 768]]

describe("drag and drop", () => {
    sizes.forEach((size) => {
        it("user can reorder chunks in the pasteboard using drag and drop", () => {
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }
            cy.visit('http://localhost:3000/')
            cy.get('[data-testid="cutting-text-area1"]').type("one and two and")
            cy.get('[data-testid="cut-btn"]').click()
            cy.get(".text-snippet")
                .first()
                .as('first')
                .invoke('text')
                .then((text1) => {
                    cy.moveTo('@first', 200, 0)
                    cy.get(".text-snippet")
                        .first()
                        .invoke('text')
                        .should((text2) => {
                            expect(text2).not.to.eq(text1)
                        })
                     })
        })
        it("user can move chunks from the pasteboard into their current work-in-progress using drag and drop", () => {
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }
            cy.visit('http://localhost:3000/')
            cy.get('[data-testid="cutting-text-area2"]').type("one and")
            cy.get('[data-testid="cut-btn"]').click()
            cy.dragAndDrop(".text-snippet", '.wip-container')
            cy.get('[data-testid="line-1"] .text-snippet').should("have.text", "one and")
        })
        it("user can move chunks back and forth between the pasteboard their current work-in-progress", () => {
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }
            cy.visit('http://localhost:3000/')
            cy.get('[data-testid="cutting-text-area3"]').type("one and")
            cy.get('[data-testid="cut-btn"]').click()
            cy.dragAndDrop(".text-snippet", '[data-testid="line-1"]')
            .wait(1000)
            cy.get('[data-testid="line-1"] .text-snippet').should("have.text", "one and")
            cy.dragAndDrop('[data-testid="line-1"] .text-snippet', '[data-testid="pasteboard"]')
            .wait(500)
            cy.get('[data-testid="pasteboard"] .text-snippet').should("have.text", "one and")
        })
    })
})