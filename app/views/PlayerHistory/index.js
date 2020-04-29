import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {withTheme, DataTable} from 'react-native-paper';
import Header from '../Header';

const PlayerHistory = props => {
  const colors = props.theme.colors;

  const [playerList, setPlayerList] = useState(undefined);

  useEffect(() => {
    if (props.players !== undefined) {
      setPlayerList(props.players);
    }
  }, [props.players]);

  let playerTableData = <></>;

  if (playerList !== undefined) {
    playerTableData = playerList.map((player, index) => {
      return (
        <DataTable.Row key={index}>
          <DataTable.Cell>{player.name}</DataTable.Cell>
          <DataTable.Cell numeric>{player.totalGames}</DataTable.Cell>
          <DataTable.Cell numeric>{player.totalWins}</DataTable.Cell>
          <DataTable.Cell numeric>{player.totalThrows}</DataTable.Cell>
          <DataTable.Cell numeric>{player.totalMisses}</DataTable.Cell>
          <DataTable.Cell numeric>{player.totalPoints}</DataTable.Cell>
        </DataTable.Row>
      );
    });
  }

  const [sortOrder, setSortOrder] = useState('descending');

  const sortArray = column => {
    let order = sortOrder === 'descending' ? -1 : 1;

    let orderedArray = playerList;

    setSortOrder(sortOrder === 'descending' ? 'ascending' : 'descending');

    switch (column) {
      case 'players':
        orderedArray = orderedArray.sort(function(a, b) {
          const playerA = a.name.toUpperCase();
          const playerB = b.name.toUpperCase();

          let comparison = 0;
          if (playerA > playerB) {
            comparison = 1;
          } else if (playerA < playerB) {
            comparison = -1;
          }
          return comparison * order;
        });

        setPlayerList(orderedArray);
        break;
      case 'games':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalGames > b.totalGames) {
            comparison = 1;
          } else if (a.totalGames < b.totalGames) {
            comparison = -1;
          }
          return comparison * order;
        });

        setPlayerList(orderedArray);
        break;
      case 'wins':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalWins > b.totalWins) {
            comparison = 1;
          } else if (a.totalWins < b.totalWins) {
            comparison = -1;
          }
          return comparison * order;
        });

        setPlayerList(orderedArray);
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

        setPlayerList(orderedArray);
        break;
      case 'misses':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalMisses > b.totalMisses) {
            comparison = 1;
          } else if (a.totalMisses < b.totalMisses) {
            comparison = -1;
          }
          return comparison * order;
        });

        setPlayerList(orderedArray);
        break;
      case 'points':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalPoints > b.totalPoints) {
            comparison = 1;
          } else if (a.totalPoints < b.totalPoints) {
            comparison = -1;
          }
          return comparison * order;
        });

        setPlayerList(orderedArray);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header title="Player History" />
      <View style={{flex: 1, padding: 16, backgroundColor: colors.background}}>
        {props.players !== undefined ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title onPress={() => sortArray('players')}>
                Player
              </DataTable.Title>
              <DataTable.Title numeric onPress={() => sortArray('games')}>
                Games
              </DataTable.Title>
              <DataTable.Title numeric onPress={() => sortArray('wins')}>
                Wins
              </DataTable.Title>
              <DataTable.Title numeric onPress={() => sortArray('throws')}>
                Throws
              </DataTable.Title>
              <DataTable.Title numeric onPress={() => sortArray('misses')}>
                Misses
              </DataTable.Title>
              <DataTable.Title numeric onPress={() => sortArray('points')}>
                Points
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView>{playerTableData}</ScrollView>
          </DataTable>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  players: state.data.players,
});

export default connect(
  mapStateToProps,
  null,
)(withTheme(PlayerHistory));
