# @shinederu/auth-react

Bindings React pour `@shinederu/auth-core`.

## Installation

```bash
npm i @shinederu/auth-core @shinederu/auth-react
```

## Setup

```tsx
import { createAuthClient } from "@shinederu/auth-core";
import { AuthProvider } from "@shinederu/auth-react";

const authClient = createAuthClient({
  baseUrl: "https://api.shinederu.ch/auth/index.php",
  defaultCredentials: "include",
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider client={authClient}>{children}</AuthProvider>;
}
```

## Usage

```tsx
import { useAuth } from "@shinederu/auth-react";

function AccountButton() {
  const { isAuthenticated, user, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={() => login({ username: "demo", password: "demo" })}>Connexion</button>;
  }

  return <button onClick={() => logout()}>Se deconnecter ({user?.username})</button>;
}
```

## Hooks

- `useAuth()`
- `useAuthClient()`
- `useRequireAuth({ onUnauthenticated })`

## Droits projet

`useAuth()` expose le `user` renvoye par `@shinederu/auth-core`, donc aussi `user.project_access` quand l'API Auth le fournit.
Les verifications metier critiques doivent rester cote backend; les frontends peuvent seulement s'en servir pour afficher ou masquer des vues.

## Scripts

```bash
npm run build
npm run clean
```
