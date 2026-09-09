// OnStage — Feed (tela principal)
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Screen, Header, Card, Avatar, Chip, CreditBar } from '../src/components';
import { colors, spacing, radius, typography } from '../src/theme';
import { useAuthStore } from '../src/store/authStore';

// Mock data para demonstração
const MOCK_FEED = [
  {
    id: '1',
    user: { name: 'Banda Aurora', initials: 'BA', type: 'BAND' },
    type: 'PHOTO',
    content: 'Novo single sainha do forno! 🔥 Ouçam "Luz do Palco" no Spotify',
    mediaUrl: null,
    likes: 42,
    comments: 8,
    time: '2h',
  },
  {
    id: '2',
    user: { name: 'Groove Room', initials: 'GR', type: 'STUDIO' },
    type: 'TEXT',
    content:
      '🎸 Promoção da semana: 30% off em ensaios após 22h. Agende pelo app!',
    likes: 18,
    comments: 3,
    time: '4h',
  },
  {
    id: '3',
    user: { name: 'Lucas Silva', initials: 'LS', type: 'MUSICIC' },
    type: 'VIDEO',
    content: 'Cover de "Pais e Filhos" — Legião Urban 🎶',
    likes: 67,
    comments: 15,
    time: '6h',
  },
];

const GENRES = [
  'Todos',
  'Rock',
  'MPB',
  'Samba',
  'Pop',
  'Rap',
  'Autoral',
  'Eletrônica',
];

export default function FeedScreen() {
  const user = useAuthStore((s) => s.user);
  const [activeGenre, setActiveGenre] = useState('Todos');
  const [feed, setFeed] = useState(MOCK_FEED);

  const renderPost = ({ item }) => (
    <Card style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Avatar
          size={44}
          initials={item.user.initials}
        />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postUserName}>{item.user.name}</Text>
          <Text style={styles.postTime}>{item.time} atrás</Text>
        </View>
        <Chip label={item.user.type} />
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Post Media Placeholder */}
      {item.type !== 'TEXT' && (
        <View style={styles.postMedia}>
          <Text style={styles.postMediaIcon}>
            {item.type === 'PHOTO' ? '📷' : '🎬'}
          </Text>
        </View>
      )}

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.postAction}>
          <Text style={styles.postActionIcon}>❤️</Text>
          <Text style={styles.postActionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Text style={styles.postActionIcon}>💬</Text>
          <Text style={styles.postActionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Text style={styles.postActionIcon}>🔗</Text>
          <Text style={styles.postActionText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <Screen>
      <Header title="OnStage" subtitle="O que tá rolando" />

      {/* Credits Bar */}
      <CreditBar credits={user?.credits || 50} onBuy={() => {}} />

      {/* Genre Filter */}
      <View style={styles.genreContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={GENRES}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.genreList}
          renderItem={({ item }) => (
            <Chip
              label={item}
              active={activeGenre === item}
              onPress={() => setActiveGenre(item)}
            />
          )}
        />
      </View>

      {/* Feed */}
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.feedList}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  genreContainer: {
    marginBottom: spacing.sm,
  },
  genreList: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  feedList: {
    paddingHorizontal: spacing.md,
  },
  postCard: {
    padding: 0,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  postHeaderInfo: {
    flex: 1,
  },
  postUserName: {
    ...typography.bodyBold,
    color: colors.cinza900,
  },
  postTime: {
    ...typography.caption,
    color: colors.cinza400,
  },
  postContent: {
    ...typography.body,
    color: colors.cinza700,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    lineHeight: 20,
  },
  postMedia: {
    height: 200,
    backgroundColor: colors.cinza100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  postMediaIcon: {
    fontSize: 48,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.cinza100,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  postActionIcon: {
    fontSize: 16,
  },
  postActionText: {
    ...typography.captionMedium,
    color: colors.cinza500,
  },
});
