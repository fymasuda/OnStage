// OnStage — Explorar (busca e descoberta)
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Screen, Header, Card, Avatar, Chip, Input } from '../src/components';
import { colors, spacing, radius, typography } from '../src/theme';

const MOCK_RESULTS = [
  {
    id: '1',
    type: 'BAND',
    name: 'Banda Aurora',
    genre: 'MPB • Autoral',
    location: 'São Paulo, SP',
    rating: 4.9,
    reviews: 42,
    price: 1500,
    cover: '🎸',
  },
  {
    id: '2',
    type: 'BAND',
    name: 'Samba de Raiz',
    genre: 'Samba • Pagode',
    location: 'São Paulo, SP',
    rating: 4.7,
    reviews: 28,
    price: 1200,
    cover: '🥁',
  },
  {
    id: '3',
    type: 'STUDIO',
    name: 'Groove Room',
    genre: 'Ensaio',
    location: 'Vila Madalena, SP',
    rating: 4.8,
    reviews: 56,
    price: 35,
    priceLabel: '/hora',
    cover: '🎙️',
    rooms: 2,
  },
  {
    id: '4',
    type: 'MUSICIAN',
    name: 'Lucas Silva',
    genre: 'Rock • Autoral',
    location: 'Itapetininga, SP',
    rating: 4.6,
    reviews: 12,
    price: 500,
    cover: '🎵',
  },
  {
    id: '5',
    type: 'VENUE',
    name: 'Bar do Zé',
    genre: 'Ao vivo',
    location: 'Vila Madalena, SP',
    rating: 4.5,
    reviews: 89,
    cover: '🍻',
    capacity: 150,
  },
];

const FILTERS = ['Todos', 'Bandas', 'Músicos', 'Estúdios', 'Bares'];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [results, setResults] = useState(MOCK_RESULTS);

  const renderResult = ({ item }) => (
    <Card style={styles.resultCard}>
      <View style={styles.resultContent}>
        <View
          style={[
            styles.resultCover,
            {
              backgroundColor:
                item.type === 'STUDIO'
                  ? colors.amarelo
                  : item.type === 'VENUE'
                  ? colors.verde
                  : colors.roxoLight,
            },
          ]}
        >
          <Text style={styles.resultCoverIcon}>{item.cover}</Text>
        </View>

        <View style={styles.resultInfo}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Chip
              label={item.type === 'BAND'
                ? 'Banda'
                : item.type === 'STUDIO'
                ? 'Estúdio'
                : item.type === 'VENUE'
                ? 'Bar'
                : 'Músico'}
            />
          </View>
          <Text style={styles.resultGenre}>{item.genre}</Text>
          <Text style={styles.resultLocation}>📍 {item.location}</Text>

          <View style={styles.resultFooter}>
            <View style={styles.resultRating}>
              <Text style={styles.resultRatingText}>⭐ {item.rating}</Text>
              <Text style={styles.resultRatingCount}>({item.reviews})</Text>
            </View>
            {item.price && (
              <Text style={styles.resultPrice}>
                R$ {item.price.toLocaleString('pt-BR')}
                {item.priceLabel || ''}
              </Text>
            )}
            {item.rooms && (
              <Text style={styles.resultMeta}>{item.rooms} salas</Text>
            )}
            {item.capacity && (
              <Text style={styles.resultMeta}>até {item.capacity} pessoas</Text>
            )}
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <Screen>
      <Header title="Explorar" subtitle="Encontre músicos, bandas e espaços" />

      {/* Search */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Buscar bandas, músicos, gêneros..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <Chip
              label={item}
              active={activeFilter === item}
              onPress={() => setActiveFilter(item)}
            />
          )}
        />
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderResult}
        contentContainerStyle={styles.resultsList}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  filterContainer: {
    marginBottom: spacing.sm,
  },
  filterList: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  resultsList: {
    paddingHorizontal: spacing.md,
  },
  resultCard: {
    flexDirection: 'row',
    padding: spacing.md,
  },
  resultContent: {
    flexDirection: 'row',
    flex: 1,
    gap: spacing.md,
  },
  resultCover: {
    width: 70,
    height: 70,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultCoverIcon: {
    fontSize: 28,
  },
  resultInfo: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  resultName: {
    ...typography.bodyBold,
    color: colors.cinza900,
    flex: 1,
  },
  resultGenre: {
    ...typography.caption,
    color: colors.cinza500,
    marginBottom: 2,
  },
  resultLocation: {
    ...typography.caption,
    color: colors.cinza400,
    marginBottom: spacing.xs,
  },
  resultFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultRatingText: {
    ...typography.captionMedium,
    color: colors.amareloDark,
  },
  resultRatingCount: {
    ...typography.caption,
    color: colors.cinza400,
  },
  resultPrice: {
    ...typography.bodyBold,
    color: colors.roxo,
  },
  resultMeta: {
    ...typography.caption,
    color: colors.cinza500,
  },
});
