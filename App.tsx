import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import CaseScreen from './src/screens/CaseScreen';
import ClueScreen from './src/screens/ClueScreen';
import ResultScreen from './src/screens/ResultScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import DailyCaseScreen from './src/screens/DailyCaseScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0e27' },
          headerTintColor: '#00ff9f',
          headerTitleStyle: { fontFamily: 'monospace', fontWeight: 'bold' },
          cardStyle: { backgroundColor: '#0a0e27' },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '> CYBER_DETECTIVE_' }} />
        <Stack.Screen name="Case" component={CaseScreen} options={{ title: '> CASE_FILE' }} />
        <Stack.Screen name="Clue" component={ClueScreen} options={{ title: '> ANALYZE_CLUE' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: '> VERDICT' }} />
        <Stack.Screen name="Daily" component={DailyCaseScreen} options={{ title: '> DAILY_CASE' }} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: '> LEADERBOARD' }} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ title: '> ACHIEVEMENTS' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}