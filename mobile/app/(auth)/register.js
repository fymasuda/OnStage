// OnStage — Tela de Registro
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input } from '../src/components';
import { colors, spacing, typography } from '../src/theme';
import { useAuthStore } from '../src/store/authStore';

export default function RegisterScreen() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name) e.name = 'Nome obrigatório';
    if (!form.email) e.email = 'E-mail obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido';
    if (!form.password) e.password = 'Senha obrigatória';
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Senhas não conferem';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleRegister = async () => {
    if (!form.type) {
      Alert.alert('Erro', 'Selecione como você quer usar o OnStage');
      return;
    }

    setLoading(true);
    const result = await register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      type: form.type,
    });
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
        <Text style={styles.tagline}>
          {step === 1 ? 'Crie sua conta' : 'Como você quer usar?'}
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.progress}>
        <View style={[styles.progressDot, step >= 1 && styles.progressDotActive]} />
        <View style={[styles.progressLine, step >= 2 && styles.progressLineActive]} />
        <View style={[styles.progressDot, step >= 2 && styles.progressDotActive]} />
      </View>

      <View style={styles.form}>
        {step === 1 ? (
          <>
            <Input
              placeholder="Nome completo"
              value={form.name}
              onChangeText={(v) => updateField('name', v)}
              autoCapitalize="words"
              error={errors.name}
            />
            <Input
              placeholder="E-mail"
              value={form.email}
              onChangeText={(v) => updateField('email', v)}
              keyboardType="email-address"
              error={errors.email}
            />
            <Input
              placeholder="Telefone (opcional)"
              value={form.phone}
              onChangeText={(v) => updateField('phone', v)}
              keyboardType="phone-pad"
            />
            <Input
              placeholder="Senha"
              value={form.password}
              onChangeText={(v) => updateField('password', v)}
              secureTextEntry
              error={errors.password}
            />
            <Input
              placeholder="Confirmar senha"
              value={form.confirmPassword}
              onChangeText={(v) => updateField('confirmPassword', v)}
              secureTextEntry
              error={errors.confirmPassword}
            />
            <Button
              title="Continuar"
              onPress={handleNext}
              style={styles.submitBtn}
            />
          </>
        ) : (
          <>
            <View style={styles.typeGrid}>
              {[
                { key: 'MUSICIAN', icon: '🎸', label: 'Músico' },
                { key: 'BAND', icon: '🎵', label: 'Banda' },
                { key: 'CONTRACTOR', icon: '🎤', label: 'Contratante' },
                { key: 'STUDIO', icon: '🎙️', label: 'Estúdio' },
                { key: 'FAN', icon: '🎧', label: 'Só explorar' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.typeCard,
                    form.type === item.key && styles.typeCardActive,
                  ]}
                  onPress={() => updateField('type', item.key)}
                >
                  <Text style={styles.typeIcon}>{item.icon}</Text>
                  <Text
                    style={[
                      styles.typeLabel,
                      form.type === item.key && styles.typeLabelActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              title="Criar conta"
              onPress={handleRegister}
              loading={loading}
              style={styles.submitBtn}
            />
            <Button
              title="Voltar"
              variant="secondary"
              onPress={() => setStep(1)}
              style={styles.submitBtn}
            />
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem conta? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.footerLink}>Entrar</Text>
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
    marginBottom: spacing.lg,
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
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.cinza200,
  },
  progressDotActive: {
    backgroundColor: colors.roxo,
  },
  progressLine: {
    width: 60,
    height: 2,
    backgroundColor: colors.cinza200,
    marginHorizontal: spacing.sm,
  },
  progressLineActive: {
    backgroundColor: colors.roxo,
  },
  form: {
    width: '100%',
  },
  typeGrid: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.cinza50,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.cinza200,
  },
  typeCardActive: {
    borderColor: colors.roxo,
    backgroundColor: '#ede9fe',
  },
  typeIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  typeLabel: {
    ...typography.bodyMedium,
    color: colors.cinza700,
  },
  typeLabelActive: {
    color: colors.roxo,
    fontWeight: '700',
  },
  submitBtn: {
    marginTop: spacing.sm,
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
