describe('Product Details Page', () => {
  const productId = 1;
  const productUrl = `http://localhost:5173/proizvod/${productId}`;

  beforeEach(() => {
    cy.visit(productUrl);
  });

  it('should display the product title', () => {
    cy.contains('h1', 'Product Overview').should('exist');
  });

  it('should load and display product details', () => {
    cy.get('[class*="container"]').should('exist');
    cy.get('[class*="card"]').within(() => {
      cy.get('h2').should('exist').and('not.be.empty');
      cy.get('p').first().should('exist').and('not.be.empty');
      cy.get('p').last().should('contain.text', 'Price:');
    });
  });

  it('should handle non-existent product gracefully', () => {
  cy.intercept('GET', 'http://localhost:5000/server/proizvod/9999', {
    statusCode: 200,
    body: null // ili {} ako očekuješ prazan objekat
  }).as('getNonExistentProduct');

  cy.visit('http://localhost:5173/proizvod/9999');
  cy.contains('h1', 'Product not found').should('exist');
});


  it('should handle loading state', () => {
    cy.intercept('GET', `http://localhost:5000/server/proizvod/${productId}`, (req) => {
      req.on('response', (res) => {
        res.setDelay(2000);
      });
    }).as('getProduct');

    cy.visit(productUrl);
    cy.contains('h1', 'Loading...').should('exist');
    cy.wait('@getProduct');
  });

  it('should handle server error gracefully', () => {
    cy.intercept('GET', `http://localhost:5000/server/proizvod/${productId}`, {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('getProductError');

    cy.visit(productUrl);
    cy.contains('h1', 'Error:').should('exist');
  });
});
