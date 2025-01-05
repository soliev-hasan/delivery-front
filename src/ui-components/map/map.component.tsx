import {Alert, Modal, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {useModal} from '../modal/modal.hook';
import {Input} from '../input/input.component';
import {Button} from '../button/button.component';
import colors from '../../helper/colors';
import {useApiRequest} from '../../hooks/useRequest';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {RootNavigationProps} from '../../navigation/navigation.types';
import BackIcon from '../back-icon/back-icon.component';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const Map = ({navigation, route}: RootNavigationProps<'Map'>) => {
  Geocoder.init('AIzaSyALKz46UoDvbMbBGENVA0AzjqLhC0ofDx4', {language: 'eng'});
  const existingAddress = route.params?.address || null; // Получаем переданный адрес (если есть)
  const {setUser, user, token} = useContext(AuthContext);
  const [isAutocompleteSelecting, setIsAutocompleteSelecting] = useState(false);
  const [marker, setMarker] = useState(
    existingAddress
      ? {
          latitude: existingAddress.latitude,
          longitude: existingAddress.longitude,
        }
      : null,
  );
  const [address, setAddress] = useState(
    existingAddress ? `${existingAddress.street}, ${existingAddress.city}` : '',
  );
  const {sendRequest} = useApiRequest();
  const [loading, setLoading] = useState(false);

  // Устанавливаем начальное состояние формы
  const [formData, setFormData] = useState({
    country: existingAddress?.country || '',
    city: existingAddress?.city || '',
    street: existingAddress?.street || '',
    latitude: existingAddress?.latitude || null,
    longitude: existingAddress?.longitude || null,
    entrance: existingAddress?.entrance || '',
    floor: existingAddress?.floor || '',
    apartment: existingAddress?.apartment || '',
    house: existingAddress?.house || '',
  });

  const handleMapPress = async event => {
    if (isAutocompleteSelecting) return; // Блокируем обработчик карты
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarker({latitude, longitude});

    try {
      const geoData = await Geocoder.from(latitude, longitude);

      if (geoData.results.length > 0) {
        const formattedAddress =
          geoData.results.find(
            result =>
              result.types.includes('route') ||
              result.types.includes('street_address'),
          )?.formatted_address || geoData.results[0].formatted_address;

        const components = geoData.results[0].address_components;

        let city = '';
        let country = '';
        let street = formattedAddress.split(',')[0].trim();

        components.forEach(component => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (component.types.includes('country')) {
            country = component.long_name;
          }
        });

        setAddress(formattedAddress);

        // Обновляем данные формы при изменении маркера
        setFormData(prevState => ({
          ...prevState,
          city,
          country,
          street,
          latitude,
          longitude,
        }));
      } else {
        setAddress('Адрес не найден');
      }
    } catch (error) {
      console.error('Ошибка геокодинга:', error);
      setAddress('Ошибка получения адреса');
    }
  };

  const handleSave = async () => {
    setLoading(true);

    const endpoint = existingAddress
      ? `user/address/${existingAddress._id}` // Если редактируем, вызываем PUT
      : 'user/address'; // Если добавляем, вызываем POST

    const method = existingAddress ? 'put' : 'post';

    try {
      if (method == 'post') {
        const response = await sendRequest(method, endpoint, formData);
        if (response.status === 200 || response.status === 201) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Успешно',
            textBody: 'Адрес добавлен',
          });
          setUser(response.data.user);
          navigation.goBack();
          console.log(response.data);
        }
      } else {
        axios
          .put(
            'http://192.168.1.36:3434/api/user/address/' + existingAddress._id,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            if (response.status === 200 || response.status === 201) {
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Успешно',
                textBody: 'Адрес изменен',
              });
              sendRequest('get', 'user/me')
                .then(response => {
                  setUser(response.data.user);
                })
                .finally(() => navigation.goBack());
            }
          });
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Ошибка',
        textBody: 'Произошла ошибка при сохранении адреса',
      });
      console.error('Ошибка сохранения адреса:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <View style={styles.back}>
        <BackIcon />
      </View>
      <MapView
        mapType="hybrid"
        style={styles.map}
        initialRegion={{
          latitude: marker?.latitude || 38.5358,
          longitude: marker?.longitude || 68.7791,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}>
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={15}
        />
        {marker && (
          <Marker
            coordinate={marker}
            title="Выбранное место"
            description={`Широта: ${marker.latitude}, Долгота: ${marker.longitude}`}
          />
        )}
        {/* <GooglePlacesAutocomplete
          placeholder="Введите адрес"
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setIsAutocompleteSelecting(true); // Активируем блокировку
            const {lat, lng} = details.geometry.location;
            setMarker({latitude: lat, longitude: lng});
            setFormData(prevState => ({
              ...prevState,
              latitude: lat,
              longitude: lng,
              city: details.address_components.find(comp =>
                comp.types.includes('locality'),
              )?.long_name,
              country: details.address_components.find(comp =>
                comp.types.includes('country'),
              )?.long_name,
              street: details.address_components.find(comp =>
                comp.types.includes('route'),
              )?.long_name,
            }));

            const {geometry, address_components, formatted_address} = details;
            let city = '';
            let country = '';
            let street = formatted_address.split(',')[0].trim(); // Первый элемент адреса

            // Обходим компоненты адреса
            address_components.forEach(component => {
              if (component.types.includes('locality')) {
                city = component.long_name;
              } else if (component.types.includes('country')) {
                country = component.long_name;
              } else if (component.types.includes('route')) {
                street = component.long_name; // Улица из компонента
              }
            });
            setAddress(formatted_address);

            setTimeout(() => setIsAutocompleteSelecting(false), 500); // Сбрасываем флаг через 500 мс
          }}
          query={{
            key: 'AIzaSyALKz46UoDvbMbBGENVA0AzjqLhC0ofDx4',
            language: 'ru',
          }}
          suppressDefaultStyles={false}
          styles={{
            container: {
              position: 'absolute',
              top: 10,
              width: '85%',
              alignSelf: 'center',
              zIndex: 10,
            },
            textInput: {
              height: 40,
              backgroundColor: '#FFF',
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              marginLeft: 55,
              marginTop: 10,
            },
          }}
        /> */}
      </MapView>

      <View style={styles.modal}>
        <Text style={styles.adress}>{address}</Text>
        <View style={styles.modalContent}>
          <Input
            placeholder="Подъезд"
            placeholderTextColor={colors.grayDark}
            value={formData.entrance}
            onChangeText={text =>
              setFormData(prevState => ({...prevState, entrance: text}))
            }
            showCountryCode={false}
          />

          <Input
            placeholder="Этаж"
            value={formData.floor}
            onChangeText={text =>
              setFormData(prevState => ({...prevState, floor: text}))
            }
            showCountryCode={false}
            wrapperStyle={{color: colors.black}}
            placeholderTextColor={colors.grayDark}
          />

          <Input
            placeholder="Квартира"
            value={formData.apartment}
            onChangeText={text =>
              setFormData(prevState => ({...prevState, apartment: text}))
            }
            showCountryCode={false}
            placeholderTextColor={colors.grayDark}
          />

          <Input
            placeholder="Дом"
            value={formData.house}
            onChangeText={text =>
              setFormData(prevState => ({...prevState, house: text}))
            }
            showCountryCode={false}
            placeholderTextColor={colors.grayDark}
          />

          <Button loading={loading} disabled={true} onPress={handleSave}>
            {existingAddress ? 'Сохранить изменения' : 'Готово'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  adress: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '500',
  },
  modal: {
    padding: 20,
    gap: 20,
  },
  modalContent: {
    gap: 15,
  },
  back: {
    position: 'absolute',
    top: 70,
    left: 10,
    zIndex: 99,
    backgroundColor: colors.main,
    borderRadius: 90,
  },
  autocomplete: {},
});
