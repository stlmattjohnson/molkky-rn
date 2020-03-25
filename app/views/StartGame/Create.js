import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {
  withTheme,
  Modal,
  Portal,
  Button,
  Checkbox,
  Headline,
  Subheading,
  Divider,
  TextInput,
  IconButton,
} from 'react-native-paper';
import Header from '../Header';
import {createGame, createPlayer} from '../../actions/gameActions';
import SkittleButton from './components/SkittleButton';

const Create = props => {
  const [visible, setVisible] = useState(false);

  const [player, setPlayer] = useState({
    name: '',
    totalGames: 0,
    totalWins: 0,
    totalThrows: 0,
    totalMisses: 0,
    totalPoints: 0,
  });

  const [game, setGame] = useState({
    active: true,
    players: [],
    date: new Date().toLocaleDateString(),
    winner: '',
    totalThrows: 0,
  });

  const shuffle = a => {
    let array = a;

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const colors = props.theme.colors;

  const playersInGame = game.players.map((player, index) => {
    return (
      <Subheading key={index} style={{marginBottom: 8}}>
        {props.players[player].name}
      </Subheading>
    );
  });

  const playerList =
    props.players.length > 0 ? (
      props.players.map((player, index) => {
        const status = game.players.includes(index) ? 'checked' : 'unchecked';
        const existIndex = game.players.includes(index)
          ? game.players.indexOf(index)
          : 0;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              game.players.includes(index)
                ? setGame({
                    ...game,
                    players: [
                      ...game.players.slice(0, existIndex),
                      ...game.players.slice(existIndex + 1),
                    ],
                  })
                : setGame({...game, players: [...game.players, index]});
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox status={status} />
              <Subheading>{player.name}</Subheading>
            </View>
          </TouchableOpacity>
        );
      })
    ) : (
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          paddingTop: 30,
        }}>
        <Headline>Add some players to get started!</Headline>
      </View>
    );

  return (
    <>
      <Header title="Create Game" />
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
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flex: 8}}>
              <TextInput
                dense={true}
                label="New Player"
                value={player.name}
                onChangeText={text => setPlayer({...player, name: text})}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <IconButton
                icon="plus"
                size={30}
                onPress={() => {
                  player.name.length === 0 ? 1 + 1 : props.createPlayer(player),
                    setPlayer({...player, name: ''});
                }}
              />
            </View>
          </View>
          <ScrollView>{playerList}</ScrollView>
          <View>
            <Button
              onPress={() => {
                game.players.length > 1 ? setVisible(true) : 1 + 1;
              }}>
              {game.players.length > 1
                ? 'Play Game'
                : `Add ${2 - game.players.length} more player${
                    game.players.length === 0 ? 's' : ''
                  }`}
            </Button>
          </View>
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: colors.background,
            padding: 16,
            marginHorizontal: 32,
            maxHeight: '50%',
            minHeight: '50%',
            borderRadius: 8,
          }}>
          <Headline style={{textAlign: 'center', marginBottom: 16}}>
            Who's Playing
          </Headline>
          <Divider />
          <ScrollView style={{paddingVertical: 16}}>{playersInGame}</ScrollView>
          <Divider />
          <View style={{marginTop: 16}}>
            <Button
              onPress={() =>
                setGame({...game, players: shuffle(game.players)})
              }>
              Shuffle Players!
            </Button>
            <Button
              onPress={() => {
                props.createGame(game),
                  setVisible(false),
                  props.navigation.navigate('Play', {
                    game: props.games.length,
                  });
              }}>
              Let's Play!
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const mapStateToProps = state => ({
  players: state.data.players,
  games: state.data.games,
});

export default connect(mapStateToProps, {
  createPlayer,
  createGame,
})(withTheme(Create));
