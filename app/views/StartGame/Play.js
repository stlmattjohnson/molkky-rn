import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {withTheme, Text} from 'react-native-paper';
import Header from '../Header';
import SkittleButton from './components/SkittleButton';

const Play = props => {
  const colors = props.theme.colors;
  const [gameID, setGameID] = useState(props.route.params.game);
  console.log(gameID);
  return (
    <>
      <Header title="Play Game" />
      <View style={{flex: 1, padding: 16, backgroundColor: colors.background}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <SkittleButton>7</SkittleButton>
            <SkittleButton>9</SkittleButton>
            <SkittleButton>8</SkittleButton>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <SkittleButton>5</SkittleButton>
            <SkittleButton>11</SkittleButton>
            <SkittleButton>12</SkittleButton>
            <SkittleButton>6</SkittleButton>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <SkittleButton>3</SkittleButton>
            <SkittleButton>10</SkittleButton>
            <SkittleButton>4</SkittleButton>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <SkittleButton>1</SkittleButton>
            <SkittleButton>2</SkittleButton>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Text>{JSON.stringify(props.games[gameID])}</Text>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  players: state.players,
  games: state.games,
});

export default connect(mapStateToProps, null)(withTheme(Play));
