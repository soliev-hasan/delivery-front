import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './payment.style';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {Header} from '../../ui-components/header/header.component';
import FastImage from 'react-native-fast-image';
import AuthContext from '../../contexts/AuthContext';
import {Button} from '../../ui-components/button/button.component';
import {useApiRequest} from '../../hooks/useRequest';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Input} from '../../ui-components/input/input.component';
import colors from '../../helper/colors';
const Payment = ({navigation, route}: RootNavigationProps<'Payment'>) => {
  const {total, totalPrice} = route.params;
  const {user, address, token} = useContext(AuthContext);
  const {sendRequest} = useApiRequest();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const sendOrder = async () => {
    try {
      setLoading(true);
      const products = total.map(product => ({
        productId: product._id,
        quantity: product.quantity,
      }));

      const response = await sendRequest('post', 'order', {
        products: products,
        comment: message,
      });

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Успешно',
        textBody: 'Ваш заказ успешно оформлен! 🎉',
      });
      setMessage('');
      setLoading(false);
      navigation.navigate('BottomTab');
      if (response.status === 200) {
        // console.log('Order sent successfully:', response.data);
      } else {
        console.log('Failed to send order:', response.data.error);
      }
    } catch (error) {
      console.log('Error sending order:', error);
    }
  };

  useEffect(() => {
    const products = total.map(product => ({
      productId: product._id,
      quantity: product.quantity,
    }));
    sendRequest('post', 'order/details', {
      products: products,
    })
      .then(res => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header backIcon title="Оформление заказа" />
        <View style={styles.contentProduct}>
          <Text style={styles.title}>Товары готовы к отправке</Text>

          {total.map((product, index) => {
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
          <View>
            {loading ? (
              <ActivityIndicator color={colors.main} size={'large'} />
            ) : (
              <>
                <Text style={styles.title}>Детали заказа</Text>
                <View style={styles.row}>
                  <Text style={styles.total}>Цена доставки </Text>
                  <Text style={styles.price}>
                    {parseInt(order.details.deliveryAmount)} c
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.total}>Цена товара </Text>
                  <Text style={styles.price}>
                    {order.details.orderAmount} c
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.total}>Итог </Text>
                  <Text style={styles.price}>
                    {parseInt(order.details.total)} c
                  </Text>
                </View>
              </>
            )}
            <View style={{marginTop: 15}}>
              <Text style={styles.title}>Доставить по адресу :</Text>

              <View style={styles.row}>
                <Text style={styles.total}>Имя</Text>
                <Text style={styles.right}>
                  {user.name} {user.surname}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.total}>Номер тел.</Text>
                <Text style={styles.right}>{user.phone}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.total}>Город</Text>
                <Text style={styles.right}>{address.city}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.total}>Улица</Text>
                <Text style={styles.right}>{address.street}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.total}>Квартира</Text>
                <Text style={styles.right}>{address.apartment}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.total}>Дом</Text>
                <Text style={styles.right}>{address.house}</Text>
              </View>
            </View>
            <Input
              showCountryCode={false}
              placeholder="Комментарие"
              wrapperStyle={{marginTop: 10}}
              onChangeText={setMessage}
              value={message}
            />
          </View>
          <Button onPress={sendOrder} disabled loading={loading}>
            Оформить заказ сейчас
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
