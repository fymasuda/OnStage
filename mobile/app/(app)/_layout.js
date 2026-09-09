// OnStage — Layout principal com tabs
import React from 'react';
import { Tabs } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../src/theme';

function TabIcon({ name, focused }) {
  const icons = {
    feed: '🏠',
    explore: '🔍',
    add: '➕',
    chat: '💬',
    profile: '👤',
  };

  return (
    <View
      style={[
        styles.tabIconContainer,
        name === 'add' && styles.addButton,
        focused && name !== 'add' && styles.tabIconFocused,
      ]}
    >
      <Text
        style={[
          styles.tabIcon,
          name === 'add' && styles.addIcon,
          focused && name !== 'add' && styles.tabIconTextFocused,
        ]}
      >
        {icons[name] || '•'}
      </Text>
    </View>
  );
}

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.roxo,
        tabBarInactiveTintColor: colors.cinza400,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => <TabIcon name="feed" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="explore" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabIcon name="add" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => <TabIcon name="chat" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.branco,
    borderTopWidth: 1,
    borderTopColor: colors.cinza100,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tabIconFocused: {
    backgroundColor: '#ede9fe',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabIconTextFocused: {
    opacity: 1,
  },
  addButton: {
    backgroundColor: colors.roxo,
    width: 52,
    height: 52,
    borderRadius: 26,
    marginTop: -16,
    shadowColor: colors.roxo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addIcon: {
    fontSize: 24,
  },
});
