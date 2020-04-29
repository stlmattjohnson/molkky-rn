import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {withTheme, Text, DataTable} from 'react-native-paper';
import Header from '../Header';

const GameHistory = props => {
  const colors = props.theme.colors;

  const [gameList, setGameList] = useState(undefined);

  useEffect(() => {
    if (props.players !== undefined) {
      setGameList(props.games);
    }
  }, [props.games]);

  let gameDataTable = <></>;

  if (gameList !== undefined) {
    gameDataTable = gameList.map((game, index) => {
      return (
        <DataTable.Row key={index}>
          <DataTable.Cell>{game.date}</DataTable.Cell>
          <DataTable.Cell numeric>{game.players.length}</DataTable.Cell>
          <DataTable.Cell numeric>{game.totalThrows}</DataTable.Cell>
          {game.active ? (
            <DataTable.Cell
              onPress={() =>
                props.navigation.navigate('Play', {
                  game: index,
                })
              }
              numeric>
              <Text style={{color: colors.primary}}>Resume</Text>
            </DataTable.Cell>
          ) : (
            <DataTable.Cell numeric>{game.winner}</DataTable.Cell>
          )}
        </DataTable.Row>
      );
    });
  }

  const [sortOrder, setSortOrder] = useState('descending');

  const sortArray = column => {
    let order = sortOrder === 'descending' ? -1 : 1;

    let orderedArray = gameList;

    setSortOrder(sortOrder === 'descending' ? 'ascending' : 'descending');

    switch (column) {
      case 'dates':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.date > b.date) {
            comparison = 1;
          } else if (a.date < b.date) {
            comparison = -1;
          }
          return comparison * order;
        });

        setGameList(orderedArray);
        break;
      case 'players':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.players.length > b.players.length) {
            comparison = 1;
          } else if (a.players.length < b.players.length) {
            comparison = -1;
          }
          return comparison * order;
        });

        setGameList(orderedArray);
        break;
      case 'throws':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalThrows > b.totalThrows) {
            comparison = 1;
          } else if (a.totalThrows < b.totalThrows) {
            comparison = -1;
          }
          return comparison * order;
        });

        setGameList(orderedArray);
        break;
      case 'winner':
        orderedArray = orderedArray.sort(function(a, b) {
          const playerA = a.winner.toUpperCase();
          const playerB = b.winner.toUpperCase();

          let comparison = 0;
          if (playerA > playerB) {
            comparison = 1;
          } else if (playerA < playerB) {
            comparison = -1;
          }
          return comparison * order;
        });

        setGameList(orderedArray);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header title="Game History" />
      <View style={{flex: 1, padding: 16, backgroundColor: colors.background}}>
        {props.games !== undefined ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title onPress={() => sortArray('dates')}>
                Date
              </DataTable.Title>
              <DataTable.Title numeric onPress={() => sortArray('players')}>
                Players
              </DataTable.Title>
              <DataTable.Title numeric onPress={() => sortArray('throws')}>
                Throws
              </DataTable.Title>
              <DataTable.Title numeric onPress={() => sortArray('winner')}>
                Winner
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView>{gameDataTable}</ScrollView>
          </DataTable>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  games: state.data.games,
  players: state.data.players,
});

export default connect(
  mapStateToProps,
  null,
)(withTheme(GameHistory));
