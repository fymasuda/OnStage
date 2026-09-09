// OnStage — Chat (mensagens)
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Screen, Header, Card, Avatar, Input, Chip } from '../src/components';
import { colors, spacing, radius, typography } from '../src/theme';

const MOCK_CONVERSATIONS = [
  {
    id: '1',
    name: 'Bar do Zé',
    initials: 'BZ',
    lastMessage: 'Perfeito! Confirmado dia 15/11 às 21h...',
    time: '10:42',
    unread: 2,
    type: 'VENUE',
  },
  {
    id: '2',
    name: 'Festival Rock SP',
    initials: 'FR',
    lastMessage: 'Vamos fechar! Precisamos de 2 sets de 1h...',
    time: 'Ontem',
    unread: 0,
    type: 'CONTRACTOR',
  },
  {
    id: '3',
    name: 'Estúdio Batukerê',
    initials: 'EB',
    lastMessage: 'Sala disponível quinta às 14h. Interesse?',
    time: 'Seg',
    unread: 0,
    type: 'STUDIO',
  },
  {
    id: '4',
    name: 'Casamento Ana & Pedro',
    initials: 'CA',
    lastMessage: 'Adorei o repertório! Vamos conversar?',
    time: 'Dom',
    unread: 0,
    type: 'CONTRACTOR',
  },
];

export default function ChatScreen() {
  const [search, setSearch] = useState('');

  const renderConversation = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.conversationItem}>
        <Avatar
          size={52}
          initials={item.initials}
        />
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.conversationName}>{item.name}</Text>
            <Text style={styles.conversationTime}>{item.time}</Text>
          </View>
          <View style={styles.conversationFooter}>
            <Text
              style={[
                styles.conversationPreview,
                item.unread > 0 && styles.conversationPreviewUnread,
              ]}
              numberOfLines={1}
            >
              {item.lastMessage}
            </Text>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen>
      <Header title="Mensagens" subtitle="Suas conversas" />

      {/* Search */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Buscar conversas..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Conversations List */}
      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        style={styles.conversationsList}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.branco,
    borderBottomWidth: 1,
    borderBottomColor: colors.cinza100,
  },
  conversationContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    ...typography.bodyBold,
    color: colors.cinza900,
  },
  conversationTime: {
    ...typography.caption,
    color: colors.cinza400,
  },
  conversationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversationPreview: {
    ...typography.body,
    color: colors.cinza500,
    flex: 1,
  },
  conversationPreviewUnread: {
    color: colors.cinza900,
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: colors.roxo,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginLeft: spacing.sm,
  },
  unreadBadgeText: {
    color: colors.branco,
    fontSize: 11,
    fontWeight: '700',
  },
});
