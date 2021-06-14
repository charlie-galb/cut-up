Cypress.Commands.add('dragAndDrop', (subject, target) => {
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;
    cy.get(target)
        .first()
        .then($target => {
            let coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .first()
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger('mousedown', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .wait(500)
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .wait(500);
                    cy.get('body')
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true            
                        })
                        .wait(500)
                        .trigger('mouseup', {force: true});
                });
        });
});

Cypress.Commands.add('dragDropAdjust', (subject, target, xAdjustment = 0, yAdjustment = 0) => {
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    cy.get(target)
        .first()
        .then($target => {
            let coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .first()
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger('mousedown', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .wait(500)
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + xAdjustment,
                            clientY: coordsDrag.y + yAdjustment,
                            force: true
                        })
                        .wait(500);
                    cy.get('body')
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x + xAdjustment,
                            clientY: coordsDrop.y + yAdjustment,
                            force: true            
                        })
                        .wait(500)
                        .trigger('mouseup', {force: true});
                });
        });
});

// Cypress.Commands.add('moveTo', (subject, xAdjustment, yAdjustment) => {
//     Cypress.log({
//         name: 'moveTo',
//         message: `Moving element ${subject} to ${xAdjustment}, ${yAdjustment}`,
//         consoleProps: () => {
//             return {
//                 subject: subject,
//                 x: xAdjustment,
//                 y: yAdjustment
//             };
//         }
//     });
//     const BUTTON_INDEX = 0;
//         cy.get(subject)
//             .first()
//             .then(subject => {
//                 const coordsDrag = subject[0].getBoundingClientRect();
//                 cy.wrap(subject)
//                     .trigger('mousedown', {
//                         button: BUTTON_INDEX,
//                         clientX: coordsDrag.x,
//                         clientY: coordsDrag.y,
//                         force: true
//                     })
//                     .wait(500)
//                     .trigger('mousemove', {
//                         button: BUTTON_INDEX,
//                         clientX: coordsDrag.x + xAdjustment,
//                         clientY: coordsDrag.y + yAdjustment,
//                         force: true
//                     })
//                     .wait(500)
//                 cy.get('body')
//                     .trigger('mousemove', {
//                         button: BUTTON_INDEX,
//                         clientX: coordsDrag.x + xAdjustment,
//                         clientY: coordsDrag.y + yAdjustment,
//                         force: true            
//                     })
//                     .wait(500)
//                     .trigger('mouseup', {force: true});
//             });
// });