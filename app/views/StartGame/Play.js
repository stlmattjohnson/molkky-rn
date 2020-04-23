import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {
  withTheme,
  Text,
  Divider,
  Headline,
  Button,
  IconButton,
  DataTable,
} from 'react-native-paper';
import Header from '../Header';
import {recordScore, gameWon} from '../../actions/gameActions';
import ActiveSkittleButton from './components/ActiveSkittleButton';
import {ScrollView} from 'react-native-gesture-handler';

const Play = props => {
  const colors = props.theme.colors;
  const [gameID, setGameID] = useState(props.route.params.game);
  const [activePlayer, setActivePlayer] = useState(0);
  const [skittles, setSkittles] = useState('');

  const [scoreArray, setScoreArray] = useState([]);

  const score =
    scoreArray.length === 1
      ? scoreArray[0].toString()
      : scoreArray.length.toString();

  const length = props.games[gameID].players.length;

  const checkSkittle = number => {
    if (scoreArray.includes(number)) {
      let index = scoreArray.indexOf(number);
      setScoreArray([
        ...scoreArray.slice(0, index),
        ...scoreArray.slice(index + 1),
      ]);
    } else {
      setScoreArray([...scoreArray, number]);
    }
  };

  const checkPlayer = number => {
    let next = number + 1;

    if (next >= length) {
      next = 0;
    }

    if (props.games[gameID].players[next].currentMisses === 3) {
      checkPlayer(next);
    } else {
      setActivePlayer(next);
    }
  };

  useFocusEffect(() => {
    setGameID(props.route.params.game);
  }, [props.route.params.game]);

  useFocusEffect(() => {
    const winningScore = props.games[gameID].players.filter(player => {
      return player.currentPoints === 50;
    });
    const lastPlayer = props.games[gameID].players.filter(player => {
      return player.currentMisses != 3;
    });

    if (
      (lastPlayer.length === 1 || winningScore.length === 1) &&
      props.games[gameID].active
    ) {
      if (lastPlayer.length === 1) {
        props.gameWon(gameID, lastPlayer[0].player);
      }
      if (winningScore.length === 1) {
        props.gameWon(gameID, winningScore[0].player);
      }
    }
  }, [activePlayer]);

  const playerTableData = props.games[gameID].players.map((p, index) => {
    const color =
      index === activePlayer
        ? colors.primary
        : p.currentMisses === 3
        ? colors.error
        : colors.text;

    return (
      <DataTable.Row key={index}>
        <DataTable.Cell>
          <Text style={{color: color}}>{props.players[p.player].name}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Text style={{color: color}}>{p.currentMisses}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Text style={{color: color}}>{p.currentPoints}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  return (
    <>
      <Header title="Play Game" />
      <View style={{flex: 1, padding: 16, backgroundColor: colors.background}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(7)}>
              7
            </ActiveSkittleButton>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(9)}>
              9
            </ActiveSkittleButton>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(8)}>
              8
            </ActiveSkittleButton>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(5)}>
              5
            </ActiveSkittleButton>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(11)}>
              11
            </ActiveSkittleButton>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(12)}>
              12
            </ActiveSkittleButton>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(6)}>
              6
            </ActiveSkittleButton>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(3)}>
              3
            </ActiveSkittleButton>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(10)}>
              10
            </ActiveSkittleButton>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(4)}>
              4
            </ActiveSkittleButton>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(1)}>
              1
            </ActiveSkittleButton>
            <ActiveSkittleButton
              status={skittles}
              clear={() => setSkittles('')}
              check={() => checkSkittle(2)}>
              2
            </ActiveSkittleButton>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          {props.games[gameID].active ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingBottom: 16,
              }}>
              <Headline>
                {
                  props.players[
                    props.games[gameID].players[activePlayer].player
                  ].name
                }
                's turn!
              </Headline>
              <Text
                style={{
                  fontSize: 40,
                  color: score === '0' ? colors.error : colors.primary,
                }}>
                {score}
              </Text>
              <IconButton
                icon="check"
                size={30}
                onPress={() => {
                  props.recordScore(gameID, activePlayer, parseInt(score));
                  checkPlayer(activePlayer),
                    setScoreArray([]),
                    setSkittles('reset');
                }}
              />
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingBottom: 16,
                }}>
                <Headline>{props.games[gameID].winner} won!</Headline>
              </View>
              <Button
                style={{marginBottom: 16}}
                onPress={() => props.navigation.goBack()}>
                Play Again
              </Button>
            </View>
          )}
          <Divider />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Player</DataTable.Title>
              <DataTable.Title numeric>Misses</DataTable.Title>
              <DataTable.Title numeric>Score</DataTable.Title>
            </DataTable.Header>
            <ScrollView>{playerTableData}</ScrollView>
          </DataTable>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  players: state.data.players,
  games: state.data.games,
});

export default connect(
  mapStateToProps,
  {recordScore, gameWon},
)(withTheme(Play));
