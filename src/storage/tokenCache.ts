// Importa o módulo SecureStore do pacote 'expo-secure-store'.
import * as SecureStore from 'expo-secure-store';

// Função assíncrona para obter um token seguro armazenado.
async function getToken(key: string) {
  try {
    // Tenta obter o item armazenado com a chave especificada.
    return SecureStore.getItem(key);
  } catch (error) {
    // Em caso de erro, lança o erro.
    throw error;
  }
}

// Função assíncrona para salvar um token de forma segura.
async function saveToken(key: string, value: string) {
  try {
    // Tenta salvar o item com a chave e valor especificados.
    return SecureStore.setItemAsync(key, value);
  } catch (error) {
    // Em caso de erro, lança o erro.
    throw error;
  }
}

// Exporta um objeto tokenCache que contém as funções getToken e saveToken.
export const tokenCache = { getToken, saveToken };
