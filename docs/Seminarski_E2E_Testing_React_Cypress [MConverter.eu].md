# End-to-End (E2E) testiranje u React aplikacijama koristeći Cypress

Autori: Hamza Gačić i Dr. Prof. Safet Imamović

Fakultet: Politehnički fakultet Univerziteta u Zenici Predmet: Kontrola
Kvaliteta Softvera

Datum: sutra

1.  Uvod

U savremenom web razvoju, kvalitet softvera i korisničko iskustvo imaju
ogroman značaj. Kako bi se osiguralo da aplikacije funkcionišu kako je i
očekivano, koristi se testiranje softvera. Među različitim vrstama
testiranja, End-to-End (E2E) testiranje pruža cjelovitu provjeru
aplikacije iz perspektive krajnjeg korisnika. U ovom radu fokusiraćemo
se na E2E testiranje u okviru React aplikacija koristeći alat Cypress,
koji je postao jedan od najpopularnijih alata za tu svrhu.

1.  Šta je End-to-End (E2E) testiranje

End-to-End testiranje podrazumijeva testiranje kompletnog toka
aplikacije, od korisničkog interfejsa do backend sistema i baze
podataka. Cilj je simulirati ponašanje stvarnog korisnika i potvrditi da
svi dijelovi aplikacije međusobno funkcionišu ispravno.

1.  Uvod u React

React je JavaScript biblioteka razvijena od strane Facebook-a za
izgradnju korisničkog interfejsa. Zahvaljujući svojoj komponentnoj
arhitekturi i virtual DOM-u, React omogućava izgradnju skalabilnih i
brzih web aplikacija.

1.  Alati za E2E testiranje

Postoji više alata koji se koriste za E2E testiranje, uključujući
Selenium, Playwright, TestCafe i Cypress. Cypress se posebno ističe zbog
svoje jednostavne konfiguracije, brzine izvođenja testova i mogućnosti
vizualnog praćenja testova u pregledniku.

1.  Cypress -- Osnovne karakteristike

Cypress je moderni alat za frontend testiranje, izgrađen posebno za
JavaScript aplikacije. Radi unutar preglednika, što omogućava direktnu
interakciju sa DOM-om.

1.  Instalacija i konfiguracija Cypress-a u React projektu

Za integraciju Cypress-a u React aplikaciju, koristi se:

npm install cypress \--save-dev

Nakon instalacije, Cypress se može pokrenuti komandama: npx cypress open

Ova komanda otvara Cypress GUI, gdje korisnik može birati testove koje
želi izvršiti.

1.  **Pisanje osnovnih E2E testova **Primjer testa za naslov stranice:
    > describe(\'Početna stranica\', () =\> {

> it(\'Treba prikazati naslov aplikacije\', () =\> {
> cy.visit(\'http://localhost:3000\');
> cy.contains(\'Dobrodošli\').should(\'be.visible\');

});

});

Primjer testa za prijavu korisnika: describe(\'Prijava korisnika\', ()
=\> {

> it(\'Treba omogućiti prijavu\', () =\> { cy.visit(\'/login\');
> cy.get(\'input\[name=\"email\"\]\').type(\'user@example.com\');
> cy.get(\'input\[name=\"password\"\]\').type(\'lozinka123\');
> cy.get(\'button\[type=\"submit\"\]\').click();
> cy.url().should(\'include\', \'/dashboard\');

});

});

1.  Prednosti i mane Cypress-a

Prednosti:

1.  - Jednostavna instalacija i konfiguracija

1.  - Brzo izvršavanje testova

1.  - Odličan vizuelni interfejs

1.  - Automatsko čekanje na elemente

Mane:

1.  - Ograničena podrška za višestruke tabove/prozore

1.  - Radi samo u Chrome-based preglednicima

1.  - Nije idealan za testiranje sistema koji nisu napisani u
      > JavaScript-u

1.  Zaključak

End-to-End testiranje je ključno za osiguravanje kvaliteta softverskih
proizvoda. Cypress, kao moćan i pristupačan alat, omogućava lako
testiranje React aplikacija iz perspektive krajnjeg korisnika.

1.  Literatura

1.  Cypress Docs -- https://docs.cypress.io

1.  React Documentation -- https://reactjs.org

1.  \"Testing JavaScript Applications\" -- Lucas da Costa

2.  \"End-to-End Testing with Cypress\" -- Gleb Bahmutov

1.  https://dev.to

1.  https://medium.com
