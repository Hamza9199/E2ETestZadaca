describe('Auth Flow', () => {
  const email = 'newuser@example.com';
  const password = 'newpass123';

  it('registers a new user', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome to Dashboard');
  });

  it('logs in an existing user', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome to Dashboard');
  });
});
