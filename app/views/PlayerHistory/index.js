import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {withTheme, DataTable} from 'react-native-paper';
import Header from '../Header';

const PlayerHistory = props => {
  const colors = props.theme.colors;

  const playerTableData = props.players.map((player, index) => {
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

  return (
    <>
      <Header title="Player History" />
      <View style={{flex: 1, padding: 16, backgroundColor: colors.background}}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Player</DataTable.Title>
            <DataTable.Title numeric>Games</DataTable.Title>
            <DataTable.Title numeric>Wins</DataTable.Title>
            <DataTable.Title numeric>Throws</DataTable.Title>
            <DataTable.Title numeric>Misses</DataTable.Title>
            <DataTable.Title numeric>Points</DataTable.Title>
          </DataTable.Header>
          <ScrollView>{playerTableData}</ScrollView>
        </DataTable>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  players: state.data.players,
});

export default connect(mapStateToProps, null)(withTheme(PlayerHistory));
