import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Header} from '../../ui-components/header/header.component';
import {useDispatch, useSelector} from 'react-redux';
import subcategoriesSelectors from '../../store/subcategories/selectors';
import {useApiRequest} from '../../hooks/useRequest';
import subcategoriesActions from '../../store/subcategories/actions';
import {DEVELOP_URL} from '../../helper/helper';
import styles from './subcategory.style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../helper/colors';
import AuthContext from '../../contexts/AuthContext';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Minus, Plus} from 'lucide-react-native';

const SubCategory = ({route}: RootNavigationProps<'SubCategory'>) => {
  const {categoryId, subcategoryId, title} = route.params;
  const {sendRequest} = useApiRequest();
  const dispatch = useDispatch();
  const {token, cart, setCart} = useContext(AuthContext); // Получаем текущую корзину
  const subcategories = useSelector(subcategoriesSelectors.allSubcategories);
  const [loading, setLoading] = useState(false);
  const BASE_URL = `${DEVELOP_URL}/api/`;
  const navigation = useNavigation();

  const fetchSubcategories = async () => {
    try {
      const response = await sendRequest('get', 'product', {
        categoryId,
        subcategoryId,
      });
      dispatch(subcategoriesActions.saveSubcategories(response.data.products));
      setLoading(true);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const saveCart = async (item: any) => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];

      if (!Array.isArray(cart)) {
        cart = [];
      }

      const updatedCart = [...cart, {...item, quantity: 1}];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Успешно',
        textBody: 'Добавлено на карзину',
      });
    } catch (error) {
      console.error('Failed to save cart to AsyncStorage', error);
    }
  };

  const removeFromCart = async (item: any) => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];

      if (!Array.isArray(cart)) {
        cart = [];
      }

      // Удаляем товар из корзины
      const updatedCart = cart.filter(cartItem => cartItem._id !== item._id);

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Успешно',
        textBody: 'Удалено из корзины',
      });
    } catch (error) {
      console.error('Failed to remove item from AsyncStorage', error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, [token]);

  const isInCart = (item: any) => {
    return cart.some(cartItem => cartItem._id === item._id);
  };

  const renderProduct = ({item}) => {
    const productInCart = isInCart(item);

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', {product: item})}>
        <Image
          source={{uri: `${BASE_URL}${item.photos[0]}`}}
          style={styles.productImage}
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productWeight}>{item.weight}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price} смн.</Text>
          {productInCart ? (
            <TouchableOpacity
              onPress={() => removeFromCart(item)}
              style={styles.addButton}>
              <Minus color={colors.black} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => saveCart(item)}
              style={styles.addButton}>
              <Plus color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backIcon title={title} />
      {subcategories.subcategories.length > 0 && loading ? (
        <FlatList
          data={subcategories.subcategories}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={{marginTop: 20}}
        />
      ) : (
        <View style={styles.spinner}>
          <ActivityIndicator size={'large'} color={colors.main} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SubCategory;
