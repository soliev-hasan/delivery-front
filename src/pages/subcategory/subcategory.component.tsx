import React, { useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Header } from "../../ui-components/header/header.component";
import { useDispatch, useSelector } from "react-redux";
import subcategoriesSelectors from "../../store/subcategories/selectors";
import { useApiRequest } from "../../hooks/useRequest";
import subcategoriesActions from "../../store/subcategories/actions";
import { DEVELOP_URL } from "../../helper/helper";
import styles from './subcategory.style';
import { useNavigation } from "@react-navigation/native";

type RouteParams = { params: { id: number } };

const SubCategory = ({ route }: { route: RouteParams }) => {
  const { categoryId, subcategoryId, title } = route.params;
  const { sendRequest } = useApiRequest();
  const dispatch = useDispatch();
  const subcategories = useSelector(subcategoriesSelectors.allSubcategories);
  const BASE_URL = `${DEVELOP_URL}/api/`;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await sendRequest('get', 'product', { categoryId, subcategoryId, });
        dispatch(subcategoriesActions.saveSubcategories(response.data.products));
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, []);


  const renderProduct = ({ item }) => {
    return (
      <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ProductDetail', {product: item})}>
        {/* <Image source={{ uri: 'https://cdn.mealswithkraft.com/4a4a88/globalassets/products/product-block-500x500_0004_kraft-cheddar-cheese_light_100g_opt_eng.png?width=640&height=480&mode=crop' }} style={styles.productImage} /> */}
        <Image source={{ uri: `${BASE_URL}${item.photos[0]}` }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productWeight}>{item.weight}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price} смн.</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <Header backIcon title={title} />
      {subcategories.subcategories.length > 0 &&
        <FlatList
          data={subcategories.subcategories}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={{ marginTop: 20 }}
        />
      }
    </ScrollView>
  );
};

export default SubCategory;
