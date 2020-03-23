import React from 'react';
import {connect} from 'react-redux';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GameHistory from '../GameHistory';
import PlayerHistory from '../PlayerHistory';
import StartGame from '../StartGame';
import Settings from '../Settings/Settings';
import {useDarkMode} from 'react-native-dark-mode';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = props => {
  const colors = props.theme.colors;
  const isDark = useDarkMode();

  return (
    <Tab.Navigator
      initialRouteName="Start"
      activeColor={'white'}
      labelStyle={{fontSize: 16}}
      barStyle={{
        backgroundColor: props.useDeviceMode
          ? isDark
            ? colors.surface
            : colors.primary
          : props.darkMode
          ? colors.surface
          : colors.primary,
      }}>
      <Tab.Screen
        name="Start"
        component={StartGame}
        options={{
          tabBarLabel: 'Start Game',
          tabBarIcon: props => (
            <Icon name="podium-gold" color="white" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={GameHistory}
        options={{
          tabBarLabel: 'Game History',
          tabBarIcon: props => <Icon name="trophy" color="white" size={20} />,
        }}
      />

      <Tab.Screen
        name="Players"
        component={PlayerHistory}
        options={{
          tabBarLabel: 'Players',
          tabBarIcon: props => (
            <Icon name="account-group" color="white" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: props => <Icon name="settings" color="white" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = state => ({
  darkMode: state.setting.darkMode,
  useDeviceMode: state.setting.useDeviceMode,
});

export default connect(mapStateToProps, null)(withTheme(BottomNavigation));
