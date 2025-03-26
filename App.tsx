import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
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
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';
import * as amplitude from '@amplitude/analytics-react-native';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';

export const navigationRef = createNavigationContainerRef();
let ExportedApp;

if (!__DEV__) {
  ExportedApp = Sentry.wrap(App);
  Sentry.init({
    dsn: 'https://d68b1bfd1800a27ac2f983c362bbf280@o4508727914528768.ingest.us.sentry.io/4508727916429312',
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.mobileReplayIntegration({
        maskAllText: false,
        maskAllImages: false,
        maskAllVectors: false,
      }),
    ],
  });
} else {
  ExportedApp = App;
}
amplitude.init('221c944099632c13b8df7fe2a24d6125');

function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    // console.log('Token:', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

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
    cart,
    setCart,
  } = useAuth();
  useEffect(() => {
    const onNotificationPress = async (notification: any) => {
      console.log('Нажатие на уведомление:', notification);

      if (notification?.data?.orderId) {
        const orderId = notification.data.orderId;
        console.log(
          `Клик по уведомлению. Переход на DetailOrder с ID: ${orderId}`,
        );

        if (navigationRef.isReady()) {
          navigationRef.navigate('DetailOrder', {id: orderId});
        }
      } else {
        console.log('orderId не найден в уведомлении');
      }
    };

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Получено сообщение:', remoteMessage);

      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Новое уведомление',
        body: remoteMessage.notification?.body || 'У вас новое сообщение',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'order', // Уникальный ID для обработки нажатий
          },
        },
        data: remoteMessage.data, // Передаем orderId в data
      });

      if (remoteMessage.data?.orderId) {
        console.log(
          `Поступило уведомление с orderId: ${remoteMessage.data.orderId}`,
        );
      }
    });

    // Обработка кликов по уведомлениям в активном состоянии
    const unsubscribeOnNotificationPress = notifee.onForegroundEvent(
      ({type, detail}) => {
        if (type === EventType.PRESS) {
          onNotificationPress(detail.notification);
        }
      },
    );

    // Обработка кликов по уведомлениям в фоновом режиме
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Фоновое сообщение:', remoteMessage);
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      if (type === EventType.PRESS) {
        onNotificationPress(detail.notification);
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationPress();
    };
  }, []);
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
        cart,
        setCart,
      }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ModalProvider>
          <AlertNotificationRoot>
            <Provider store={store}>
              <StatusBar backgroundColor="white" barStyle="dark-content" />
              {!isLoading ? (
                <ActivityIndicator size={'large'} color={colors.black} />
              ) : (
                <NavigationContainer ref={navigationRef}>
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

export default ExportedApp;
