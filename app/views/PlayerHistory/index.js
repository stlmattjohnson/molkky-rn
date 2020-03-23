import React from 'react';
import {View} from 'react-native';
import {withTheme, Text} from 'react-native-paper';
import Header from '../Header';

const PlayerHistory = props => {
  const colors = props.theme.colors;
  return (
    <>
      <Header title="Player History" />
      <View style={{flex: 1, padding: 16, backgroundColor: colors.background}}>
        <Text>Player History</Text>
      </View>
    </>
  );
};
export default withTheme(PlayerHistory);
