import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ThemeApp from './app/ThemeApp';
import Loading from './app/views/Loading';
import {store, persistor} from './app/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ThemeApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
