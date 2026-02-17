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
  baseUrl: "https://api.shinederu.lol/auth/index.php",
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider client={authClient}>{children}</AuthProvider>;
}
```

## Usage

```tsx
import { useAuth } from "@shinederu/auth-react";

export function ProfileButton() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={() => login({ username: "demo", password: "demo" })}>Connexion</button>;
  }

  return <button onClick={() => logout()}>Se deconnecter ({user?.username})</button>;
}
```

## Hook de protection

```tsx
import { useRequireAuth } from "@shinederu/auth-react";

useRequireAuth({
  onUnauthenticated: () => {
    // ex: navigate("/")
  },
});
```

## Build

```bash
npm run build
```
