import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
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
import FastImage from 'react-native-fast-image';
import {useModal} from '../../ui-components/modal/modal.hook';
import {
  ChevronDown,
  MapPin,
  MoreVertical,
  Pen,
  Plus,
  Trash,
} from 'lucide-react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {Button} from '../../ui-components/button/button.component';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import {Modalize} from 'react-native-modalize';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartActions from '../../store/cart/actions';

const Main = ({navigation}: RootNavigationProps<'Main'>) => {
  const {sendRequest} = useApiRequest();
  const {setUser, user, token, refreshToken, setCart, cart} =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelectors.allCategories);
  const modal = useModal();
  const [visible, setVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [loadingAddressId, setLoadingAddressId] = useState(null);
  const ref = useRef();

  const deleteAdress = async () => {
    if (!selectedAddress) return;
    setLoadingAddressId(selectedAddress._id);

    try {
      const response = await sendRequest(
        'delete',
        `user/address/${selectedAddress._id}`,
      );
      if (response.status === 200) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Успешно',
          textBody: 'Адрес удалено',
        });
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
    } finally {
      setLoadingAddressId(null); // Сбрасываем состояние загрузки
    }
  };

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const fetchCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData !== null) {
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error('Failed to fetch cart from AsyncStorage', error);
    }
  };

  useEffect(() => {
    fetchCart();
    Promise.all([
      sendRequest('get', 'user/me').then(response =>
        setUser(response.data.user),
      ),
      sendRequest('get', '/category/structured/')
        .then(response =>
          dispatch(categoriesActions.saveCategories(response.data.categories)),
        )

        .catch(e => console.log()),
    ]);
  }, [token, refreshToken]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{
            uri: 'https://www.sterevan.ru/images/catalog/3fa4080579377c5e94c125fd0b124106.jpg',
          }}
          style={styles.header}>
          <View style={styles.overlay} />
          <TouchableOpacity
            onPress={() => ref.current.open()}
            style={styles.adress}>
            <Text style={styles.text}>Ваш адрес</Text>
            <ChevronDown color={colors.white} />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.categories}>
          {categories.categories.length > 0 ? (
            <FlatList
              data={categories.categories}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{gap: 40}}
              keyExtractor={item => item._id}
              renderItem={({item}) => <Categories data={item} />}
            />
          ) : (
            <ActivityIndicator color={colors.main} size={'large'} />
          )}
        </View>
      </ScrollView>

      {/* Modal address */}
      <Modalize
        ref={ref}
        modalHeight={350}
        handleStyle={{backgroundColor: 'white'}}
        modalStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        withOverlay={true}>
        <View>
          <Text style={styles.title}>Мои адреса</Text>
          <View style={styles.address}>
            {user &&
              user.address.map(address => (
                <View style={styles.row}>
                  <View>
                    <Text style={styles.street}>
                      {address.city} {address.street}
                    </Text>
                    <Text style={styles.second}>
                      кв {address.apartment} подъезд {address.entrance} этаж{' '}
                      {address.floor}
                    </Text>
                  </View>
                  <Menu
                    visible={visible}
                    anchor={
                      loadingAddressId === address._id ? ( // Отображаем спиннер, если адрес удаляется
                        <ActivityIndicator size="small" color={colors.black} />
                      ) : (
                        <MoreVertical
                          onPress={() => {
                            setSelectedAddress(address);
                            showMenu();
                          }}
                        />
                      )
                    }
                    onRequestClose={hideMenu}>
                    <MenuItem
                      style={styles.menu}
                      onPress={() => {
                        hideMenu();
                        navigation.navigate('Map', {address: selectedAddress});
                      }}>
                      <Pen style={{marginTop: -5, marginLeft: -5}} size={20} />{' '}
                      Изменить
                    </MenuItem>
                    <MenuItem
                      style={styles.menu}
                      onPress={() => {
                        deleteAdress();
                        hideMenu();
                      }}>
                      <Trash style={{marginTop: -5}} size={20} />
                      Удалить
                    </MenuItem>
                  </Menu>
                </View>
              ))}
          </View>

          <Button
            style={{
              marginTop: 20,
              backgroundColor: 'transparent',
              marginLeft: 20,
            }}
            onPress={() => {
              navigation.navigate('Map');
              modal.close();
            }}
            disabled={true}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Plus
                strokeWidth={2}
                color={colors.black}
                style={{marginTop: 12}}
              />
              <Text style={[styles.text, {color: colors.black}]}>
                Добавить новый адрес
              </Text>
            </View>
          </Button>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default Main;
