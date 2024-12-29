import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './cart.style';
import {useDispatch, useSelector} from 'react-redux';
import cartSelectors from '../../store/cart/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartActions from '../../store/cart/actions';
import AuthContext from '../../contexts/AuthContext';
import {Header} from '../../ui-components/header/header.component';
import FastImage from 'react-native-fast-image';
import {Check, Minus, Plus, Square, Trash} from 'lucide-react-native';
import colors from '../../helper/colors';
import {Button} from '../../ui-components/button/button.component';
import {useModal} from '../../ui-components/modal/modal.hook';
import {ConfirmationModalize} from '../../ui-components/modal/confirmatin-modalize.component';
import Illustration from '../../assets/icons/Illustration.svg';
import {RootNavigationProps} from '../../navigation/navigation.types';
const Cart = ({navigation}: RootNavigationProps<'Cart'>) => {
  const {cart, setCart} = useContext(AuthContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const modal = useModal();
  const saveCart = async updatedCart => {
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };
  const increaseQuantity = index => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    saveCart(updatedCart);
  };

  const decreaseQuantity = index => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      saveCart(updatedCart);
    } else {
      removeItem(index);
    }
  };

  const removeItem = index => {
    const updatedCart = cart.filter((_, i) => i !== index);
    saveCart(updatedCart);
  };
  // Функция для выбора/отмены выбора товара
  const toggleSelectItem = index => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  // Функция для подсчета общей суммы выбранных товаров
  const calculateTotal = () => {
    return selectedItems.reduce((total, index) => {
      const item = cart[index];
      if (item) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };
  const calculateTotalQuantity = () => {
    return selectedItems.reduce((total, index) => {
      const item = cart[index];
      if (item) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Корзина" />
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.cartItem}>
                <TouchableOpacity
                  style={[
                    styles.check,
                    {
                      borderColor: selectedItems.includes(index)
                        ? colors.main
                        : colors.black,
                    },
                  ]}
                  onPress={() => toggleSelectItem(index)}>
                  {selectedItems.includes(index) && (
                    <Check color={colors.main} size={18} />
                  )}
                </TouchableOpacity>
                <FastImage
                  source={{
                    uri: `https://w7.pngwing.com/pngs/902/807/png-transparent-coffee-cup-tea-mug-coffee-mug-top-pic-full-filled-coffee-on-cup-coffee-ristretto-espresso-thumbnail.png`,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.photo}
                />
                <View style={styles.desc}>
                  <Text style={styles.itemName}>{item.name}</Text>

                  <Text style={styles.itemPrice}>Цена: {item.price} c</Text>
                  <View style={styles.icons}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(index)}
                      style={styles.icon}>
                      <Minus color={colors.black} size={20} />
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => increaseQuantity(index)}
                      style={styles.icon}>
                      <Plus color={colors.black} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    modal.open({
                      component: (
                        <ConfirmationModalize
                          title="Удаление товара"
                          description="Вы уверены, что хотите удалить товар из корзины?"
                          mainActionText="Удалить"
                          mode="danger"
                          onConfirm={() => removeItem(index)}
                        />
                      ),
                      height: 250,
                    });
                  }}>
                  <Trash color={colors.red} size={20} />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <View style={styles.rowCalc}>
              <Text style={styles.totalText}>Количество товаров : </Text>
              <Text style={styles.num}>{calculateTotalQuantity()}</Text>
            </View>
            <View style={styles.rowCalc}>
              <Text style={styles.totalText}>Итоговая сумма : </Text>
              <Text style={styles.num}>{calculateTotal()} c</Text>
            </View>
          </View>
          <Button style={{margin: 20, width: '90%'}} disabled>
            Оформить заказ
          </Button>
        </>
      ) : (
        <View style={styles.empty}>
          <Illustration width={300} height={300} />
          <Text style={styles.title}>Ой! Вы Голодный Кажется</Text>
          <Text style={styles.emptyCart}>вы еще не заказали еду</Text>
          <Button
            onPress={() => navigation.navigate('Search')}
            style={{marginTop: 30, width: '80%'}}
            disabled>
            Поиск
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
