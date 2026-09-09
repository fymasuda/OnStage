// OnStage — Componentes Base
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';

// === BUTTON ===
export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  style = {},
}) {
  const variants = {
    primary: {
      bg: colors.roxo,
      text: colors.branco,
    },
    secondary: {
      bg: colors.cinza100,
      text: colors.cinza700,
    },
    outline: {
      bg: 'transparent',
      text: colors.roxo,
      border: colors.roxo,
    },
    danger: {
      bg: colors.vermelho,
      text: colors.branco,
    },
  };

  const sizes = {
    sm: { paddingV: 8, paddingH: 16, fontSize: 13 },
    md: { paddingV: 14, paddingH: 24, fontSize: 15 },
    lg: { paddingV: 18, paddingH: 32, fontSize: 17 },
  };

  const v = variants[variant];
  const s = sizes[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.cinza300 : v.bg,
          paddingVertical: s.paddingV,
          paddingHorizontal: s.paddingH,
          borderRadius: radius.sm,
          borderWidth: v.border ? 1.5 : 0,
          borderColor: v.border || 'transparent',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <View style={styles.buttonIcon}>{icon}</View>}
          <Text
            style={[
              styles.buttonText,
              { color: v.text, fontSize: s.fontSize },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// === INPUT ===
export function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error = '',
  style = {},
}) {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.cinza400}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={styles.input}
      />
      {error ? <Text style={styles.inputError}>{error}</Text> : null}
    </View>
  );
}

// === CARD ===
export function Card({ children, onPress, style = {} }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[styles.card, style]}
    >
      {children}
    </Wrapper>
  );
}

// === AVATAR ===
export function Avatar({ uri, size = 48, initials = '' }) {
  if (uri) {
    return (
      <View
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        {/* Image would go here with expo-image */}
        <View
          style={[
            styles.avatarPlaceholder,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text style={[styles.avatarInitials, { fontSize: size * 0.4 }]}>
            {initials.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.avatarPlaceholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.roxoLight,
        },
      ]}
    >
      <Text style={[styles.avatarInitials, { fontSize: size * 0.4 }]}>
        {initials.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

// === CHIP ===
export function Chip({ label, active = false, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        { backgroundColor: active ? colors.roxo : colors.branco },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          { color: active ? colors.branco : colors.cinza700 },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// === CREDIT BAR ===
export function CreditBar({ credits = 0, onBuy }) {
  return (
    <View style={styles.creditBar}>
      <View style={styles.creditInfo}>
        <Text style={styles.creditIcon}>🪙</Text>
        <Text style={styles.creditText}>{credits} créditos</Text>
      </View>
      <TouchableOpacity onPress={onBuy} style={styles.creditCta}>
        <Text style={styles.creditCtaText}>Comprar +</Text>
      </TouchableOpacity>
    </View>
  );
}

// === SCREEN WRAPPER ===
export function Screen({ children, scroll = true, style = {} }) {
  return (
    <View style={[styles.screen, style]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  );
}

// === HEADER ===
export function Header({ title, subtitle = '', onBack }) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.headerBack}>
          <Text style={styles.headerBackText}>←</Text>
        </TouchableOpacity>
      )}
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}

// === BADGE ===
export function Badge({ label, variant = 'default' }) {
  const variants = {
    default: { bg: colors.cinza100, text: colors.cinza700 },
    success: { bg: '#d1fae5', text: '#065f46' },
    warning: { bg: '#fef3c7', text: '#92400e' },
    primary: { bg: '#ede9fe', text: colors.roxoDark },
    verified: { bg: colors.amarelo, text: colors.cinza900 },
  };
  const v = variants[variant] || variants.default;

  return (
    <View style={[styles.badge, { backgroundColor: v.bg }]}>
      <Text style={[styles.badgeText, { color: v.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Button
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    fontWeight: '600',
  },

  // Input
  inputContainer: {
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.cinza50,
    borderWidth: 1.5,
    borderColor: colors.cinza200,
    borderRadius: radius.sm,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.cinza900,
  },
  inputError: {
    color: colors.vermelho,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  // Card
  card: {
    backgroundColor: colors.branco,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },

  // Avatar
  avatar: {
    backgroundColor: colors.cinza200,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    backgroundColor: colors.roxoLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: colors.branco,
    fontWeight: '700',
  },

  // Chip
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.cinza200,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Credit Bar
  creditBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.roxo,
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  creditInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  creditIcon: {
    fontSize: 16,
  },
  creditText: {
    color: colors.branco,
    fontWeight: '600',
    fontSize: 13,
  },
  creditCta: {
    backgroundColor: colors.amarelo,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  creditCtaText: {
    color: colors.cinza900,
    fontWeight: '700',
    fontSize: 11,
  },

  // Screen
  screen: {
    flex: 1,
    backgroundColor: colors.cinza50,
  },
  scrollContent: {
    paddingVertical: spacing.md,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.branco,
    borderBottomWidth: 1,
    borderBottomColor: colors.cinza100,
  },
  headerBack: {
    marginRight: spacing.sm,
  },
  headerBackText: {
    fontSize: 24,
    color: colors.roxo,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.cinza900,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.cinza500,
  },

  // Badge
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
