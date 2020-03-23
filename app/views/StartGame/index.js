import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from './Landing';
import Create from './Create';
import Play from './Play';

const Stack = createStackNavigator();

const StartGame = props => {
  return (
    <Stack.Navigator initialRouteName="Landing" headerMode="none">
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Play" component={Play} />
    </Stack.Navigator>
  );
};

export default StartGame;
