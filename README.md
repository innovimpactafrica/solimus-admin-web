# Solimus Gestion · Administration Solimus

Application Angular autonome. Le code commun (thème, domaine, mocks, documents, composants)
est dans `src/solimus/`, importé via les alias `@solimus/*`.

```bash
npm install
npm start          # http://localhost:4211
npm run build
npx ng test --watch=false --browsers=ChromeHeadless
```
