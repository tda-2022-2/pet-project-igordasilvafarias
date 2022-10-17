import { ThemeProvider } from 'styled-components';

import { StatusBar } from 'react-native';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import theme from './src/theme'

import { Player } from '@screens/Players';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      {fontsLoaded ? <Player /> : <Loading />}
    </ThemeProvider>
  );
}
