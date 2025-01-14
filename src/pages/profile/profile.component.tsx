import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import styles from './profile.style';
import {Header} from '../../ui-components/header/header.component';
import SVGCamera from '../../assets/icons/camera.svg';
import SVGSettings from '../../assets/icons/settings.svg';
import {ChevronRight, LogOut, User} from 'lucide-react-native';
import colors from '../../helper/colors';
import AuthContext from '../../contexts/AuthContext';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {DEVELOP_URL} from '../../helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApiRequest} from '../../hooks/useRequest';

const Profile = ({navigation}: RootNavigationProps<'Profile'>) => {
  const {user, logout} = useContext(AuthContext);
  const {sendRequest} = useApiRequest();

  const options = [
    {
      id: 1,
      name: 'Настройки',
      icon: SVGSettings,
      onPress: () => navigation.navigate('EditProfile', {newUser: false}),
    },
    {
      id: 2,
      name: 'Профиль',
      icon: SVGSettings,
      onPress: () => console.log('Профиль'),
    },
    {
      id: 3,
      name: 'Мои заказы',
      icon: SVGSettings,
      onPress: () => navigation.navigate('MyOrders'),
    },
    {id: 4, name: 'Помощь', icon: SVGSettings, onPress: () => console.log('')},
    {id: 5, name: 'О нас', icon: SVGSettings, onPress: () => console.log('')},
    {
      id: 6,
      name: 'Контакты',
      icon: SVGSettings,
      onPress: () => console.log(''),
    },
  ];
  // const BASE_URL = `${DEVELOP_URL}/api/`;
  // const profilePhoto = `${BASE_URL}${user.photoUri}`.replace(/\\/g, '/');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{paddingHorizontal: 15}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Header title={'Профиль'} />
        <View style={styles.profileInfo}>
          <View style={styles.imageContainer}>
            {user && user.photoUri ? (
              <FastImage
                source={{
                  uri: user.photoUri,
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
          </View>
          <Text style={styles.profileName}>
            {user && user.name} {user && user.surname}
          </Text>
          <Text style={styles.profileEmail}>{user && user.email}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.iconRow}
              onPress={option.onPress}>
              <View style={styles.iconInfo}>
                <View style={styles.iconContainer}>
                  <option.icon width={35} height={35} />
                </View>
                <Text style={styles.iconName}>{option.name}</Text>
              </View>
              <ChevronRight size={25} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={async () => {
            await sendRequest('post', '/auth/logout');
            logout();

            navigation.navigate('SignUp');
          }}
          style={styles.exitBtn}>
          <LogOut size={25} color={colors.redShade} />
          <Text style={styles.exitText}>Выход</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
