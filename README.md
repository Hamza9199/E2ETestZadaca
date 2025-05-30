# End-to-End (E2E) testiranje u React aplikacijama

> Projekat je Dokerizovan

## Servisi 

| Servis            | Port:Forward |
|-------------------|--------------|
| `Node` Server     | 5000:5000    |
| `React` Frontend  | 5173:5173    |
| `MySQL` Baza      | Deployana    |

## Pokretanje i Gasenje

Pokrece sve neophodne servise za aplikaciju:

iz `root` projekta:
```bash
docker compose up --build
```
```bash
docker compose down
```

Pokrece Cypress testing proces:

iz `root/e2e` pokretanje cypress-a:

Cypress GUI:
```bash
npx cypress open 
```
Cypress CLI:
```bash
npx cypress run
```
