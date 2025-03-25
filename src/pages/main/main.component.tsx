import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Keyboard,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import AuthContext from '../../contexts/AuthContext';
import {useApiRequest} from '../../hooks/useRequest';
import Categories from '../../module/categories-card/categories.component';
import categoriesActions from '../../store/categories/actions';
import categoriesSelectors from '../../store/categories/selectors';
import styles from './main.style';
import colors from '../../helper/colors';
import {useModal} from '../../ui-components/modal/modal.hook';
import {
  ChevronDown,
  Circle,
  CircleDot,
  MapPin,
  Plus,
  Trash,
} from 'lucide-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import axios from 'axios';
import {DEVELOP_URL} from '../../helper/helper';

const Main = ({navigation}: RootNavigationProps<'Main'>) => {
  const {sendRequest} = useApiRequest();
  const {setUser, user, token, refreshToken, setCart, setAddress, address} =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelectors.allCategories);
  const modal = useModal();
  const [visible, setVisible] = useState(false);
  const [loadingAddressId, setLoadingAddressId] = useState(null);
  const [pushToken, setPushToken] = useState('none');
  useEffect(() => {
    async function testNotification() {
      await notifee.requestPermission(); // Запрос разрешения на уведомления
      await notifee.displayNotification({
        title: 'Тестовое уведомление',
        body: 'Это тестовое уведомление от Notifee!',
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          importance: notifee.AndroidImportance.HIGH,
        },
      });
    }

    testNotification();
  }, []);
  const fetchCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) setCart(JSON.parse(cartData));
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
    }
  };

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Разрешение на уведомления получено.');
      fetchToken();
    } else {
      console.log('Разрешение на уведомления отклонено.');
    }
  };

  const fetchToken = async (retryCount = 3) => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('FCM токен получен:', token);
      if (!token) return;
      setPushToken(token);

      const response = await sendRequest('post', 'user/fcm-token', {
        fcmToken: token,
      });
      // console.log('FCM токен успешно отправлен:', response);
    } catch (error) {
      console.error('Ошибка получения push-токена:', error);
      if (error.code === 'messaging/unknown' && retryCount > 0) {
        console.log(
          `Повторная попытка получения токена... Осталось: ${retryCount}`,
        );
        setTimeout(() => fetchToken(retryCount - 1), 2000);
      }
    }
  };

  useEffect(() => {
    // Создаем канал для уведомлений, если он не был создан
    async function createNotificationChannel() {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default',
        vibration: true,
        importance: notifee.AndroidImportance.HIGH,
      });
    }

    createNotificationChannel();

    // Подписка на уведомления при получении в активном приложении
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Получено сообщение:', remoteMessage);

      const {title, body} = remoteMessage.notification || {};

      if (title && body) {
        console.log('Отображаем уведомление:', title, body);
        await notifee.displayNotification({
          title,
          body,
          android: {
            channelId: 'default',
            smallIcon: 'ic_launcher',
            importance: notifee.AndroidImportance.HIGH,
          },
        });
      } else {
        console.log('Ошибка: title или body отсутствуют в уведомлении');
      }
    });

    // Возвращаем функцию для отписки
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Обработка уведомлений при фоновом состоянии
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Фоновое уведомление:', remoteMessage);

      const {title, body} = remoteMessage.notification || {};

      if (title && body) {
        console.log('Отображаем фоновое уведомление:', title, body);
        await notifee.displayNotification({
          title,
          body,
          android: {
            channelId: 'default',
            smallIcon: 'ic_launcher',
            importance: notifee.AndroidImportance.HIGH,
          },
        });
      } else {
        console.log('Ошибка: title или body отсутствуют в фоновом уведомлении');
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCart();
      await requestPermission();

      try {
        const [userResponse, categoryResponse] = await Promise.all([
          sendRequest('get', 'user/me'),
          sendRequest('get', '/category/structured/'),
        ]);

        setUser(userResponse.data.user);
        dispatch(
          categoriesActions.saveCategories(categoryResponse.data.categories),
        );
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
  }, [token, pushToken]);

  const fetchAddress = async () => {
    try {
      const storedAddress = await AsyncStorage.getItem('address');
      setAddress(
        storedAddress ? JSON.parse(storedAddress) : user?.address?.[0] || null,
      );
    } catch (error) {
      console.error('Ошибка загрузки адреса:', error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [user]);

  const handleSelectAddress = async address => {
    await AsyncStorage.setItem('address', JSON.stringify(address));
    setAddress(address);
  };

  const deleteAdress = async item => {
    if (!item) return;
    setLoadingAddressId(item._id);

    try {
      const response = await sendRequest('delete', `user/address/${item._id}`);
      if (response.status === 200) {
        const updatedAddresses = response.data.user.address;
        const newAddress = updatedAddresses.length ? updatedAddresses[0] : null;

        await AsyncStorage.setItem('address', JSON.stringify(newAddress));
        setAddress(newAddress);
        setUser(response.data.user);

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Успешно',
          textBody: 'Адрес удалён',
        });
      }
    } catch (error) {
      console.error('Ошибка удаления адреса:', error);
    } finally {
      setLoadingAddressId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories.categories}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 40}}
        keyExtractor={item => item._id}
        renderItem={({item}) => <Categories data={item} />}
        ListHeaderComponent={
          <ImageBackground
            source={{
              uri: 'https://www.sterevan.ru/images/catalog/3fa4080579377c5e94c125fd0b124106.jpg',
            }}
            style={styles.header}>
            <View style={styles.overlay} />
            <TouchableOpacity
              hitSlop={{
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
              }}
              onPress={() => setVisible(true)}
              style={styles.adress}>
              <Text onPress={() => setVisible(true)} style={styles.text}>
                Ваш адрес
              </Text>
              <ChevronDown color={colors.white} />
            </TouchableOpacity>
            {address && (
              <View style={styles.addressActive}>
                <MapPin color={colors.white} />
                <Text style={styles.text}>
                  {address && address.country}
                  {','}
                </Text>
                <Text style={styles.text}>{address && address.city}</Text>
              </View>
            )}
          </ImageBackground>
        }
        ListEmptyComponent={
          <ActivityIndicator color={colors.main} size="large" />
        }
      />
      {/* Modal address */}

      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <Text style={styles.title}>Мои адреса</Text>
                <View style={styles.addressList}>
                  {Array.isArray(user?.address) && user.address.length > 0 ? (
                    user.address.map(item => (
                      <TouchableOpacity
                        key={item._id}
                        onPress={() => handleSelectAddress(item)}
                        style={styles.row}>
                        {address && address._id === item._id ? (
                          <CircleDot />
                        ) : (
                          <Circle />
                        )}
                        <View>
                          <Text numberOfLines={2} style={styles.street}>
                            {item.city}, {item.street}
                          </Text>
                          <Text style={styles.second}>
                            кв {item.apartment} подъезд {item.entrance} этаж{' '}
                            {item.floor}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteAdress(item)}>
                          {loadingAddressId === item._id ? (
                            <ActivityIndicator
                              size="small"
                              color={colors.black}
                            />
                          ) : (
                            <Trash style={{marginTop: -5}} size={20} />
                          )}
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.emptyText}>
                      Нет сохраненных адресов
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    navigation.navigate('Map');
                    setVisible(false);
                  }}>
                  <View style={styles.addRow}>
                    <Plus strokeWidth={2} color={colors.black} />
                    <Text
                      onPress={() => {
                        navigation.navigate('Map');
                        setVisible(false);
                      }}
                      style={[styles.text, {color: colors.black}]}>
                      Добавить новый адрес
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default Main;
