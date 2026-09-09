// OnStage — Tela de Login
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input } from '../src/components';
import { colors, spacing, typography } from '../src/theme';
import { useAuthStore } from '../src/store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const newErrors = {};
    if (!email) newErrors.email = 'E-mail obrigatório';
    if (!password) newErrors.password = 'Senha obrigatória';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.replace('/(app)/feed');
    } else {
      Alert.alert('Erro', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          On<span style={styles.logoAccent}>Stage</span>
        </Text>
        <Text style={styles.tagline}>Onde a música encontra seu público</Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            setErrors((e) => ({ ...e, email: '' }));
          }}
          keyboardType="email-address"
          error={errors.email}
        />

        <Input
          placeholder="Senha"
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            setErrors((e) => ({ ...e, password: '' }));
          }}
          secureTextEntry
          error={errors.password}
        />

        <TouchableOpacity style={styles.forgotLink}>
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          style={styles.submitBtn}
        />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button
          title="Continuar com Google"
          variant="secondary"
          style={styles.submitBtn}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.footerLink}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.roxo,
    marginBottom: spacing.xs,
  },
  logoAccent: {
    color: colors.amarelo,
  },
  tagline: {
    ...typography.body,
    color: colors.cinza500,
  },
  form: {
    width: '100%',
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  forgotText: {
    ...typography.caption,
    color: colors.roxo,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.cinza200,
  },
  dividerText: {
    ...typography.caption,
    color: colors.cinza400,
    marginHorizontal: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body,
    color: colors.cinza500,
  },
  footerLink: {
    ...typography.body,
    color: colors.roxo,
    fontWeight: '600',
  },
});
