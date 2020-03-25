import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {withTheme, Text, DataTable} from 'react-native-paper';
import Header from '../Header';

const GameHistory = props => {
  const colors = props.theme.colors;
  const gameDataTable = props.games.map((game, index) => {
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

  return (
    <>
      <Header title="Player History" />
      <View style={{flex: 1, padding: 16, backgroundColor: colors.background}}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title numeric>Players</DataTable.Title>
            <DataTable.Title numeric>Throws</DataTable.Title>
            <DataTable.Title numeric>Winner</DataTable.Title>
          </DataTable.Header>
          <ScrollView>{gameDataTable}</ScrollView>
        </DataTable>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  games: state.data.games,
  players: state.data.players,
});

export default connect(mapStateToProps, null)(withTheme(GameHistory));
