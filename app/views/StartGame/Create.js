import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  withTheme,
  Button,
  Checkbox,
  Text,
  TextInput,
  IconButton,
} from 'react-native-paper';
import Header from '../Header';
import SkittleButton from './components/SkittleButton';

const Landing = props => {
  const [player, setPlayer] = useState('');
  const colors = props.theme.colors;

  const Players = () => {
    const [checked, setChecked] = useState('unchecked');
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() =>
            setChecked(checked === 'unchecked' ? 'checked' : 'unchecked')
          }
        />
        <Text>Player</Text>
      </View>
    );
  };

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
                value={player}
                onChangeText={text => setPlayer(text)}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <IconButton
                icon="plus"
                size={30}
                onPress={() => {
                  console.log(player), setPlayer('');
                }}
              />
            </View>
          </View>

          <ScrollView>
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
            <Players />
          </ScrollView>
          <View>
            <Button onPress={() => props.navigation.navigate('Play')}>
              Play Game
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
export default withTheme(Landing);
