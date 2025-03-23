import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useApiRequest} from '../../hooks/useRequest';
import {ChevronRight} from 'lucide-react-native';
import {Header} from '../../ui-components/header/header.component';
import colors from '../../helper/colors';
import AuthContext from '../../contexts/AuthContext';
import {RootNavigationProps} from '../../navigation/navigation.types';

const MyOrders = ({navigation}: RootNavigationProps<'MyOrders'>) => {
  const {sendRequest} = useApiRequest();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useContext(AuthContext);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await sendRequest('get', 'order/my');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrder = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailOrder', {id: item._id})}
      activeOpacity={0.8}
      style={styles.orderCard}>
      <View style={styles.row}>
        <Text style={styles.track}>Заказ №{item.track}</Text>
        <ChevronRight color={colors.black} />
      </View>
      <Text style={styles.info}>📅 Дата: {item.date}</Text>
      <Text style={styles.info}>
        🏠 Адрес: {item.address.city}, {item.address.street}, д.{' '}
        {item.address.house}
      </Text>

      <Text
        style={[
          styles.status,
          item.status === 'В ожидании' ? styles.pending : styles.completed,
        ]}>
        {item.status}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.total}>💳 {item.total.toFixed(2)} c</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailOrder', {id: item._id})}>
          <Text style={styles.detailsButton}>Подробнее →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backIcon title="Мои Заказы" />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={colors.main} />
            <Text style={styles.loadingText}>Загрузка заказов...</Text>
          </View>
        ) : (
          <FlatList
            data={data.orders}
            renderItem={renderOrder}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContainer: {
    padding: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  track: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  info: {
    fontSize: 14,
    color: colors.darkGray,
    marginVertical: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  pending: {
    backgroundColor: '#ffcc00',
    color: '#fff',
  },
  completed: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  detailsButton: {
    color: colors.main,
    fontWeight: 'bold',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default MyOrders;
