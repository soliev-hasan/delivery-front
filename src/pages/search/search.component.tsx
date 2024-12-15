import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './search.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../ui-components/input/input.component';
import { useApiRequest } from '../../hooks/useRequest';
import { DEVELOP_URL } from '../../helper/helper';
import { RootNavigationProps } from '../../navigation/navigation.types';
import { Header } from '../../ui-components/header/header.component';

const Search = ({ navigation }: RootNavigationProps<'Main'>) => {

  const [searchText, setSearchText] = useState('');
  const { sendRequest, loading } = useApiRequest();
  const [products, setProducts] = useState([]);
  const BASE_URL = `${DEVELOP_URL}/api/`;

  const searchProduct = async () => {
    const response = await sendRequest('get', 'product', { search: searchText });
    setProducts(response.data.products);
  }

  const renderProduct = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
        style={styles.productItem}
      >
        {item?.photos?.length > 0 ? (
          <Image
            source={{ uri: `${BASE_URL}${item.photos[0]}` }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }}
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

  useEffect(() => {
    searchProduct();
  }, [searchText])

  return (
    <SafeAreaView style={styles.container}>
      <Header backIcon title={'Поиск'} />
      <View style={styles.inputContainer}>
        <Input
          type="search"
          showCountryCode={false}
          onIconPress={searchProduct}
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
        />
      </View>
      <View style={styles.productsContainer}>
        {
          searchText.length > 0 &&
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={renderProduct}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
    </SafeAreaView>
  );
};

export default Search;
