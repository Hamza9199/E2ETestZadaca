describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/dashboard');
  });

  it('should display the title', () => {
    cy.get('[data-testid="page-title"]').should('exist').and('contain.text', 'Shop Our Products');
  });

  it('should load and display products', () => {
    cy.get('[data-testid="product-container"]').should('exist');
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should display product details', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('h2').should('exist').and('not.be.empty');
      cy.get('p').should('have.length.greaterThan', 1);
      cy.get('[data-testid="product-price"]').should('contain.text', 'Price:');
    });
  });

  it('should have a functional "Buy Now" button', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="buy-now"]').should('exist').and('contain.text', 'Buy Now').click();
      // Možeš dodati ovdje npr: cy.url().should('include', '/proizvod/')
    });
  });
});
