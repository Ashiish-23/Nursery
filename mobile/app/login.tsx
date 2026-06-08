import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import { TextInput } from '@/components/form/text-input';
import { Button } from '@/components/form/button';
import { Alert, AlertType } from '@/components/form/alert';
import { Colors, Spacing } from '@/constants/theme';
import { authApi } from '@/services/api';
import { authStorage } from '@/services/auth-storage';

// Validation schema
const loginSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const styles = createStyles(colors);
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: AlertType;
    title: string;
    message?: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobileNumber: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authApi.login({
        mobileNumber: data.mobileNumber,
        password: data.password,
      });

      // Store JWT token
      if (response.accessToken) {
        await authStorage.saveToken(response.accessToken);
      }

      // Store user info
      if (response.user) {
        await authStorage.saveUser(response.user);
      }

      setAlert({
        type: 'success',
        title: 'Login Successful',
        message: 'Welcome back to SasyaVana!',
      });

      // Navigate to home after brief delay
      setTimeout(() => {
        router.replace('/');
      }, 1500);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.';
      
      setAlert({
        type: 'error',
        title: 'Login Failed',
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.plantIcon}>
              <View style={styles.leaf} />
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <View style={styles.titleUnderline} />
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Mobile Number */}
            <Controller
              control={control}
              name="mobileNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Mobile Number"
                  placeholder="10-digit number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  error={errors.mobileNumber?.message}
                  editable={!isLoading}
                  required
                />
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  error={errors.password?.message}
                  editable={!isLoading}
                  required
                />
              )}
            />

            {/* Login Button */}
            <Button
              onPress={handleSubmit(onSubmit)}
              title="Login"
              loading={isLoading}
              disabled={isLoading}
              size="lg"
              style={styles.submitButton}
            />

            {/* Register Link */}
            <View style={styles.registerLinkContainer}>
              <Button
                onPress={() => router.replace('/register')}
                title="Don't have an account? Register"
                variant="secondary"
                disabled={isLoading}
              />
            </View>

            {/* Forgot Password Link */}
            <View style={styles.forgotLinkContainer}>
              <Button
                onPress={() => {
                  setAlert({
                    type: 'info',
                    title: 'Coming Soon',
                    message: 'Password recovery feature will be available soon.',
                  });
                }}
                title="Forgot Password?"
                variant="secondary"
                disabled={isLoading}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          visible={!!alert}
          onDismiss={() => {
            if (alert.type !== 'success') {
              setAlert(null);
            }
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingVertical: Spacing.xl,
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    plantIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primaryLighter,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leaf: {
      width: 40,
      height: 40,
      backgroundColor: colors.primary,
      borderRadius: 20,
      transform: [{ rotate: '45deg' }],
    },
    titleContainer: {
      marginBottom: Spacing.xl,
      alignItems: 'center',
    },
    titleUnderline: {
      width: 40,
      height: 3,
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    form: {
      flex: 1,
      marginTop: Spacing.lg,
    },
    submitButton: {
      marginTop: Spacing.lg,
    },
    registerLinkContainer: {
      marginTop: Spacing.lg,
    },
    forgotLinkContainer: {
      marginTop: Spacing.md,
    },
  });
}