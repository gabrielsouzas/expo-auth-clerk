// Importa o componente Button de um caminho relativo.
import Button from '@/components/Button';

// Importa hooks useAuth e useUser do pacote '@clerk/clerk-expo'.
import { useAuth, useUser } from '@clerk/clerk-expo';

// Importa componentes do React Native para construir a interface do usuário.
import { Image, StyleSheet, Text, View } from 'react-native';

// Define o componente Home como o padrão exportado deste módulo.
export default function Home() {
  // Obtém o objeto user do hook useUser.
  const { user } = useUser();
  // Obtém a função signOut do hook useAuth.
  const { signOut } = useAuth();

  // Retorna a estrutura da interface do usuário.
  return (
    // Componente View que age como um contêiner para outros componentes.
    <View style={styles.container}>
      {/* Exibe a imagem do usuário, se disponível, usando a URL da imagem do usuário. */}
      <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      {/* Exibe o nome completo do usuário, se disponível. */}
      <Text style={styles.text}>{user?.fullName}</Text>
      {/* Botão que chama a função signOut quando pressionado. */}
      <Button
        icon="exit"
        title="Sair"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}

// Define os estilos para os componentes usando StyleSheet do React Native.
const styles = StyleSheet.create({
  // Estilo para o contêiner principal.
  container: {
    flex: 1, // Faz o contêiner preencher toda a tela.
    padding: 32, // Adiciona um espaçamento interno de 32 unidades.
    justifyContent: 'center', // Centraliza os filhos verticalmente.
    alignItems: 'center', // Centraliza os filhos horizontalmente.
    gap: 12, // Adiciona um espaço de 12 unidades entre os filhos.
  },
  // Estilo para o texto que exibe o nome do usuário.
  text: {
    fontSize: 18, // Define o tamanho da fonte como 18.
    fontWeight: 'bold', // Define a fonte como negrito.
  },
  // Estilo para a imagem do usuário.
  image: {
    width: 92, // Define a largura da imagem como 92 unidades.
    height: 92, // Define a altura da imagem como 92 unidades.
    borderRadius: 12, // Adiciona bordas arredondadas com um raio de 12 unidades.
  },
});
