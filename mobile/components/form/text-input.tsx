import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  Text,
  StyleSheet,
  } from "react-native";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  ({ label, error, required, style, ...props }, ref) => {
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
            error ? styles.inputError : null,
            style,
          ]}
          placeholderTextColor="#9CA3AF"
          {...props}
        />

        {error && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

TextInput.displayName = "TextInput";

interface SelectOptionProps {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<RNTextInputProps, "value"> {
  label?: string;
  error?: string;
  required?: boolean;
  options: SelectOptionProps[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Select = React.forwardRef<
  RNTextInput,
  SelectProps
>(
  (
    {
      label,
      error,
      required,
      value,
      style,
      ...props
    },
    ref
  ) => {
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
            error ? styles.inputError : null,
            style,
          ]}
          value={value}
          editable={false}
          placeholderTextColor="#9CA3AF"
          {...props}
        />

        {error && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Select.displayName = "Select";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  required: {
    color: "#DC2626",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  inputError: {
    borderColor: "#DC2626",
  },

  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "500",
  },
});