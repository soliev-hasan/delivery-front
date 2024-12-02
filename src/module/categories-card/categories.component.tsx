import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import style from './categories.style';
import FastImage from 'react-native-fast-image';
const Categories = ({data}: {data: any}) => {
  return (
    <View>
      <Text style={style.title}>{data.name}</Text>
      <FlatList
        style={style.categories}
        data={data.subcategories}
        keyExtractor={item => item.name.toString()} // Убедитесь, что `id` уникальный
        renderItem={({item}) => (
          <View style={style.card}>
            <Text style={style.name}>{item.name}</Text>
            <FastImage
              source={{
                uri: `https://w7.pngwing.com/pngs/902/807/png-transparent-coffee-cup-tea-mug-coffee-mug-top-pic-full-filled-coffee-on-cup-coffee-ristretto-espresso-thumbnail.png`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={style.photo}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Categories;
