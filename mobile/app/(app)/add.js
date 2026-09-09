// OnStage — Criar publicação/página
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Screen, Header, Card, Button, Input } from '../src/components';
import { colors, spacing, radius, typography } from '../src/theme';

const OPTIONS = [
  { key: 'post', icon: '📝', label: 'Nova publicação', desc: 'Compartilhe com a rede' },
  { key: 'band', icon: '🎸', label: 'Criar página de banda', desc: 'Mostre sua música' },
  { key: 'musician', icon: '🎵', label: 'Criar página de músico', desc: 'Seu perfil musical' },
  { key: 'studio', icon: '🎙️', label: 'Cadastrar estúdio', desc: 'Alugue salas e agende shows' },
  { key: 'venue', icon: '🍻', label: 'Cadastrar bar/venue', desc: 'Divulgue eventos e contrate' },
  { key: 'event', icon: '🎤', label: 'Criar evento', desc: 'Organize um show ou festival' },
];

export default function AddScreen() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option.key);
    Alert.alert(
      'Em desenvolvimento',
      `A criação de ${option.label.toLowerCase()} estará disponível em breve.`
    );
  };

  return (
    <Screen>
      <Header title="Criar" subtitle="O que você quer fazer?" />

      <View style={styles.options}>
        {OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            activeOpacity={0.7}
            onPress={() => handleSelect(option)}
          >
            <Card
              style={[
                styles.optionCard,
                selected === option.key && styles.optionCardActive,
              ]}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <View style={styles.optionContent}>
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionDesc}>{option.desc}</Text>
              </View>
              <Text style={styles.optionArrow}>→</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: {
    paddingHorizontal: spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  optionCardActive: {
    borderColor: colors.roxo,
    borderWidth: 2,
  },
  optionIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    ...typography.bodyBold,
    color: colors.cinza900,
    marginBottom: 2,
  },
  optionDesc: {
    ...typography.caption,
    color: colors.cinza500,
  },
  optionArrow: {
    fontSize: 20,
    color: colors.cinza400,
  },
});
