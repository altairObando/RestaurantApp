import * as SecureStore from 'expo-secure-store';

async function saveValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValue(key: string) {
  return await SecureStore.getItemAsync(key);
}

export default { saveValue, getValue };