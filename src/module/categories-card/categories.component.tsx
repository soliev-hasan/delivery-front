import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import style from './categories.style';
import FastImage from 'react-native-fast-image';
import {DEVELOP_URL} from '../../helper/helper';
import {useNavigation} from '@react-navigation/native';
const Categories = ({data}: {data: any}) => {
  const BASE_URL = `${DEVELOP_URL}/api/`;
  const navigation = useNavigation();

  return (
    <View style={{paddingLeft: 10}}>
      <Text style={style.title}>{data.name}</Text>
      <FlatList
        style={style.categories}
        data={data.subcategories}
        keyExtractor={item => item.name.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SubCategory', {
                categoryId: data._id,
                subcategoryId: item._id,
                title: item.name,
              })
            }>
            <ImageBackground
              source={{
                uri: 'https://media.istockphoto.com/id/1309352410/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%87%D0%B8%D0%B7%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80-%D1%81-%D0%BF%D0%BE%D0%BC%D0%B8%D0%B4%D0%BE%D1%80%D0%B0%D0%BC%D0%B8-%D0%B8-%D1%81%D0%B0%D0%BB%D0%B0%D1%82%D0%BE%D0%BC-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B4%D0%BE%D1%81%D0%BA%D0%B5.jpg?s=612x612&w=0&k=20&c=dW1Aguo-4PEcRs79PUbmMXpx5YrBjqSYiEhwnddbj_g=',
              }}
              // resizeMode="contain"
              style={style.card}
              borderRadius={10}
              imageStyle={
                {
                  // width: 100,
                  // height: 100,
                  // marginTop: 50,
                  // marginLeft: 10,
                }
              }>
              <Text style={style.name}>{item.name}</Text>

              {/* <FastImage
                // source={{
                //   uri: `${BASE_URL}${item.photoUri}`,
                //   priority: FastImage.priority.normal,
                // }}
                source={{
                  uri: `https://w7.pngwing.com/pngs/902/807/png-transparent-coffee-cup-tea-mug-coffee-mug-top-pic-full-filled-coffee-on-cup-coffee-ristretto-espresso-thumbnail.png`,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={style.photo}
              /> */}
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
