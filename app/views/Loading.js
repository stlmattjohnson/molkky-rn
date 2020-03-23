import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, withTheme} from 'react-native-paper';

const Loading = props => {
  const colors = props.theme.colors;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <ActivityIndicator
        animating={true}
        color={colors.primary}
        size={'large'}
      />
    </View>
  );
};

export default withTheme(Loading);
