import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import styles from './payment.style';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {Header} from '../../ui-components/header/header.component';
import FastImage from 'react-native-fast-image';
import AuthContext from '../../contexts/AuthContext';
import {Button} from '../../ui-components/button/button.component';
import {useApiRequest} from '../../hooks/useRequest';
const Payment = ({navigation, route}: RootNavigationProps<'Payment'>) => {
  const {total, totalPrice} = route.params;
  const {user, address, token} = useContext(AuthContext);
  const {sendRequest} = useApiRequest();
  console.log(token);

  const sendOrder = async () => {
    try {
      const products = total.map(product => ({
        productId: product._id, // Используем _id продукта
        quantity: product.quantity,
      }));
      console.log(products);

      const requestBody = {
        products,
        comment: 'leave at the door pls', // Ваш комментарий
      };

      const response = await sendRequest('post', 'order', {
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        console.log('Order sent successfully:', response.data);
      } else {
        console.error('Failed to send order:', response.status);
      }
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  // Вызывайте эту функцию, например, при нажатии на кнопку:
  <Button onPress={sendOrder}>Оформить заказ сейчас</Button>;

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
            <Text style={styles.title}>Детали заказа</Text>
            <View style={styles.row}>
              <Text style={styles.total}>Итог </Text>
              <Text style={styles.price}>{totalPrice} c</Text>
            </View>
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
          </View>
          <Button onPress={sendOrder} disabled>
            Оформить заказ сейчас
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
