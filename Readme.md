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
   - Renomeie o arquivo `.env.example` para `.env`, adicione a chave pública obtida:
     ```env
     EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
     ```

## 📄 Estrutura do Projeto

Abaixo está uma explicação de partes importantes do código:

### `src/app/(auth)/index.tsx - Home`

O `Home` é um componente funcional em React Native que utiliza hooks para gerenciar a autenticação e exibir informações do usuário.

O componente `Home` é essencial para:

- Exibir informações personalizadas do usuário autenticado.
- Prover uma experiência de usuário amigável ao permitir que os usuários visualizem suas informações e façam logout facilmente.
- Utilizar hooks do Clerk para gerenciar autenticação de forma eficiente e segura.

O componente `Home` realiza as seguintes tarefas principais:

1. **Obtenção de Dados do Usuário**:

   - Utiliza o hook `useUser` para obter o objeto `user`, que contém informações do usuário autenticado.
   - Utiliza o hook `useAuth` para obter a função `signOut`, que permite ao usuário sair da conta.

2. **Renderização da Interface do Usuário**:
   - Renderiza uma `View` principal que atua como um contêiner.
   - Dentro da `View`, exibe a imagem de perfil do usuário usando um componente `Image`.
   - Exibe o nome completo do usuário utilizando um componente `Text`.
   - Inclui um botão (componente `Button`) que, ao ser pressionado, chama a função `signOut` para desconectar o usuário.

### `src/app/(public)/_layout.tsx - Layout.tsx`

O componente `Layout` configura e gerencia o contexto de autenticação para a aplicação React Native usando Clerk. Ele define a lógica para redirecionar os usuários baseados no seu estado de autenticação e garante que a interface de usuário exiba um indicador de carregamento até que a autenticação seja resolvida.

#### Importações e Configurações Iniciais

- **Importações**:
  - Importa módulos e componentes necessários do `expo-router`, `@clerk/clerk-expo`, `react`, e `react-native`.
  - Importa `tokenCache` de um módulo local, usado para gerenciar o cache de tokens de autenticação.
- **Chave Pública**:
  - Obtém a chave pública publicável do Clerk a partir das variáveis de ambiente para configurar o `ClerkProvider`.

#### Componente `InitialLayout`

1. **useAuth Hook**:

   - Utiliza o hook `useAuth` para obter os estados `isSignedIn` (indica se o usuário está autenticado) e `isLoaded` (indica se os dados de autenticação foram carregados).

2. **useEffect**:

   - Usa `useEffect` para monitorar mudanças no estado de autenticação.
   - Se `isLoaded` for `false`, o efeito não faz nada.
   - Se `isLoaded` for `true`, verifica `isSignedIn`:
     - Se o usuário estiver autenticado, redireciona para a rota `(auth)`.
     - Caso contrário, redireciona para a rota `(public)`.

3. **Retorno Condicional**:
   - Se os dados de autenticação ainda não estiverem carregados (`isLoaded` for `false`), exibe um indicador de carregamento (`ActivityIndicator`).
   - Se os dados de autenticação estiverem carregados (`isLoaded` for `true`), renderiza o componente `Slot`.

#### Componente `Layout`

- **ClerkProvider**:
  - Envolve o `InitialLayout` com o `ClerkProvider`, fornecendo o contexto de autenticação do Clerk.
  - Configura o `ClerkProvider` com a chave pública publicável e o cache de tokens.
  - Renderiza o `InitialLayout` dentro do `ClerkProvider`, permitindo que ele use autenticação e navegação baseadas no estado de autenticação do usuário.

### `src/storage/tokenCache.ts`

Este módulo fornece duas funções principais (`getToken` e `saveToken`) para gerenciar o armazenamento seguro de tokens utilizando o `expo-secure-store`. A função `getToken` é usada para recuperar tokens armazenados de forma segura, enquanto a função `saveToken` é usada para armazenar tokens de maneira segura. Ambas as funções são exportadas como parte do objeto `tokenCache`, facilitando seu uso em outras partes da aplicação.

### Explicação detalhada do código

#### Importação

- **expo-secure-store**:
  - Importa todas as funções e objetos exportados pelo módulo `expo-secure-store` como um objeto chamado `SecureStore`. O `expo-secure-store` fornece APIs para armazenar dados de forma segura no dispositivo.

#### Funções

- **getToken**:

  - Define uma função assíncrona chamada `getToken` que aceita uma string `key` como argumento. Esta função será usada para obter itens armazenados de forma segura.
  - Tenta obter o item armazenado com a chave fornecida usando `SecureStore.getItem(key)`.
  - Se a operação for bem-sucedida, retorna o item.
  - Se ocorrer um erro durante a operação, o erro é capturado e lançado novamente.

- **saveToken**:
  - Define uma função assíncrona chamada `saveToken` que aceita uma string `key` e uma string `value` como argumentos. Esta função será usada para salvar itens de forma segura.
  - Tenta salvar o item com a chave e o valor fornecidos usando `SecureStore.setItemAsync(key, value)`.
  - Se a operação for bem-sucedida, retorna o resultado da operação.
  - Se ocorrer um erro durante a operação, o erro é capturado e lançado novamente.

#### Exportação

- **`export const tokenCache = { getToken, saveToken };`**:
  - Exporta um objeto chamado `tokenCache` que contém as funções `getToken` e `saveToken`. Isso permite que outras partes da aplicação importem e usem essas funções para gerenciar tokens de forma segura.

## 🔗 Links Úteis

- [Documentação do Clerk](https://clerk.com/docs)
- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/docs)
