import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './editProfile.style';
import {Header} from '../../ui-components/header/header.component';
import SVGCamera from '../../assets/icons/camera.svg';
import SVGSettings from '../../assets/icons/settings.svg';
import {ChevronRight, LogOut, User} from 'lucide-react-native';
import colors from '../../helper/colors';
import AuthContext from '../../contexts/AuthContext';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {DEVELOP_URL} from '../../helper/helper';
import {Input} from '../../ui-components/input/input.component';
import {Button} from '../../ui-components/button/button.component';
import {useApiRequest} from '../../hooks/useRequest';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {launchImageLibrary} from 'react-native-image-picker';
import {UserType} from '../../types/user.type';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const EditProfile = ({
  navigation,
  route,
}: RootNavigationProps<'EditProfile'>) => {
  const {user, setUser} = useContext(AuthContext);
  const {newUser, phoneNumber} = route.params;
  // const BASE_URL = `${DEVELOP_URL}/api/`;
  // // const profilePhoto = `${BASE_URL}${user?.photoUri}`.replace(/\\/g, '/');
  const {sendRequest, loading} = useApiRequest();

  const [name, setName] = useState(user && user.name ? user.name : '');
  const [surname, setSurname] = useState(
    user && user.surname ? user.surname : '',
  );
  const [photo, setPhoto] = useState<string>(
    user && user.photoUri ? user.photoUri : '',
  );
  const [phone, setPhone] = useState(user && user.phone ? user.phone : '');

  const choosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedPhoto = response.assets[0];
        console.log('Selected Photo URI:', selectedPhoto.uri);

        setPhoto(selectedPhoto.uri);
      }
    });
  };

  const saveProfileInfo = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);

    if (photo) {
      formData.append('photo', {
        uri: photo,
        type: 'image/jpeg',
        name: 'profile_photo.jpg',
      });
    }

    try {
      const response = await sendRequest('put', 'user/profile', formData);
      if (response?.status === 200) {
        const updatedUser = response.data.updatedUser;
        setUser((prevUser: UserType) => ({
          ...prevUser,
          name: updatedUser.name,
          surname: updatedUser.surname,
          photoUri: updatedUser.photoUri,
          phone: updatedUser.phone,
        }));
        !newUser &&
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Успешно',
            textBody: 'Ваш профиль успешно изменено',
          });
        if (newUser) {
          navigation.navigate('BottomTab');
        }
      }
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Ошибка',
        textBody: 'Попоробуйте позже',
      });
      console.error('Error saving profile:', err);
    }
  };
  const isModified = () => {
    return (
      name !== (user?.name || '') ||
      surname !== (user?.surname || '') ||
      phone !== (user?.phone || '') ||
      photo !== (user?.photoUri || '')
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{paddingHorizontal: 15}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Header
          title={'Персональные данные'}
          backIcon={newUser ? false : true}
        />
        <View style={styles.profileInfo}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={choosePhoto}
            style={styles.imageContainer}>
            {photo ? (
              <FastImage
                source={{
                  uri: photo,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.user}>
                <User strokeWidth={1} size={90} />
              </View>
            )}

            <SVGCamera style={styles.cameraIcon} width={70} height={70} />
          </TouchableOpacity>
        </View>

        <View style={styles.editForm}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Номер</Text>
            <Input
              editable={newUser ? true : false}
              value={phone ? phone : phoneNumber}
              showCountryCode={newUser ? true : false}
              maxLength={9}
              onChangeText={(text: string) => setPhone(text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Имя</Text>
            <Input
              value={name}
              onChangeText={(text: string) => setName(text)}
              showCountryCode={false}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Фамилия</Text>
            <Input
              value={surname}
              onChangeText={(text: string) => setSurname(text)}
              showCountryCode={false}
            />
          </View>
          {user && user.email && (
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Почта</Text>
              <Input
                editable={false}
                value={user.email}
                showCountryCode={false}
              />
            </View>
          )}

          <Button
            disabled={isModified()}
            onPress={saveProfileInfo}
            loading={loading}>
            Сохранить
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
