import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import {theme} from './constants';
import {useDarkMode} from 'react-native-dark-mode';
import ErrorBoundary from './views/ErrorBoundary';

import MainApp from './MainApp';

const ThemeApp = props => {
  const isDark = useDarkMode();

  const mode = props.useDeviceMode ? (isDark ? 1 : 0) : props.darkMode ? 1 : 0;

  return (
    <NavigationContainer>
      <PaperProvider theme={theme[props.activeTheme][mode]}>
        <ErrorBoundary>
          <MainApp />
        </ErrorBoundary>
      </PaperProvider>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  darkMode: state.setting.darkMode,
  useDeviceMode: state.setting.useDeviceMode,
  activeTheme: state.setting.theme,
});

export default connect(
  mapStateToProps,
  null,
)(ThemeApp);
