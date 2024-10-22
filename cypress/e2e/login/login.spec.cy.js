describe('Login Form Functionality', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  // Load fixture data
  let credentials;
  before(() => {
    cy.fixture('login').then((data) => {
      credentials = data;
    });
  });

  // Test case: successful login with valid credentials
  it('should successfully log in with valid credentials', () => {
    const { username, password } = credentials.validUser;
    const { loginSuccess } = credentials.messages;

    cy.login(username, password);

    // Assert that the login was successful
    cy.url().should('include', '/secure');
    cy.verifyMessage(loginSuccess); // Usar el mensaje desestructurado

    // Assert that the logout button is visible after successful login
    cy.get('a[href="/logout"]').should('be.visible');
  });

  // Test case: invalid login with incorrect credentials
  it('should show an error message for invalid login', () => {
    const { username, password } = credentials.invalidUser;
    const { invalidUsername } = credentials.messages;

    cy.login(username, password);

    // Verify error message
    cy.verifyMessage(invalidUsername); // Usar el mensaje desestructurado

    // Ensure the URL does not change (still on the login page)
    cy.url().should('include', '/login');
  });

  // Test case: missing password should show an error
  it('should display error when password is missing', () => {
    const { username } = credentials.validUser;
    const { invalidPassword } = credentials.messages;

    cy.login(username, '');

    // Verify the error message for missing password
    cy.verifyMessage(invalidPassword); // Usar el mensaje desestructurado
  });

  // Test case: missing username should show an error
  it('should display error when username is missing', () => {
    const { password } = credentials.validUser;
    const { invalidUsername } = credentials.messages;

    cy.login('', password);

    // Verify the error message for missing username
    cy.verifyMessage(invalidUsername); // Usar el mensaje desestructurado
  });

  // Test case: successful logout
  it('should successfully logout', () => {
    const { username, password } = credentials.validUser;
    cy.login(username, password);
    cy.logout();
  });
});
