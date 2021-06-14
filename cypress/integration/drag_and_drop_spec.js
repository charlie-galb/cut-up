describe("drag and drop", () => {
    it("user can reorder chunks in the pasteboard using drag and drop", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area1"]').type("one and two and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.get(".text-snippet")
            .first()
            .as('first')
            .invoke('text')
            .then((text1) => {
                cy.get(".text-snippet").first().next().as('second')
                cy.dragAndDrop('@first','@second')
                    .wait(500)
                cy.get(".text-snippet")
                    .first()
                    .invoke('text')
                    .should((text2) => {
                        expect(text2).not.to.eq(text1)
                    })
                })
    })
    it("user can move chunks from the pasteboard into their current work-in-progress using drag and drop", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="cutting-text-area2"]').type("one and")
        cy.get('[data-testid="cut-btn"]').click()
        cy.dragAndDrop(".text-snippet", '[data-testid="line-1"]')
        cy.get('[data-testid="line-1"] .text-snippet').should("have.text", "one and")
    })
    it("user can move chunks back and forth between the pasteboard their current work-in-progress", () => {
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