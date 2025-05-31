describe('Korpa (Cart) E2E', () => {
	const productId = 2;

	it('should add a product to cart and display it in Korpa', () => {
		cy.visit(`/proizvod/${productId}`, { failOnStatusCode: false });
		cy.get('button').contains('Add to Cart').click();

		cy.window().then((win) => {
			return new Cypress.Promise((resolve) => {
				const check = () => {
					const korpa = JSON.parse(win.localStorage.getItem('korpa') || '[]');
					if (korpa.length > 0)
						resolve();
					else
						setTimeout(check, 100);
				};
				check();
			});
		});

		cy.visit('/korpa', { failOnStatusCode: false });
		cy.reload();

		cy.get('[data-testid="korpa-item"]', { timeout: 10000 }).should('exist');
		cy.get('[data-testid="korpa-item"]').should('have.length.greaterThan', 0);
		cy.get('[data-testid="korpa-item"]').first().within(() => {
			cy.get('[data-testid="item-name"]').should('exist').and('not.be.empty');
			cy.get('[data-testid="item-qty"]').should('contain.text', 'x1');
			cy.get('[data-testid="item-price"]').should('contain.text', 'KM');
			cy.get('[data-testid="remove-btn"]').should('exist');
		});

		cy.get('[data-testid="korpa-total"]').should('not.be.empty');

		// Obriši proizvod iz korpe
		cy.get('[data-testid="korpa-item"]')
			.first()
			.find('[data-testid="remove-btn"]')
			.click();

		// Provjeri da je korpa prazna
		cy.get('[data-testid="korpa-empty"]')
			.should('contain.text', 'Korpa je prazna');
	});

	it('should navigate back to shop when clicking "Nastavi kupovinu"', () => {
		cy.visit('/korpa', { failOnStatusCode: false });
		cy.get('[data-testid="continue-btn"]').click();
		cy.url().should('eq', Cypress.config().baseUrl + '/');
	});
});
