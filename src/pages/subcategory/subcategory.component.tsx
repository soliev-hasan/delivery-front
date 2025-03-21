import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SectionList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Header} from '../../ui-components/header/header.component';
import {useDispatch} from 'react-redux';
import subcategoriesActions from '../../store/subcategories/actions';
import {useApiRequest} from '../../hooks/useRequest';
import colors from '../../helper/colors';
import AuthContext from '../../contexts/AuthContext';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Minus, Plus} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './subcategory.style';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const chunkArray = (array, chunkSize) => {
  const results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};

const SubCategory = ({route}: RootNavigationProps<'SubCategory'>) => {
  const {subcategoryId, title} = route.params;
  const {sendRequest} = useApiRequest();
  const dispatch = useDispatch();
  const {token, cart, setCart} = useContext(AuthContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [structuredData, setStructuredData] = useState([]);
  const [activeChapterId, setActiveChapterId] = useState(null);

  const sectionListRef = useRef(null);

  const fetchStructuredProducts = async () => {
    try {
      const response = await sendRequest('get', 'product/structured', {
        subcategoryId,
      });
      const sections = (response.data || []).map(section => ({
        ...section,
        data: chunkArray(section.products || [], 2),
      }));
      setStructuredData(sections);
      if (sections.length > 0) {
        setActiveChapterId(sections[0].chapterId);
      }
      setLoading(true);
      const allProducts = response.data.flatMap(group => group.products);
      dispatch(subcategoriesActions.saveSubcategories(allProducts));
    } catch (error) {
      console.error('Error fetching structured products:', error);
    }
  };

  useEffect(() => {
    fetchStructuredProducts();
  }, [token]);

  const saveCart = async (item: any) => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      let cartData = existingCart ? JSON.parse(existingCart) : [];
      if (!Array.isArray(cartData)) {
        cartData = [];
      }
      const updatedCart = [...cartData, {...item, quantity: 1}];
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
      let cartData = existingCart ? JSON.parse(existingCart) : [];
      if (!Array.isArray(cartData)) {
        cartData = [];
      }
      const updatedCart = cartData.filter(
        cartItem => cartItem._id !== item._id,
      );
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

  const isInCart = (item: any) => {
    return cart.some(cartItem => cartItem._id === item._id);
  };

  const renderProduct = ({item}) => {
    const productInCart = isInCart(item);
    return (
      <TouchableOpacity
        style={localStyles.productCard}
        onPress={() => navigation.navigate('ProductDetail', {product: item})}>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1309352410/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%87%D0%B8%D0%B7%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80-%D1%81-%D0%BF%D0%BE%D0%BC%D0%B8%D0%B4%D0%BE%D1%80%D0%B0%D0%BC%D0%B8-%D0%B8-%D1%81%D0%B0%D0%BB%D0%B0%D1%82%D0%BE%D0%BC-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B4%D0%BE%D1%81%D0%BA%D0%B5.jpg?s=612x612&w=0&k=20&c=dW1Aguo-4PEcRs79PUbmMXpx5YrBjqSYiEhwnddbj_g=',
          }}
          style={localStyles.productImage}
        />
        <Text style={localStyles.productName}>{item.name}</Text>
        <View style={localStyles.priceContainer}>
          <Text style={localStyles.productPrice}>{item.price} смн.</Text>
          {productInCart ? (
            <TouchableOpacity
              onPress={() => removeFromCart(item)}
              style={localStyles.addButton}>
              <Minus color={colors.black} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => saveCart(item)}
              style={localStyles.addButton}>
              <Plus color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => (
    <View style={localStyles.chapterHeaderContainer}>
      <Text style={localStyles.chapterHeaderText}>{section.chapterName}</Text>
    </View>
  );

  const renderSectionItem = ({item: rowProducts}) => {
    return (
      <View style={localStyles.rowContainer}>
        {rowProducts.map((product, index) => (
          <View
            key={product._id || index.toString()}
            style={localStyles.productWrapper}>
            {renderProduct({item: product})}
          </View>
        ))}
        {rowProducts.length < 2 && <View style={localStyles.productWrapper} />}
      </View>
    );
  };

  const handleChapterPress = chapterId => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveChapterId(chapterId);
    const sectionIndex = structuredData.findIndex(
      sec => sec.chapterId === chapterId,
    );
    if (sectionIndex >= 0 && sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  const renderChapterItem = ({item, index}) => {
    const isActive = item.chapterId === activeChapterId;
    return (
      <TouchableOpacity
        style={[
          localStyles.chapterItem,
          isActive && localStyles.chapterItemActive,
        ]}
        onPress={() => handleChapterPress(item.chapterId)}
        key={item.chapterId ? item.chapterId.toString() : index.toString()}>
        <Text
          style={[
            localStyles.chapterItemText,
            isActive && localStyles.chapterItemTextActive,
          ]}>
          {item.chapterName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backIcon title={title} />
      {structuredData.length > 0 && (
        <View style={localStyles.chaptersContainer}>
          <FlatList
            data={structuredData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item.chapterId ? item.chapterId.toString() : index.toString()
            }
            renderItem={renderChapterItem}
            contentContainerStyle={{paddingHorizontal: 10}}
          />
        </View>
      )}
      {loading ? (
        <SectionList
          ref={sectionListRef}
          sections={structuredData}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : index.toString()
          }
          renderSectionHeader={renderSectionHeader}
          renderItem={renderSectionItem}
          contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
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
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  chapterItemActive: {
    backgroundColor: colors.main,
  },
  chapterItemText: {
    fontSize: 14,
    color: '#000',
  },
  chapterItemTextActive: {
    color: '#fff',
  },
  chapterHeaderContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  chapterHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  productCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productName: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    padding: 5,
    borderRadius: 100,
    backgroundColor: colors.main,
  },
});

export default SubCategory;
