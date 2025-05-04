# E2ETestZadaca

Dokerizovano:
- Server     5000:5000
- Frontend   5173:5173
- MySQL Baza 3306:3306

## Pokretanje i Gasenje

(root)
```bash
docker compose up --build
```

(root)
```bash
docker compose down
```

(root/e2e)
```bash
npx cypress open 
npx cypress run
```
