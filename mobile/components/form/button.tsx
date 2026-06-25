import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  style,
  textStyle,
}) => {
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
          color={variant === "secondary" ? "#166534" : "#FFFFFF"}
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

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  button_primary: {
    backgroundColor: "#166534",
  },

  button_secondary: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  button_danger: {
    backgroundColor: "#DC2626",
  },

  button_sm: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  button_md: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  button_lg: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    fontWeight: "600",
    textAlign: "center",
  },

  buttonText_primary: {
    color: "#FFFFFF",
  },

  buttonText_secondary: {
    color: "#166534",
  },

  buttonText_danger: {
    color: "#FFFFFF",
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