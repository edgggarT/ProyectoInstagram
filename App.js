import AuthNavigation from './src/navigation/AuthNavigation';

import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}
