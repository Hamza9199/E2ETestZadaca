describe('Admin Panel E2E', () => {
  beforeEach(() => { cy.visit('/admin', {failOnStatusCode : false}); });

  it('should display sidebar with all admin options', () => {
    cy.get('aside').should('exist');
    cy.contains('Admin Opcije').should('exist');
    cy.contains('Pregled korisnika').should('exist');
    cy.contains('Novi korisnik').should('exist');
    cy.contains('Pregled proizvoda').should('exist');
    cy.contains('Novi proizvod').should('exist');
  });

  it('should show users table and allow creating a new user', () => {
    cy.contains('Pregled korisnika').click();
    cy.get('table').should('exist');
    cy.contains('Novi korisnik').click();
    cy.get('form').within(() => {
      cy.get('input[name="email"]').type('testadmin@e2e.com');
      cy.get('input[name="password"]').type('testpass123');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Pregled korisnika').click();
    cy.get('table').contains('td', 'testadmin@e2e.com').should('exist');
  });

  it('should allow editing and deleting a user', () => {
    cy.contains('Pregled korisnika').click();
    cy.get('table')
        .contains('td', 'testadmin@e2e.com')
        .parent('tr')
        .within(() => { cy.contains('Edit').click(); });
    cy.get('form').within(() => {
      cy.get('input[name="email"]').clear().type('testadmin2@e2e.com');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Pregled korisnika').click();
    cy.get('table').contains('td', 'testadmin2@e2e.com').should('exist');
    cy.get('table')
        .contains('td', 'testadmin2@e2e.com')
        .parent('tr')
        .within(() => { cy.contains('Delete').click(); });
    cy.contains('Pregled korisnika').click();
    cy.get('table').contains('td', 'testadmin2@e2e.com').should('not.exist');
  });

  it('should show products table and allow creating a new product', () => {
    cy.contains('Pregled proizvoda').click();
    cy.get('table').should('exist');
    cy.contains('Novi proizvod').click();
    cy.get('form').within(() => {
      cy.get('input[name="naziv"]').type('Test Proizvod');
      cy.get('input[name="opis"]').type('Opis za test proizvod');
      cy.get('input[name="cijena"]').type('123.45');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Pregled proizvoda').click();
    cy.get('table').contains('td', 'Test Proizvod').should('exist');
  });

  it('should allow editing and deleting a product', () => {
    cy.contains('Pregled proizvoda').click();
    cy.get('table').contains('td', 'Test Proizvod').parent('tr').within(() => {
      cy.contains('Edit').click();
    });
    cy.get('form').within(() => {
      cy.get('input[name="naziv"]').clear().type('Test Proizvod 2');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Pregled proizvoda').click();
    cy.get('table').contains('td', 'Test Proizvod 2').should('exist');
    cy.get('table')
        .contains('td', 'Test Proizvod 2')
        .parent('tr')
        .within(() => { cy.contains('Delete').click(); });
    cy.contains('Pregled proizvoda').click();
    cy.get('table').contains('td', 'Test Proizvod 2').should('not.exist');
  });
});
