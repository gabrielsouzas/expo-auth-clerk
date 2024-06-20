// Importa o componente Slot e o objeto router do 'expo-router'.
import { Slot, router } from 'expo-router';
// Importa ClerkProvider e o hook useAuth do '@clerk/clerk-expo'.
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
// Importa o hook useEffect do React.
import { useEffect } from 'react';
// Importa o componente ActivityIndicator do React Native para exibir um indicador de carregamento.
import { ActivityIndicator } from 'react-native';
// Importa o tokenCache de um módulo local.
import { tokenCache } from '@/storage/tokenCache';

// Obtém a chave pública publicável do Clerk das variáveis de ambiente.
const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

// Componente funcional InitialLayout.
function InitialLayout() {
  // Usa o hook useAuth para obter os estados de autenticação.
  const { isSignedIn, isLoaded } = useAuth();

  // Usa o hook useEffect para realizar efeitos colaterais.
  useEffect(() => {
    // Se os dados de autenticação ainda não estão carregados, não faz nada.
    if (!isLoaded) {
      return;
    }
    // Se o usuário está autenticado, redireciona para a rota '(auth)'.
    if (isSignedIn) {
      router.replace('(auth)');
    } else {
      // Se o usuário não está autenticado, redireciona para a rota '(public)'.
      router.replace('(public)');
    }
  }, [isSignedIn]); // Executa o efeito sempre que 'isSignedIn' mudar.

  // Retorna um indicador de carregamento se os dados de autenticação ainda não estão carregados,
  // caso contrário, renderiza o componente Slot.
  return isLoaded ? (
    <Slot />
  ) : (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    />
  );
}

// Componente funcional Layout.
export default function Layout() {
  // Envolve o componente InitialLayout com ClerkProvider para fornecer autenticação do Clerk.
  return (
    <ClerkProvider
      publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} // Configura a chave pública do Clerk.
      tokenCache={tokenCache} // Configura o cache de tokens.
    >
      <InitialLayout />{' '}
      {/* Renderiza o componente InitialLayout dentro do ClerkProvider */}
    </ClerkProvider>
  );
}
