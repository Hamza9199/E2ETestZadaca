describe('Detalji Proizvoda', () => {
  const productId = 5;
  const productUrl = `/proizvod/${productId}`;

  beforeEach(() => { cy.visit(productUrl, {failOnStatusCode : false}; });

  it('should display the product name as title',
     () => { cy.get('h1').should('exist').and('not.be.empty'); });

  it('should load and display product details', () => {
    cy.get('[class*="card"]').within(() => {
      cy.get('h1').should('exist').and('not.be.empty'); // naziv proizvoda
      cy.get('div[class*="rating"]').should('exist');
      cy.get('p[class*="description"]').should('exist').and('not.be.empty');
      cy.get('p[class*="price"]').should('exist').and('contain.text', '$');
      cy.get('button').contains('Add to Cart').should('exist');
    });
  });

  it('should handle loading state', () => {
    cy.intercept(
          'GET', `http://localhost:5000/server/proizvod/${productId}`,
          (req) => { req.on('response', (res) => { res.setDelay(2000); }); })
            .as('getProduct');

    cy.visit(productUrl, {failOnStatusCode : false});

    cy.wait('@getProduct');
  });

  it('should handle server error gracefully', () => {
    cy.intercept('GET', `http://localhost:5000/server/proizvod/${productId}`, {
        statusCode : 500,
        body : {error : 'Internal Server Error'},
      }).as('getProductError');

    cy.visit(productUrl, {failOnStatusCode : false});
    cy.contains('h1', 'Error:').should('exist');
  });
});
