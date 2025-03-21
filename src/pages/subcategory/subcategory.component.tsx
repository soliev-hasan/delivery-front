import React, {useContext, useEffect, useState, useRef} from 'react';
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
  const {token, cart, setCart} = useContext(AuthContext);
  const subcategories = useSelector(subcategoriesSelectors.allSubcategories);
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const BASE_URL = `${DEVELOP_URL}/api/`;
  const navigation = useNavigation();

  const productListRef = useRef(null);

  const fetchSubcategories = async () => {
    try {
      const response = await sendRequest('get', 'product/structured', {
        subcategoryId,
      });
      const allProducts = response.data.flatMap(group => group.products);
      dispatch(subcategoriesActions.saveSubcategories(allProducts));
      setLoading(true);
      console.log(allProducts, 'PRODUCTS');
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchChapters = async () => {
    try {
      const response = await sendRequest('get', 'chapter', {
        subcategoryid: subcategoryId,
      });
      const chaptersData = response.data || [];
      setChapters(chaptersData);
      if (chaptersData.length > 0) {
        setActiveChapterId(chaptersData[0]._id);
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
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
        textBody: 'Добавлено в корзину',
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
    fetchChapters();
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
          source={{
            uri: 'https://media.istockphoto.com/id/1309352410/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%87%D0%B8%D0%B7%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80-%D1%81-%D0%BF%D0%BE%D0%BC%D0%B8%D0%B4%D0%BE%D1%80%D0%B0%D0%BC%D0%B8-%D0%B8-%D1%81%D0%B0%D0%BB%D0%B0%D1%82%D0%BE%D0%BC-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B4%D0%BE%D1%81%D0%BA%D0%B5.jpg?s=612x612&w=0&k=20&c=dW1Aguo-4PEcRs79PUbmMXpx5YrBjqSYiEhwnddbj_g=',
          }}
          style={styles.productImage}
        />
        <Text style={styles.productName}>{item.name}</Text>
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

  const handleChapterPress = chapterId => {
    setActiveChapterId(chapterId);

    if (!productListRef.current) return;

    let index = subcategories.subcategories.findIndex(
      product => product.chapterId && product.chapterId._id === chapterId,
    );

    // Проверяем, что индекс в допустимых пределах
    if (index < 0) {
      console.warn(`Глава не найдена, скроллим в начало`);
      productListRef.current.scrollToOffset({offset: 0, animated: true});
      return;
    }

    if (index >= subcategories.subcategories.length) {
      console.warn(`Индекс ${index} выходит за границы, скроллим в конец.`);
      productListRef.current.scrollToEnd({animated: true});
      return;
    }

    // Прокручиваем до найденного индекса с обработкой ошибок
    try {
      productListRef.current.scrollToIndex({index, animated: true});
    } catch (error) {
      console.error(`Ошибка при скролле к индексу ${index}:`, error);
      productListRef.current.scrollToEnd({animated: true});
    }
  };

  const renderChapter = ({item, index}) => {
    const isActive = item._id === activeChapterId;
    return (
      <TouchableOpacity
        onPress={() => handleChapterPress(item._id)}
        style={[
          localStyles.chapterItem,
          isActive
            ? localStyles.activeChapterItem
            : localStyles.inactiveChapterItem,
        ]}
        // Используем item._id или индекс как ключ
        key={item._id ? item._id.toString() : index.toString()}>
        <Text
          style={[
            localStyles.chapterText,
            isActive && localStyles.activeChapterText,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backIcon title={title} />
      {chapters.length > 0 && (
        <View style={localStyles.chaptersContainer}>
          <FlatList
            data={chapters}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item._id ? item._id.toString() : index.toString()
            }
            renderItem={renderChapter}
            contentContainerStyle={{paddingHorizontal: 10}}
          />
        </View>
      )}
      {subcategories.subcategories.length > 0 && loading ? (
        <FlatList
          ref={productListRef}
          data={subcategories.subcategories}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : index.toString()
          }
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={{marginTop: 20}}
          onScrollToIndexFailed={info => {
            console.warn('Не удалось прокрутить к индексу', info);
          }}
        />
      ) : (
        <View style={styles.spinner}>
          <ActivityIndicator size={'large'} color={colors.main} />
        </View>
      )}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  chaptersContainer: {
    marginVertical: 10,
  },
  chapterItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  activeChapterItem: {
    backgroundColor: colors.main,
  },
  chapterText: {
    fontSize: 14,
    color: '#000',
  },
  activeChapterText: {
    color: '#fff',
  },
  inactiveChapterItem: {
    backgroundColor: '#fff',
  },
});

export default SubCategory;
