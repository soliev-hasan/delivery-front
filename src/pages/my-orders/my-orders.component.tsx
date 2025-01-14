import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import styles from './my-orders.style';
import {useApiRequest} from '../../hooks/useRequest';
import {Receipt} from 'lucide-react-native';
import {Header} from '../../ui-components/header/header.component';
import colors from '../../helper/colors';

const MyOrders = () => {
  const {sendRequest} = useApiRequest();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  const fetchOrders = async () => {
    setIsLoading(true); // Начало загрузки
    try {
      const response = await sendRequest('get', 'order/my');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false); // Завершение загрузки
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrder = ({item}) => (
    <View style={styles.orderCard}>
      <View style={styles.row}>
        <Receipt size={24} color="#4CAF50" />
        <Text style={styles.track}>Номер: {item.track}</Text>
      </View>
      <Text style={styles.info}>📅 Дата: {item.date}</Text>
      <Text style={styles.info}>
        🏠 Адрес:{' '}
        {`${item.address.city}, ${item.address.street}, д. ${item.address.building}`}
      </Text>
      <Text
        style={[
          styles.status,
          item.status === 'В ожидании' ? styles.pending : styles.assigned,
        ]}>
        Статус: {item.status}
      </Text>
      <Text style={styles.total}>💳 Сумма: {item.total.toFixed(2)} ₽</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backIcon title="Мои Заказы" />
      <View style={styles.container}>
        {isLoading ? ( // Если идет загрузка, показываем спиннер
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

export default MyOrders;
