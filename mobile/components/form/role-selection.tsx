import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

export type UserRole = "B2C_BUYER" | "B2B_BUYER" | "NURSERY_SELLER";

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    value: "B2C_BUYER",
    label: "B2C Buyer",
    description: "Individual buyer",
  },
  {
    value: "B2B_BUYER",
    label: "B2B Buyer",
    description: "Business buyer",
  },
  {
    value: "NURSERY_SELLER",
    label: "Nursery Seller",
    description: "Plant seller",
  },
];

interface RoleSelectionProps {
  selectedRole?: UserRole;
  onSelectRole: (role: UserRole) => void;
  error?: string;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  selectedRole,
  onSelectRole,
  error,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Role <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.optionsContainer}>
        {ROLE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              selectedRole === option.value && styles.optionSelected,
            ]}
            onPress={() => onSelectRole(option.value)}
          >
            <View
              style={[
                styles.radio,
                selectedRole === option.value && styles.radioSelected,
              ]}
            >
              {selectedRole === option.value && (
                <View style={styles.radioDot} />
              )}
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      marginBottom: Spacing.lg,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: Spacing.md,
    },
    required: {
      color: colors.error,
    },
    optionsContainer: {
      gap: Spacing.md,
    },
    option: {
      flexDirection: "row",
      alignItems: "flex-start",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      backgroundColor: colors.surface,
    },
    optionSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLighter,
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.border,
      marginRight: Spacing.md,
      marginTop: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    radioSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    radioDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#FFFFFF",
    },
    optionContent: {
      flex: 1,
    },
    optionLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: Spacing.xs,
    },
    optionDescription: {
      fontSize: 12,
      color: colors.placeholder,
    },
    errorText: {
      fontSize: 12,
      color: colors.error,
      marginTop: Spacing.md,
      fontWeight: "500",
    },
  });
}
