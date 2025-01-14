import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './search.style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '../../ui-components/input/input.component';
import {useApiRequest} from '../../hooks/useRequest';
import {DEVELOP_URL} from '../../helper/helper';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {Header} from '../../ui-components/header/header.component';
import colors from '../../helper/colors';
import {Modalize} from 'react-native-modalize';

const Search = ({navigation}: RootNavigationProps<'Main'>) => {
  const [searchText, setSearchText] = useState('');
  const [searchExecuted, setSearchExecuted] = useState(false);
  const {sendRequest, loading} = useApiRequest();
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const BASE_URL = `${DEVELOP_URL}/api/`;

  const ref = useRef();
  const [order, setOrder] = useState('asc');
  const [selectedTab, setSelectedTab] = useState('date');

  const tabs = [
    {id: 'name', label: 'Названию'},
    {id: 'price', label: 'Цене'},
    {id: 'date', label: 'Дате'},
  ];

  const searchProduct = async () => {
    if (searchText.trim() === '') return;
    setSearchExecuted(true);
    const response = await sendRequest('get', 'product', {
      search: searchText,
      sortBy: selectedTab,
      order: order,
    });
    setProducts(response.data.products);
  };

  useEffect(() => {
    if (searchExecuted) {
      searchProduct();
    }
  }, [selectedTab, order]);
  useEffect(() => {
    sendRequest('get', 'product').then(res => setRecommendedProducts(res.data));
  }, []);

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

  const renderRecommendedProduct = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {product: item})}
      style={styles.recommendedItem}
      activeOpacity={0.8}>
      <Image
        source={{
          uri: 'https://chefrestoran.ru/wp-content/uploads/2018/10/309014621.jpg',
        }}
        style={styles.recommendedImage}
        resizeMode="cover"
      />
      <View style={styles.recommendedInfo}>
        <Text style={styles.recommendedName}>{item.name}</Text>
        <Text style={styles.recommendedCategory}>{item.category}</Text>
        <View style={styles.recommendedDetails}>
          <Text style={styles.productPrice}>{item.price} c</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          filterIcon={searchExecuted && products.length > 0}
          onFilterIconPress={() => ref.current.open()}
        />
      </View>
      {loading && <ActivityIndicator color={colors.main} size={'large'} />}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              <Text style={styles.none}>
                По вашему запросу ничего не найдено
              </Text>
            )
          )}
        </View>
        {recommendedProducts && (
          <View style={styles.recommendedContainer}>
            <Text style={[styles.title, {fontSize: 20}]}>
              Рекомендуемые товары
            </Text>
            <FlatList
              data={recommendedProducts.products}
              keyExtractor={item => item._id}
              renderItem={renderRecommendedProduct}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.recommendedProducts}
              horizontal={false}
            />
          </View>
        )}
      </ScrollView>
      <Modalize
        ref={ref}
        modalHeight={350}
        handleStyle={{backgroundColor: 'white'}}
        modalStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          paddingVertical: 20,
        }}
        withOverlay={true}>
        <View style={styles.container}>
          <Text style={styles.title}>Сортировать по</Text>
          <View style={styles.tabsContainer}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setSelectedTab(tab.id)}
                style={[
                  styles.tab,
                  selectedTab === tab.id && styles.activeTab,
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab.id && styles.activeTabText,
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>Упорядочить по:</Text>
          <View style={styles.orderToggle}>
            <TouchableOpacity
              style={[
                styles.orderButton,
                order === 'asc' && styles.activeButton,
              ]}
              onPress={() => setOrder('asc')}>
              <Text style={styles.orderText}>Возрастанию</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.orderButton,
                order === 'desc' && styles.activeButton,
              ]}
              onPress={() => setOrder('desc')}>
              <Text style={styles.orderText}>Убыванию</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default Search;
