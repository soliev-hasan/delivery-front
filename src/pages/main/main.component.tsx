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
  Check,
  ChevronDown,
  Circle,
  CircleDot,
  MapPin,
  MoreVertical,
  Pen,
  Plus,
  Square,
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
  const {setUser, user, token, refreshToken, setCart, setAddress, address} =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelectors.allCategories);
  const modal = useModal();
  const [visible, setVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [loadingAddressId, setLoadingAddressId] = useState(null);
  const ref = useRef();

  const deleteAdress = async item => {
    if (!item) return;
    setLoadingAddressId(item._id);

    try {
      const response = await sendRequest('delete', `user/address/${item._id}`);
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

  const fetchAddress = async () => {
    const address = await AsyncStorage.getItem('address');
    console.log();
    if (address !== null) {
      setAddress(JSON.parse(address));
    } else {
      setAddress(user.address[0]);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [user]);

  const handleSelectAddress = async address => {
    await AsyncStorage.setItem('address', JSON.stringify(address));
    setAddress(address);
  };

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
              user.address.map(item => (
                <TouchableOpacity
                  onPress={() => handleSelectAddress(item)}
                  style={styles.row}>
                  <TouchableOpacity>
                    {address._id === item._id ? (
                      <View style={styles.rowMenu}>
                        <CircleDot />
                      </View>
                    ) : (
                      <View style={styles.rowMenu}>
                        <Circle />
                      </View>
                    )}
                  </TouchableOpacity>
                  {/* {address._id === item._id && <Check />} */}

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
                      <ActivityIndicator size="small" color={colors.black} />
                    ) : (
                      <Trash style={{marginTop: -5}} size={20} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
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
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Plus strokeWidth={2} color={colors.black} />
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
