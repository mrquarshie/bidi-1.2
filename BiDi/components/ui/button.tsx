import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = [styles.base, styles[size]];
    
    switch (variant) {
      case 'primary':
        return [
          ...baseStyle,
          { backgroundColor: primaryColor },
          disabled && { opacity: 0.5 },
        ];
      case 'secondary':
        return [
          ...baseStyle,
          { backgroundColor: useThemeColor({}, 'backgroundSecondary') },
          disabled && { opacity: 0.5 },
        ];
      case 'outline':
        return [
          ...baseStyle,
          { 
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: primaryColor,
          },
          disabled && { opacity: 0.5 },
        ];
      case 'ghost':
        return [
          ...baseStyle,
          { backgroundColor: 'transparent' },
          disabled && { opacity: 0.5 },
        ];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle = [styles.text, styles[`${size}Text`]];
    
    switch (variant) {
      case 'primary':
        return [...baseTextStyle, { color: '#ffffff' }];
      case 'secondary':
        return [...baseTextStyle, { color: textColor }];
      case 'outline':
        return [...baseTextStyle, { color: primaryColor }];
      case 'ghost':
        return [...baseTextStyle, { color: primaryColor }];
      default:
        return [...baseTextStyle, { color: '#ffffff' }];
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#ffffff' : primaryColor} 
          size="small" 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 52,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
});
