import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  ({ label, error, required, style, ...props }, ref) => {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
    const styles = createStyles(colors);

    return (
      <View style={styles.container}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}
        <RNTextInput
          ref={ref}
          style={[
            styles.input,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor={colors.placeholder}
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

TextInput.displayName = 'TextInput';

interface SelectOptionProps {
  label: string;
  value: string;
}

interface SelectProps extends Omit<RNTextInputProps, 'value'> {
  label?: string;
  error?: string;
  required?: boolean;
  options: SelectOptionProps[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Select = React.forwardRef<RNTextInput, SelectProps>(
  ({ label, error, required, options, value, onValueChange, style, ...props }, ref) => {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
    const styles = createStyles(colors);

    return (
      <View style={styles.container}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}
        <RNTextInput
          ref={ref}
          style={[
            styles.input,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor={colors.placeholder}
          value={value}
          editable={false}
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

Select.displayName = 'Select';

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      marginBottom: Spacing.md,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: Spacing.sm,
    },
    required: {
      color: colors.error,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.surface,
    },
    inputError: {
      borderColor: colors.error,
    },
    errorText: {
      fontSize: 12,
      color: colors.error,
      marginTop: Spacing.sm,
      fontWeight: '500',
    },
  });
}
