
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import EnterCode from './src/screens/EnterCode';
import ResetPassword from './src/screens/ResetPassword';

import { View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <ResetPassword />
      <Toast />
    </>
  );
}
