import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import {
  Text,
  Subheading,
  Headline,
  Switch,
  Divider,
  RadioButton,
  IconButton,
  Button,
  withTheme,
} from 'react-native-paper';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  changeMode,
  changeTheme,
  changeDeviceMode,
} from '../../actions/settingActions';
import {resetData} from '../../actions/gameActions';
import Header from '../Header';
import {theme} from '../../constants';
import {useDarkMode} from 'react-native-dark-mode';

const Settings = props => {
  const colors = props.theme.colors;

  const isDark = useDarkMode();
  const mode = props.useDeviceMode ? (isDark ? 1 : 0) : props.darkMode ? 1 : 0;

  const [isResetDataPressed, setIsResetDataPressed] = useState(false);

  const resetData = () => {
    setIsResetDataPressed(false);
    props.resetData();
  };

  const themeSelect = theme.map((theme, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RadioButton
          value={index}
          status={index === props.activeTheme ? 'checked' : 'unchecked'}
          color={theme[mode].colors.primary}
        />
        <TouchableOpacity onPress={() => props.changeTheme(index)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              size={20}
              name="circle"
              style={{color: theme[mode].colors.primary}}
            />
            <Icon
              size={20}
              name="circle"
              style={{color: theme[mode].colors.accent}}
            />
            <Text> {theme[0].name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <>
      <Header title="Settings" />
      <SafeAreaView
        style={{flex: 1, padding: 16, backgroundColor: colors.background}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
          <View style={{marginVertical: 10}}>
            <Headline>Display Settings</Headline>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Subheading>Use Device Setting</Subheading>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                size={20}
                name="cellphone-settings"
                style={{color: colors.text}}
              />
              <Text>{'  '}</Text>
              <Switch
                value={props.useDeviceMode}
                onValueChange={() =>
                  props.changeDeviceMode(props.useDeviceMode ? false : true)
                }
                theme={{colors: {accent: colors.primary}}}
              />
            </View>
          </View>
          {props.useDeviceMode ? (
            <></>
          ) : (
            <>
              <Divider />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Subheading>Enable Dark Mode</Subheading>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    size={20}
                    name="theme-light-dark"
                    style={{color: colors.text}}
                  />
                  <Text>{'  '}</Text>
                  <Switch
                    value={props.darkMode}
                    onValueChange={() =>
                      props.changeMode(props.darkMode ? false : true)
                    }
                    theme={{colors: {accent: colors.primary}}}
                  />
                </View>
              </View>
            </>
          )}
          <Divider />
          <View style={{marginVertical: 10}}>
            <Subheading>Select a Theme</Subheading>
            <RadioButton.Group
              onValueChange={value => props.changeTheme(value)}
              value={props.activeTheme}>
              {themeSelect}
            </RadioButton.Group>
          </View>
          <Divider />
          <View style={{marginVertical: 10}}>
            <Headline>Game Data</Headline>
          </View>
          <Divider />
          {!isResetDataPressed ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Button
                color={colors.error}
                uppercase={false}
                onPress={() => setIsResetDataPressed(true)}>
                Reset Game Data
              </Button>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Button
                style={{width: '45%'}}
                color={colors.error}
                uppercase={false}
                onPress={() => setIsResetDataPressed(false)}>
                Cancel
              </Button>
              <Button
                style={{width: '45%'}}
                color={colors.primary}
                uppercase={false}
                onPress={() => resetData()}>
                Confirm
              </Button>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => ({
  darkMode: state.setting.darkMode,
  useDeviceMode: state.setting.useDeviceMode,
  activeTheme: state.setting.theme,
});

export default connect(
  mapStateToProps,
  {
    changeMode,
    changeTheme,
    changeDeviceMode,
    resetData,
  },
)(withTheme(Settings));
