import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const colors = {
  background: '#FCF7EC',
  card: '#FEFEFE',
  navy: '#0D2247',
  muted: '#4D607B',
  border: '#707C91',
  placeholder: '#8895AA',
  divider: '#D3D5D9',
  orangeStart: '#FFA10A',
  orangeEnd: '#FD8E01',
  error: '#B42318',
};

export type SignInCredentials = {
  email: string;
  password: string;
};

type SignInScreenProps = {
  onSignIn: (credentials: SignInCredentials) => void;
  onCreateAccount: () => void;
  onForgotPassword: () => void;
};

export default function SignInScreen({
  onSignIn,
  onCreateAccount,
  onForgotPassword,
}: SignInScreenProps) {
  const { width } = useWindowDimensions();
  const compact = width < 390;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const passwordInput = useRef<TextInput>(null);

  const submitSignIn = () => {
    const normalizedEmail = email.trim();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailLooksValid) {
      setFormError('Enter a valid email address.');
      return;
    }

    if (password.length === 0) {
      setFormError('Enter your password.');
      return;
    }

    setFormError(null);
    onSignIn({ email: normalizedEmail, password });
  };

  const updateEmail = (value: string) => {
    setEmail(value);
    setFormError(null);
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    setFormError(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: compact ? 16 : 24,
              paddingTop: compact ? 12 : 20,
              paddingBottom: compact ? 18 : 26,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={[styles.brandBlock, compact && styles.brandBlockCompact]}>
              <Text style={styles.brandName} accessibilityRole="header">
                FitTrack
              </Text>
              <Text style={styles.tagline}>Train. Progress. Compete.</Text>
            </View>

            <View style={[styles.card, compact && styles.cardCompact]}>
              <Text
                style={[styles.welcomeHeading, compact && styles.welcomeHeadingCompact]}
                accessibilityRole="header"
              >
                Welcome back
              </Text>
              <Text style={styles.intro}>
                Sign in to pick up where you left off.
              </Text>

              <View style={styles.emailField}>
                <Text style={styles.fieldLabel}>Email address</Text>
                <TextInput
                  accessibilityLabel="Email address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={updateEmail}
                  onSubmitEditing={() => passwordInput.current?.focus()}
                  placeholder="alex@example.com"
                  placeholderTextColor={colors.placeholder}
                  returnKeyType="next"
                  selectionColor={colors.navy}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  value={email}
                />
              </View>

              <View style={styles.passwordField}>
                <Text style={styles.fieldLabel}>Password</Text>
                <View style={styles.passwordInputFrame}>
                  <TextInput
                    ref={passwordInput}
                    accessibilityLabel="Password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect={false}
                    onChangeText={updatePassword}
                    onSubmitEditing={submitSignIn}
                    returnKeyType="done"
                    secureTextEntry={!passwordVisible}
                    selectionColor={colors.navy}
                    style={styles.passwordInput}
                    underlineColorAndroid="transparent"
                    value={password}
                  />
                  <Pressable
                    accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                    accessibilityRole="button"
                    hitSlop={10}
                    onPress={() => setPasswordVisible((visible) => !visible)}
                    style={styles.visibilityButton}
                  >
                    <EyeIcon crossedOut={passwordVisible} />
                  </Pressable>
                </View>
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={onForgotPassword}
                style={styles.forgotPasswordButton}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </Pressable>

              {formError ? (
                <Text accessibilityRole="alert" style={styles.formError}>
                  {formError}
                </Text>
              ) : null}

              <Pressable
                accessibilityRole="button"
                onPress={submitSignIn}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <LinearGradient
                  colors={[colors.orangeStart, colors.orangeEnd]}
                  end={{ x: 1, y: 0.5 }}
                  start={{ x: 0, y: 0.5 }}
                  style={styles.primaryButtonGradient}
                >
                  <Text style={styles.primaryButtonText}>Sign in</Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.createAccountDivider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>New to FitTrack?</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={onCreateAccount}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.secondaryButtonPressed,
                ]}
              >
                <Text style={styles.secondaryButtonText}>Create account</Text>
              </Pressable>
            </View>

            <View style={styles.privacyNotice}>
              <LockIcon />
              <Text style={[styles.privacyText, compact && styles.privacyTextCompact]}>
                Your information is private and secure.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function EyeIcon({ crossedOut }: { crossedOut: boolean }) {
  return (
    <Svg width={25} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.2 12s3.55-6.5 9.8-6.5 9.8 6.5 9.8 6.5-3.55 6.5-9.8 6.5S2.2 12 2.2 12Z"
        stroke={colors.navy}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
      />
      <Circle
        cx={12}
        cy={12}
        r={3.1}
        stroke={colors.navy}
        strokeWidth={1.8}
      />
      {crossedOut ? (
        <Path
          d="m4 4 16 16"
          stroke={colors.navy}
          strokeLinecap="round"
          strokeWidth={1.8}
        />
      ) : null}
    </Svg>
  );
}

function LockIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.5 10V7.6a4.5 4.5 0 0 1 9 0V10"
        stroke={colors.navy}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
      />
      <Rect
        x={5}
        y={10}
        width={14}
        height={11}
        rx={2}
        stroke={colors.navy}
        strokeLinejoin="round"
        strokeWidth={1.8}
      />
      <Circle cx={12} cy={15} r={1} fill={colors.navy} />
      <Path d="M12 16v2" stroke={colors.navy} strokeLinecap="round" strokeWidth={1.6} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 620,
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 26,
  },
  brandBlockCompact: {
    marginBottom: 20,
  },
  brandName: {
    color: colors.navy,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1.1,
    lineHeight: 48,
  },
  tagline: {
    color: colors.muted,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: 'rgba(13, 34, 71, 0.06)',
    borderRadius: 28,
    borderWidth: 1,
    elevation: 3,
    paddingHorizontal: 34,
    paddingTop: 30,
    paddingBottom: 30,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  cardCompact: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 24,
  },
  welcomeHeading: {
    color: colors.navy,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.8,
    lineHeight: 41,
  },
  welcomeHeadingCompact: {
    fontSize: 31,
    lineHeight: 38,
  },
  intro: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 5,
  },
  emailField: {
    marginTop: 25,
  },
  passwordField: {
    marginTop: 21,
  },
  fieldLabel: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 7,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 11,
    borderWidth: 1.4,
    color: colors.navy,
    fontSize: 16,
    height: 58,
    paddingHorizontal: 14,
    paddingVertical: 0,
  },
  passwordInputFrame: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 11,
    borderWidth: 1.4,
    flexDirection: 'row',
    height: 58,
    paddingLeft: 14,
    paddingRight: 10,
  },
  passwordInput: {
    color: colors.navy,
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingVertical: 0,
  },
  visibilityButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 42,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    minHeight: 26,
    justifyContent: 'center',
  },
  forgotPasswordText: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  formError: {
    color: colors.error,
    fontSize: 14,
    lineHeight: 19,
    marginTop: 8,
  },
  primaryButton: {
    borderRadius: 11,
    height: 58,
    marginTop: 23,
    overflow: 'hidden',
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  primaryButtonGradient: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(80, 42, 0, 0.22)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  createAccountDivider: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 24,
  },
  dividerLine: {
    backgroundColor: colors.divider,
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 14,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.navy,
    borderRadius: 11,
    borderWidth: 1.5,
    height: 58,
    justifyContent: 'center',
    marginTop: 20,
  },
  secondaryButtonPressed: {
    backgroundColor: '#F6F8FC',
  },
  secondaryButtonText: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '600',
  },
  privacyNotice: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 21,
  },
  privacyText: {
    color: colors.muted,
    fontSize: 16,
    marginLeft: 8,
  },
  privacyTextCompact: {
    fontSize: 14,
  },
});
