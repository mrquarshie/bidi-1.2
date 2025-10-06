import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

export function Card({ 
  children, 
  style, 
  variant = 'default', 
  padding = 'md',
  onPress 
}: CardProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'cardBorder');
  
  const cardStyle = [
    styles.base,
    {
      backgroundColor,
      borderColor,
    },
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
    padding === 'sm' && styles.paddingSm,
    padding === 'md' && styles.paddingMd,
    padding === 'lg' && styles.paddingLg,
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
  },
  paddingSm: {
    padding: 12,
  },
  paddingMd: {
    padding: 16,
  },
  paddingLg: {
    padding: 24,
  },
});
