import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import SingUpNavigation from './src/navigation/sign-up.navigation';
import useAuth from './src/hooks/useAuth';
import AuthContext from './src/contexts/AuthContext';

function App() {
  const {token, setToken} = useAuth();

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}>
      <Provider store={store}>
        <NavigationContainer>
          <SingUpNavigation />
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
