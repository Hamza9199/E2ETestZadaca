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

  it('shows error on empty login fields', () => {
    cy.visit('http://localhost:5173/');

    cy.get('button[type="submit"]').click();

    cy.contains('Email is required');
    cy.contains('Password is required');
  });

  it('shows error on wrong login credentials', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.log('Submitted login form');
    cy.contains('Invalid email or password', { timeout: 10000 }); 
    cy.log('Found error message');
  });

  it('shows error if passwords do not match during registration', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[name="email"]').type('another@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('differentPass');
    cy.get('button[type="submit"]').click();

    cy.contains('Passwords do not match');
  });

  it('shows error on invalid email format during registration', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[name="email"]').type('invalidemail');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Enter a valid email address');
  });
});
