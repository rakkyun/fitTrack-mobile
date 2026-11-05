import { Alert } from 'react-native';

import SignInScreen, {
  type SignInCredentials,
} from './src/features/auth/SignInScreen';

export default function App() {
  const handleSignIn = (_credentials: SignInCredentials) => {
    Alert.alert(
      'Sign in',
      'The screen is ready. We will connect it to the FitTrack API in the next step.',
    );
  };

  const handleCreateAccount = () => {
    Alert.alert('Create account', 'The account creation screen will be added next.');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot password', 'Password recovery will be added next.');
  };

  return (
    <SignInScreen
      onSignIn={handleSignIn}
      onCreateAccount={handleCreateAccount}
      onForgotPassword={handleForgotPassword}
    />
  );
}
