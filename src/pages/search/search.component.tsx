import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import styles from './search.style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '../../ui-components/input/input.component';
import {useApiRequest} from '../../hooks/useRequest';
import {DEVELOP_URL} from '../../helper/helper';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {Header} from '../../ui-components/header/header.component';
import colors from '../../helper/colors';

const Search = ({navigation}: RootNavigationProps<'Main'>) => {
  const [searchText, setSearchText] = useState('');
  const [searchExecuted, setSearchExecuted] = useState(false);
  const {sendRequest, loading} = useApiRequest();
  const [products, setProducts] = useState([]);
  const BASE_URL = `${DEVELOP_URL}/api/`;

  const searchProduct = async () => {
    if (searchText.trim() === '') return; // Если текст пустой, не выполнять поиск
    setSearchExecuted(true); // Установить флаг поиска в true
    const response = await sendRequest('get', 'product', {search: searchText});
    setProducts(response.data.products);
  };

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', {product: item})}
        style={styles.productItem}>
        {item?.photos?.length > 0 ? (
          <Image
            source={{uri: `${BASE_URL}${item.photos[0]}`}}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{uri: 'https://via.placeholder.com/300'}}
            style={styles.productImage}
            resizeMode="cover"
          />
        )}
        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backIcon title="Поиск" />
      <View style={styles.inputContainer}>
        <Input
          type="search"
          showCountryCode={false}
          onIconPress={searchProduct}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onPressSearch={searchProduct}
        />
      </View>
      <View style={styles.productsContainer}>
        {!searchExecuted ? (
          <Text style={styles.none}>Введите текст для поиска</Text>
        ) : products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={item => item._id}
            renderItem={renderProduct}
            showsVerticalScrollIndicator={false}
          />
        ) : loading ? (
          <ActivityIndicator color={colors.main} size={'large'} />
        ) : (
          <Text style={styles.none}>По вашему запросу ничего не найдено</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
