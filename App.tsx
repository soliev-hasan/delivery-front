import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import SingUpNavigation from './src/navigation/sign-up.navigation';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SingUpNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
