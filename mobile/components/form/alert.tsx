import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, Animated, TouchableOpacity, } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title: string;
  message?: string;
  visible: boolean;
  onDismiss?: () => void;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const Alert: React.FC<AlertProps> = ({
  type, title, message, visible, onDismiss, duration = 4000, action,
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const styles = createStyles(colors);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, animatedValue]);

  const handleDismiss = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onDismiss?.();
    });
  };

  if (!visible) return null;

  const opacity = animatedValue;
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        styles[`container_${type}`],
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
      <View style={styles.actionsContainer}>
        {action && (
          <TouchableOpacity
            onPress={() => {
              action.onPress();
              handleDismiss();
            }}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>{action.label}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleDismiss}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.md,
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.md,
    },
    container_success: {
      backgroundColor: colors.success,
    },
    container_error: {
      backgroundColor: colors.error,
    },
    container_warning: {
      backgroundColor: colors.warning,
    },
    container_info: {
      backgroundColor: colors.primary,
    },
    contentContainer: {
      flex: 1,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: Spacing.xs,
    },
    message: {
      fontSize: 13,
      color: '#FFFFFF',
      lineHeight: 18,
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    actionButton: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    actionText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    closeButton: {
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.sm,
    },
    closeButtonText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });
}
