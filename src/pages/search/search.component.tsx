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
    if (searchText.trim() === '') return;
    setSearchExecuted(true);
    const response = await sendRequest('get', 'product', {search: searchText});
    setProducts(response.data.products);
  };

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', {product: item})}
        style={styles.productItem}
        activeOpacity={0.8}>
        <Image
          // source={{uri: `${BASE_URL}${item.photos[0]}`}}
          source={{
            uri: 'https://chefrestoran.ru/wp-content/uploads/2018/10/309014621.jpg',
          }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={{gap: 5, alignSelf: 'flex-start'}}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}c</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Поиск" />
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
      {loading && <ActivityIndicator color={colors.main} size={'large'} />}

      <View style={styles.productsContainer}>
        {!searchExecuted ? (
          <Text style={styles.none}>Введите текст для поиска</Text>
        ) : products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={item => item._id}
            renderItem={renderProduct}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.products}
          />
        ) : (
          !loading && (
            <Text style={styles.none}>По вашему запросу ничего не найдено</Text>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
