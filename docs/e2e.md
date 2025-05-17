---
geometry: a4paper
fontsize: 12pt
header-includes:
  - \usepackage{fancyhdr} 
  - \pagenumbering{arabic}  
  - \setcounter{page}{1} 
---

\thispagestyle{empty}

\vspace*{4cm}

\begin{center}
  {\Large \textbf{Univerzitet u Zenici}} \\[4em]
  {\large \textbf{Politehnički Fakultet}} \\[4em]

  {\LARGE \textbf{Seminarski Rad:}} \\[1.5em]
  {\Large \textbf{End-to-End (E2E) testiranje u React aplikacijama koristeći Cypress}} \\[1em]
  {\large \textbf{Predmet: Kontrola Kvaliteta Softvera}} \\[4em]

  \normalsize
  Autori: Hamza Gačić, Safet Imamović \\[1em]
  Maj 2025. godine
\end{center}


\newpage

\setcounter{page}{1}  
\tableofcontents  

\newpage

# Uvod

U savremenom web razvoju, kvalitet softvera i korisničko iskustvo imaju
ogroman značaj. Kako bi se osiguralo da aplikacije funkcionišu kako je i
očekivano, koristi se testiranje softvera. Među različitim vrstama
testiranja, End-to-End (E2E) testiranje pruža cjelovitu provjeru
aplikacije iz perspektive krajnjeg korisnika. U ovom radu fokusiraćemo
se na E2E testiranje u okviru React aplikacija koristeći alat Cypress,
koji je postao jedan od najpopularnijih alata za tu svrhu.

## Šta je End-to-End (E2E) testiranje

End-to-End testiranje podrazumijeva testiranje kompletnog toka
aplikacije, od korisničkog interfejsa do backend sistema i baze
podataka. Cilj je simulirati ponašanje stvarnog korisnika i potvrditi da
svi dijelovi aplikacije međusobno funkcionišu ispravno.

## Uvod u React

React je JavaScript biblioteka razvijena od strane Facebook-a za
izgradnju korisničkog interfejsa. Zahvaljujući svojoj komponentnoj
arhitekturi i virtual DOM-u, React omogućava izgradnju skalabilnih i
brzih web aplikacija.

## Alati za E2E testiranje

Postoji više alata koji se koriste za E2E testiranje, uključujući
Selenium, Playwright, TestCafe i Cypress. Cypress se posebno ističe zbog
svoje jednostavne konfiguracije, brzine izvođenja testova i mogućnosti
vizualnog praćenja testova u pregledniku.

## Cypress -- Osnovne karakteristike

Cypress je moderni alat za frontend testiranje, izgrađen posebno za
JavaScript aplikacije. Radi unutar preglednika, što omogućava direktnu
interakciju sa DOM-om.

# Instalacija i konfiguracija Cypress-a u React projektu

Za integraciju Cypress-a u React aplikaciju, koristi se:

```bash
npm install cypress --save-dev
```

Nakon instalacije, Cypress se može pokrenuti komandama: `npx cypress open`

Ova komanda otvara Cypress GUI, gdje korisnik može birati testove koje
želi izvršiti.

# Pisanje osnovnih E2E testova

1. Primjer testa za naslov stranice:

```javascript
describe('Početna stranica', () => {
    it('Treba prikazati naslov aplikacije', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Dobrodošli').should('be.visible');
    });
});
```

2. Primjer testa za prijavu korisnika: 

```javascript
describe('Prijava korisnika', () => {
    it('Treba omogućiti prijavu', () => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('user@example.com');
        cy.get('input[name="password"]').type('lozinka123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });
});
```

\newpage

# Prednosti i mane Cypress-a

> **Prednosti**:
>
> 1. Jednostavna instalacija i konfiguracija
>
> 2. Brzo izvršavanje testova
>
> 3. Odličan vizuelni interfejs
>
> 4. Automatsko čekanje na elemente

\vspace*{1cm}

> **Mane**:
>
> 1. Ograničena podrška za višestruke tabove/prozore
>
> 2. Radi samo u Chrome-based preglednicima
>
> 3. Nije idealan za testiranje sistema koji nisu napisani u JavaScript-u

# Zaključak

End-to-End testiranje je ključno za osiguravanje kvaliteta softverskih
proizvoda. Cypress, kao moćan i pristupačan alat, omogućava lako
testiranje React aplikacija iz perspektive krajnjeg korisnika.

> 1.  Literatura

1.  Cypress Docs -- https://docs.cypress.io

1.  React Documentation -- https://reactjs.org

1.  \"Testing JavaScript Applications\" -- Lucas da Costa

2.  \"End-to-End Testing with Cypress\" -- Gleb Bahmutov

1.  https://dev.to

1.  https://medium.com
