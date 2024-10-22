// Custom command to perform login
Cypress.Commands.add('login', (username, password) => {
  // Enter the username only if it is not an empty string
  if (username) {
    cy.get('#username').type(username);
  }

  // Enter the password only if it is not an empty string
  if (password) {
    cy.get('#password').type(password);
  }

  // Submit the form
  cy.get('button[type="submit"]').click();
});

// Custom command to log out
Cypress.Commands.add('logout', () => {
  // Click the logout button
  cy.get('a[href="/logout"]').click();

  // Assert that the user was logged out successfully
  cy.url().should('include', '/login');
  cy.verifyMessage('You logged out of the secure area!')
});

// Custom command to verify message
Cypress.Commands.add('verifyMessage', (message) => {
  // Assert the alert message
  cy.get('#flash')
    .should('be.visible')
    .and('contain', message);
});
