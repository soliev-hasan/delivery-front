import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import AuthContext from '../../contexts/AuthContext';
import {useApiRequest} from '../../hooks/useRequest';
import Categories from '../../module/categories-card/categories.component';
import categoriesActions from '../../store/categories/actions';
import categoriesSelectors from '../../store/categories/selectors';
import styles from './main.style';
import colors from '../../helper/colors';
import {Text} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Main = () => {
  const {sendRequest} = useApiRequest();
  const {setUser, user, token, refreshToken} = useContext(AuthContext);
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelectors.allCategories);
  useEffect(() => {
    Promise.all([
      sendRequest('get', 'user/me').then(response =>
        setUser(response.data.user),
      ),
      sendRequest('get', '/category/structured/')
        .then(response =>
          dispatch(categoriesActions.saveCategories(response.data.categories)),
        )

        .catch(e => console.log()),
    ]);
  }, [token, refreshToken]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categories}>
        {categories.categories.length > 0 ? (
          <FlatList
            data={categories.categories}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 40}}
            keyExtractor={item => item.name.toString()}
            renderItem={({item}) => <Categories data={item} />}
          />
        ) : (
          <ActivityIndicator color={colors.main} size={'large'} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Main;
