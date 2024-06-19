# 📱 React Native App with Expo & Clerk

Este repositório contém um aplicativo em React Native criado com o Expo, usando TypeScript e o Expo Router. Este projeto é desenvolvido para estudar o Clerk - A plataforma de gerenciamento de usuários mais abrangente.

## 🚀 Início Rápido

Para começar, clone este repositório e instale as dependências:

```sh
git clone https://github.com/gabrielsouzas/expo-auth-clerk.git
cd expo-auth-clerk
npm install
```

Em seguida, inicie o aplicativo:

```sh
npx expo start
```

## 🛠️ Configuração do Clerk

1. **Criação do Projeto no Clerk:**

   - Acesse o [site do Clerk](https://clerk.com/) e crie uma conta.
   - Crie um novo projeto e anote a chave pública (publishable key) que será utilizada no código.
   - Configure as URLs de redirecionamento conforme necessário.

2. **Configuração no Código:**
   - No arquivo `.env`, adicione a chave pública obtida:
     ```env
     EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
     ```

## 📄 Estrutura do Projeto

Abaixo está uma explicação de partes importantes do código:

### `Layout.tsx`

Este arquivo contém a configuração principal do ClerkProvider e a lógica de redirecionamento baseada no estado de autenticação do usuário.

```typescript
import { Slot, router } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { tokenCache } from '@/storage/tokenCache';

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (isSignedIn) {
      router.replace('(auth)');
    } else {
      router.replace('(public)');
    }
  }, [isSignedIn]);

  return isLoaded ? (
    <Slot />
  ) : (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    />
  );
}

export default function Layout() {
  return (
    <ClerkProvider
      publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
```

### Explicação:

- **ClerkProvider:** Envolve o aplicativo, fornecendo contexto de autenticação para todos os componentes.
- **InitialLayout:** Componente que verifica se o usuário está autenticado e redireciona conforme o estado.
- **useAuth:** Hook fornecido pelo Clerk para obter o estado de autenticação do usuário.
- **router:** Utilizado para redirecionar o usuário para as rotas apropriadas (`(auth)` para autenticados e `(public)` para não autenticados).

## 🔗 Links Úteis

- [Documentação do Clerk](https://clerk.com/docs)
- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/docs)
