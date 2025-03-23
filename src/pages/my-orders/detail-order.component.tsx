import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useApiRequest} from '../../hooks/useRequest';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {Header} from '../../ui-components/header/header.component';
import colors from '../../helper/colors';

const DetailOrder = ({
  navigation,
  route,
}: RootNavigationProps<'DetailOrder'>) => {
  const {sendRequest} = useApiRequest();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrder = async () => {
    setIsLoading(true);
    try {
      const response = await sendRequest('get', `order/${route.params.id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.main}
        style={styles.loader}
      />
    );
  }

  if (!data) {
    return <Text style={styles.errorText}>Ошибка загрузки заказа</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header backIcon title="Детали заказа" />
        <View style={styles.contentProduct}>
          <View style={styles.row}>
            <Text style={styles.total}>Статус:</Text>
            <Text
              style={[
                styles.price,
                data.order.status === 'В ожидании'
                  ? styles.pending
                  : styles.completed,
              ]}>
              {data.order.status}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.total}>Цена доставки</Text>
            <Text style={styles.price}>
              {data && parseInt(data.order.deliveryAmount)} c
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.total}>Цена товара</Text>
            <Text style={styles.price}>{data && data.order.orderAmount} c</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.total}>Итог</Text>
            <Text style={styles.price}>
              {data && parseFloat(data.order.total).toFixed(2)} c
            </Text>
          </View>
        </View>
        {data.order.products.map((product, index) => {
          return (
            <View style={styles.product} key={index}>
              <View style={styles.rowProduct}>
                <FastImage
                  source={{
                    uri: `https://w7.pngwing.com/pngs/902/807/png-transparent-coffee-cup-tea-mug-coffee-mug-top-pic-full-filled-coffee-on-cup-coffee-ristretto-espresso-thumbnail.png`,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.photo}
                />
                <View style={styles.desc}>
                  <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.price}>{product.price} c</Text>
                </View>
              </View>
              <Text style={styles.quantity}>{product.quantity} шт</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentProduct: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.black,
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    margin: 12,
  },
  rowProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  price: {
    fontSize: 14,
    color: colors.main,
    marginTop: 4,
    padding: 5,
  },
  quantity: {
    fontSize: 14,
    color: colors.main,
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginBottom: 8,
  },
  total: {
    fontSize: 16,
    color: '#333',
  },
  right: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  pending: {
    backgroundColor: '#ffcc00',
    color: '#fff',
  },
  completed: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
});
