
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';

import { View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <ForgotPassword />
      <Toast />
    </>
  );
}
