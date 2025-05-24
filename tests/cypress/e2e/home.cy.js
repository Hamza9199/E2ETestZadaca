describe('Početna', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display the hero title', () => {
    cy.get('h1').contains('Dobrodošli u budućnost kupovine').should('exist');
  });

  it('should load and display products', () => {
    cy.get('section').eq(1).find('div[class*=card]').should('have.length.greaterThan', 0);
  });

  it('should display product details', () => {
    cy.get('section').eq(1).find('div[class*=card]').first().within(() => {
      cy.get('h2').should('exist').and('not.be.empty');
      cy.get('p').should('have.length.greaterThan', 1);
    });
  });

  it('should have a functional "Dodatni Info" button', () => {
    cy.get('section').eq(1).find('div[class*=card]').first().within(() => {
      cy.get('button').contains('Dodatni Info').should('exist').click();
    });
    cy.url().should('include', '/proizvod/');
  });
});
