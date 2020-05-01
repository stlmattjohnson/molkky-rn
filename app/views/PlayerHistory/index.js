import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text} from 'react-native';
import {withTheme, DataTable} from 'react-native-paper';
import Header from '../Header';
import NumberFormat from 'react-number-format';

const PlayerHistory = props => {
  const colors = props.theme.colors;
  const [playerList, setPlayerList] = useState(undefined);

  useEffect(() => {
    if (props.players !== undefined) {
      setPlayerList(props.players);
    }
  }, [props.players]);

  let playerTableData = <></>;

  const [currentPage, setCurrentPage] = useState(0);

  const changePage = () => {
    setCurrentPage(currentPage === 0 ? 1 : 0);
  };

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

  let playerTableData2 = <></>;

  if (playerList !== undefined) {
    playerTableData2 = playerList.map((player, index) => {
      return (
        <DataTable.Row key={index}>
          <DataTable.Cell>{player.name}</DataTable.Cell>
          <NumberFormat
            value={Math.floor((player.totalWins / player.totalGames) * 100)}
            displayType={'text'}
            suffix={'%'}
            fixedDecimalScale={true}
            renderText={value => (
              <DataTable.Cell numeric>{value}</DataTable.Cell>
            )}
          />
          <NumberFormat
            value={Math.floor((player.totalMisses / player.totalThrows) * 100)}
            displayType={'text'}
            suffix={'%'}
            fixedDecimalScale={true}
            renderText={value => (
              <DataTable.Cell numeric>{value}</DataTable.Cell>
            )}
          />
          <NumberFormat
            value={player.totalPoints / player.totalThrows}
            displayType={'text'}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={value => (
              <DataTable.Cell numeric>{value}</DataTable.Cell>
            )}
          />
          <NumberFormat
            value={player.totalPoints / player.totalGames}
            displayType={'text'}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={value => (
              <DataTable.Cell numeric>{value}</DataTable.Cell>
            )}
          />
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
      case 'PCTwin':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalWins / a.totalGames > b.totalWins / b.totalGames) {
            comparison = 1;
          } else if (a.totalWins / a.totalGames < b.totalWins / b.totalGames) {
            comparison = -1;
          }
          return comparison * order;
        });
        break;
      case 'PCTmiss':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalMisses / a.totalThrows > b.totalMisses / b.totalThrows) {
            comparison = 1;
          } else if (
            a.totalMisses / a.totalThrows <
            b.totalMisses / b.totalThrows
          ) {
            comparison = -1;
          }
          return comparison * order;
        });
        break;
      case 'PPthrow':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalPoints / a.totalThrows > b.totalPoints / b.totalThrows) {
            comparison = 1;
          } else if (
            a.totalPoints / a.totalThrows <
            b.totalPoints / b.totalThrows
          ) {
            comparison = -1;
          }
          return comparison * order;
        });
        break;
      case 'PPgame':
        orderedArray = orderedArray.sort(function(a, b) {
          let comparison = 0;
          if (a.totalPoints / a.totalGames > b.totalPoints / b.totalGames) {
            comparison = 1;
          } else if (
            a.totalPoints / a.totalGames <
            b.totalPoints / b.totalGames
          ) {
            comparison = -1;
          }
          return comparison * order;
        });
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
            {currentPage === 0 ? (
              <>
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
              </>
            ) : (
              <>
                <DataTable.Header>
                  <DataTable.Title onPress={() => sortArray('players')}>
                    Player
                  </DataTable.Title>
                  <DataTable.Title numeric onPress={() => sortArray('PCTwin')}>
                    Win %
                  </DataTable.Title>
                  <DataTable.Title numeric onPress={() => sortArray('PCTmiss')}>
                    Miss %
                  </DataTable.Title>
                  <DataTable.Title numeric onPress={() => sortArray('PPthrow')}>
                    PP/Throw
                  </DataTable.Title>
                  <DataTable.Title numeric onPress={() => sortArray('PPgame')}>
                    PP/Game
                  </DataTable.Title>
                </DataTable.Header>
                <ScrollView>{playerTableData2}</ScrollView>
              </>
            )}

            <DataTable.Pagination
              page={currentPage}
              numberOfPages={2}
              onPageChange={() => changePage()}
            />
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
