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
import {ChevronRight, LogOut} from 'lucide-react-native';
import colors from '../../helper/colors';
import AuthContext from '../../contexts/AuthContext';
import FastImage from 'react-native-fast-image';

const Profile = () => {
  const {user} = useContext(AuthContext);

  const options = [
    {id: 1, name: 'Настройки', icon: SVGSettings},
    {id: 2, name: 'Профиль', icon: SVGSettings},
    {id: 3, name: 'Помощь', icon: SVGSettings},
    {id: 4, name: 'О нас', icon: SVGSettings},
    {id: 5, name: 'Контакты', icon: SVGSettings},
    {id: 6, name: 'Выход', icon: SVGSettings},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{paddingHorizontal: 15}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Header title={'Профиль'} />
        <View style={styles.profileInfo}>
          <View style={styles.imageContainer}>
            <FastImage
              source={{
                uri: user && user.photoUri,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.profileImage}
            />
            <TouchableOpacity>
              <SVGCamera style={styles.cameraIcon} width={70} height={70} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>
            {user && user.name} {user && user.surname}
          </Text>
          <Text style={styles.profileEmail}>{user && user.email}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity key={option.id} style={styles.iconRow}>
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
        <TouchableOpacity style={styles.exitBtn}>
          <LogOut size={25} color={colors.redShade} />
          <Text style={styles.exitText}>Выход</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
