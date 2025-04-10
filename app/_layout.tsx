import { Slot } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { AppProvider } from '../Context/AppContext';
export default function RootLayout() {
  return <PaperProvider>
    <AppProvider>  
      <Slot />
    </AppProvider>
  </PaperProvider>
}