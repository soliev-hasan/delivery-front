import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import styles from './editProfile.style';
import { Header } from '../../ui-components/header/header.component';
import SVGCamera from '../../assets/icons/camera.svg';
import SVGSettings from '../../assets/icons/settings.svg';
import { ChevronRight, LogOut } from 'lucide-react-native';
import colors from '../../helper/colors';
import AuthContext from '../../contexts/AuthContext';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { DEVELOP_URL } from '../../helper/helper';
import { Input } from '../../ui-components/input/input.component';
import { Button } from '../../ui-components/button/button.component';
import { useApiRequest } from '../../hooks/useRequest';
import { RootNavigationProps } from '../../navigation/navigation.types';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfile = ({navigation}: RootNavigationProps<'EditProfile'>) => {
  const { user, setUser } = useContext(AuthContext);
  const BASE_URL = `${DEVELOP_URL}/api/`;
  // const profilePhoto = `${BASE_URL}${user?.photoUri}`.replace(/\\/g, '/');
  const {sendRequest, loading} = useApiRequest();

  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [photo, setPhoto] = useState(user.photoUri);
  console.log('photoo',photo);
  

  const choosePhoto = () => {
    const options = {
      mediaType: 'photo', // Only allow selecting photos
      quality: 1,         // Maximum quality
    };
  
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedPhoto = response.assets[0]; // Get the first selected photo
        console.log('Selected Photo URI:', selectedPhoto.uri);
  
        // Update the state with the selected photo
        setPhoto(selectedPhoto.uri); // Assuming you have a `photo` state
      }
    });
  };
  

  const saveProfileInfo = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);

    if (photo) {
      console.log('photo');
      
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
        setUser({
          name: updatedUser.name,
          surname: updatedUser.surname,
          photoUri: updatedUser.photoUri,
        });
        navigation.goBack();

      } 
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Header title={'Изменение профиля'} backIcon />
        <View style={styles.profileInfo}>
          <View style={styles.imageContainer}>
            <FastImage
              source={{
                uri: photo,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={choosePhoto}>
              <SVGCamera style={styles.cameraIcon} width={70} height={70} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.editForm}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Имя</Text> 
            <Input
              value={name}
              onChangeText={(text: string) => setName(text)}
              showCountryCode = {false}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Фамилия</Text> 
            <Input
              value={surname}
              onChangeText={(text: string) => setSurname(text)}
              showCountryCode = {false}
            />
          </View>
          <Button
          disabled={name.length > 0 && surname.length > 0}
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
