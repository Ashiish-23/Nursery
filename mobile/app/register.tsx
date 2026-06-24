import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/form/button";
import { RoleSelection, UserRole } from "@/components/form/role-selection";
import { Alert, AlertType } from "@/components/form/alert";
import { Colors, Spacing } from "@/constants/theme";
import { authApi } from "@/services/api";
import { authStorage } from "@/services/auth-storage";

// Validation schema
const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    mobile_number: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
    email: z
      .string()
      .email("Invalid email format")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain uppercase letter")
      .regex(/[a-z]/, "Password must contain lowercase letter")
      .regex(/[0-9]/, "Password must contain number"),
    confirmPassword: z.string(),
    role: z.enum(["B2C_BUYER", "B2B_BUYER", "NURSERY_SELLER"] as const),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
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
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      mobile_number: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "B2C_BUYER",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await authApi.register({
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        email: data.email || undefined,
        password: data.password,
        role: data.role,
      });

      // Store JWT token
      if (response.access_token) {
        await authStorage.saveToken(response.access_token);
      }

      // Store user info
      if (response.user) {
        await authStorage.saveUser(response.user);
      }

      setAlert({
        type: "success",
        title: "Registration Successful",
        message: "Welcome to SasyaVana!",
      });

      // Navigate to home after brief delay
      setTimeout(() => {
        router.replace('/dashboard');
      }, 1500);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";

      setAlert({
        type: "error",
        title: "Registration Failed",
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
            <Text style={styles.subtitle}>Create your account</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <Controller
              control={control}
              name="full_name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.full_name?.message}
                  editable={!isLoading}
                  required
                />
              )}
            />

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

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  placeholder="example@email.com (optional)"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  error={errors.email?.message}
                  editable={!isLoading}
                />
              )}
            />

            {/* Role Selection */}
            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <RoleSelection
                  selectedRole={value as UserRole}
                  onSelectRole={onChange}
                  error={errors.role?.message}
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
                  placeholder="At least 8 characters"
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

            {/* Confirm Password */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  error={errors.confirmPassword?.message}
                  editable={!isLoading}
                  required
                />
              )}
            />

            {/* Register Button */}
            <Button
              onPress={handleSubmit(onSubmit)}
              title="Register"
              loading={isLoading}
              disabled={isLoading}
              size="lg"
              style={styles.submitButton}
            />

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Button
                onPress={() => router.replace("/login")}
                title="Already have an account? Login"
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
      paddingVertical: Spacing.lg,
    },
    content: {
      flex: 1,
      width: '100%',
      maxWidth: 550,
      alignSelf: 'center',
      paddingHorizontal: 24,
    },
    header: {
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 40,
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
      marginBottom: 8,
    },
    form: {
      flex: 1,
    },
    submitButton: {
      marginTop: Spacing.lg,
    },
    loginLinkContainer: {
      marginTop: Spacing.md,
    },
  });
}
