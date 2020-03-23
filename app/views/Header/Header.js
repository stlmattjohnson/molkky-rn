import React from 'react';
import {Appbar} from 'react-native-paper';

const Header = props => {
  return (
    <Appbar.Header>
      {props.back ? (
        <>
          <Appbar.BackAction
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <Appbar.Content title={props.title} />
        </>
      ) : (
        <Appbar.Content title={props.title} />
      )}
    </Appbar.Header>
  );
};

export default Header;
