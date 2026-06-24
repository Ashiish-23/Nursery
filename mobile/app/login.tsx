import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from "expo-router";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/form/button";
import { Alert, AlertType } from "@/components/form/alert";
import { Colors, Spacing } from "@/constants/theme";
import { authApi } from "@/services/api";

// Validation schema
const loginSchema = z.object({
  mobile_number: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const colors = Colors.light;
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
      mobile_number: "",
      password: "",
    },
  });

  const { login, isAuthenticated } = useAuth();

useEffect(() => {
  if (isAuthenticated) {
    router.replace('/dashboard');
  }
}, [isAuthenticated, router]);

const onSubmit = async (data: LoginFormData) => {
  setIsLoading(true);

  try {
    const response = await authApi.login({
      mobile_number: data.mobile_number,
      password: data.password,
    });

    if (response.access_token && response.user) {
      await login(
        response.user,
        response.access_token,
      );
    }

    setAlert({
      type: 'success',
      title: 'Login Successful',
      message: 'Welcome back to SasyaVana!',
    });

    setTimeout(() => {
      router.replace('/dashboard');
    }, 1000);
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appTitle}>SasyaVana</Text>
            <Text style={styles.subtitle}>Login to continue</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Mobile Number */}
            <Controller
              control={control}
              name="mobile_number"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Mobile Number"
                  placeholder="10-digit number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  error={errors.mobile_number?.message}
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
                onPress={() => router.replace("/register")}
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
                    type: "info",
                    title: "Coming Soon",
                    message:
                      "Password recovery feature will be available soon.",
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
            if (alert.type !== "success") {
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
  width: '100%',
  maxWidth: 500,
  alignSelf: 'center',
  paddingHorizontal: 24,
},
    header: {
  alignItems: 'center',
  marginBottom: 40,
  marginTop: 30,
},

appTitle: {
  fontSize: 32,
  fontWeight: '700',
  color: '#166534',
  marginBottom: 8,
},

subtitle: {
  fontSize: 16,
  color: '#666',
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
