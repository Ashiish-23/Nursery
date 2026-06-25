import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export type UserRole =
  | "B2C_BUYER"
  | "B2B_BUYER"
  | "NURSERY_SELLER";

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
              selectedRole === option.value &&
                styles.optionSelected,
            ]}
            onPress={() => onSelectRole(option.value)}
          >
            <View
              style={[
                styles.radio,
                selectedRole === option.value &&
                  styles.radioSelected,
              ]}
            >
              {selectedRole === option.value && (
                <View style={styles.radioDot} />
              )}
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>
                {option.label}
              </Text>

              <Text style={styles.optionDescription}>
                {option.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },

  required: {
    color: "#DC2626",
  },

  optionsContainer: {
    gap: 12,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  optionSelected: {
    borderColor: "#166534",
    backgroundColor: "#ECFDF5",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  radioSelected: {
    borderColor: "#166534",
    backgroundColor: "#166534",
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
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  optionDescription: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },

  errorText: {
    marginTop: 8,
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "500",
  },
});