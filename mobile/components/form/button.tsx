import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const styles = createStyles(colors);

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        isDisabled && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' ? colors.primary : '#FFFFFF'}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            styles[`buttonText_${variant}`],
            styles[`buttonText_${size}`],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

function createStyles(colors: any) {
  return StyleSheet.create({
    button: {
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    button_primary: {
      backgroundColor: colors.primary,
    },
    button_secondary: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    button_danger: {
      backgroundColor: colors.error,
    },
    button_sm: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    button_md: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
    },
    button_lg: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.lg,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontWeight: '600',
      textAlign: 'center',
    },
    buttonText_primary: {
      color: '#FFFFFF',
    },
    buttonText_secondary: {
      color: colors.primary,
    },
    buttonText_danger: {
      color: '#FFFFFF',
    },
    buttonText_sm: {
      fontSize: 14,
    },
    buttonText_md: {
      fontSize: 16,
    },
    buttonText_lg: {
      fontSize: 18,
    },
  });
}
