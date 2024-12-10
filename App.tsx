import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import SingUpNavigation from './src/navigation/sign-up.navigation';
import useAuth from './src/hooks/useAuth';
import AuthContext from './src/contexts/AuthContext';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import MainNavigation from './src/navigation/main.navigation';
import {ActivityIndicator, StatusBar} from 'react-native';
import colors from './src/helper/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalProvider} from './src/ui-components/modal/modal.provider';

function App() {
  const {
    token,
    setToken,
    phone,
    setPhone,
    address,
    setAddress,
    isLoading,
    user,
    setUser,
    refreshToken,
    setRefreshToken,
    logout,
  } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        phone,
        setPhone,
        address,
        setAddress,
        user,
        setUser,
        refreshToken,
        setRefreshToken,
        logout,
      }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ModalProvider>
          <AlertNotificationRoot>
            <Provider store={store}>
              <StatusBar backgroundColor="white" barStyle="dark-content" />
              {!isLoading ? (
                <ActivityIndicator size={'large'} color={colors.black} />
              ) : (
                <NavigationContainer>
                  {token ? <MainNavigation /> : <SingUpNavigation />}
                </NavigationContainer>
              )}
            </Provider>
          </AlertNotificationRoot>
        </ModalProvider>
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
}

export default App;
