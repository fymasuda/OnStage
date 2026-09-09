// OnStage — Perfil do Usuário
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Header, Card, Avatar, Chip, Button, Badge, CreditBar } from '../src/components';
import { colors, spacing, radius, typography } from '../src/theme';
import { useAuthStore } from '../src/store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [activeTab, setActiveTab] = useState('pages');

  const handleLogout = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <Screen>
      <Header title="Perfil" subtitle={user?.name || 'Plugado'} />

      <ScrollView>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar size={80} initials={user?.name || 'U'} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'Usuário'}</Text>
              <Text style={styles.profileEmail}>{user?.email || ''}</Text>
              <View style={styles.profileBadges}>
                <Badge label="Plugado" variant="primary" />
                {user?.isVerified && (
                  <Badge label="✓ Verificado" variant="verified" />
                )}
              </View>
            </View>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>0</Text>
              <Text style={styles.statLabel}>Páginas</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>0</Text>
              <Text style={styles.statLabel}>Shows</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>0</Text>
              <Text style={styles.statLabel}>Seguindo</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>0</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </View>
          </View>
        </Card>

        {/* Credits */}
        <CreditBar credits={user?.credits || 50} onBuy={() => {}} />

        {/* Tabs */}
        <View style={styles.tabs}>
          {[
            { key: 'pages', label: 'Minhas Páginas' },
            { key: 'bookings', label: 'Agendamentos' },
            { key: 'reviews', label: 'Avaliações' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'pages' && (
          <View style={styles.tabContent}>
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>🎸</Text>
              <Text style={styles.emptyTitle}>Nenhuma página ainda</Text>
              <Text style={styles.emptyText}>
                Crie sua página de banda, músico, estúdio ou bar para começar.
              </Text>
              <Button
                title="Criar página"
                onPress={() => {}}
                style={styles.emptyBtn}
              />
            </Card>
          </View>
        )}

        {activeTab === 'bookings' && (
          <View style={styles.tabContent}>
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Text style={styles.emptyTitle}>Nenhum agendamento</Text>
              <Text style={styles.emptyText}>
                Seus shows e ensaios aparecerão aqui.
              </Text>
            </Card>
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.tabContent}>
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>⭐</Text>
              <Text style={styles.emptyTitle}>Nenhuma avaliação</Text>
              <Text style={styles.emptyText}>
                Avaliações de shows aparecerão aqui.
              </Text>
            </Card>
          </View>
        )}

        {/* Settings */}
        <View style={styles.settings}>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingIcon}>⚙️</Text>
            <Text style={styles.settingText}>Configurações</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingIcon}>🔔</Text>
            <Text style={styles.settingText}>Notificações</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingIcon}>🔒</Text>
            <Text style={styles.settingText}>Privacidade</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingIcon}>❓</Text>
            <Text style={styles.settingText}>Ajuda</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemDanger]}
            onPress={handleLogout}
          >
            <Text style={styles.settingIcon}>🚪</Text>
            <Text style={[styles.settingText, styles.settingTextDanger]}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    marginHorizontal: spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.h3,
    color: colors.cinza900,
    marginBottom: 2,
  },
  profileEmail: {
    ...typography.caption,
    color: colors.cinza500,
    marginBottom: spacing.xs,
  },
  profileBadges: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.cinza100,
    paddingTop: spacing.md,
  },
  stat: {
    alignItems: 'center',
  },
  statNum: {
    ...typography.h3,
    color: colors.roxo,
  },
  statLabel: {
    ...typography.caption,
    color: colors.cinza500,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.sm,
    backgroundColor: colors.cinza100,
  },
  tabActive: {
    backgroundColor: colors.roxo,
  },
  tabText: {
    ...typography.captionMedium,
    color: colors.cinza500,
  },
  tabTextActive: {
    color: colors.branco,
  },
  tabContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.cinza900,
    marginBottom: spacing.xs,
  },
  emptyText: {
    ...typography.body,
    color: colors.cinza500,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyBtn: {
    minWidth: 160,
  },
  settings: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.branco,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
    ...shadows.sm,
  },
  settingItemDanger: {
    marginTop: spacing.sm,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  settingText: {
    ...typography.bodyMedium,
    color: colors.cinza700,
    flex: 1,
  },
  settingTextDanger: {
    color: colors.vermelho,
  },
  settingArrow: {
    fontSize: 18,
    color: colors.cinza400,
  },
});
