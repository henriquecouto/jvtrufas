import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import api from '../../../api';
import Error from '../../components/Error';
import {GlobalContext} from '../../contexts/global';
import LargeButton from '../../components/LargeButton';
import Product from '../../components/Product';

export default function ShopHome({navigation}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [{auth}] = useContext(GlobalContext);

  console.log({auth});

  const loadItems = useCallback(async () => {
    if (auth.token) {
      try {
        const {data} = await api.get('/purchaser/product', {
          headers: {Authorization: `Bearer ${auth.token}`},
        });
        setItems(data.items);
      } catch (err) {
        console.log('shop home load items error: ', err.response.data.message);
        setError('Ocorreu um erro ao carregar os items');
      }
      setLoading(false);
    }
  }, [auth.token]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  if (!auth.token) {
    return (
      <View style={styles.root}>
        <LargeButton
          onPress={() => navigation.push('SignIn')}
          header="Ops..."
          title="Você ainda não está conectado 😕"
          subtitle="Entre agora!"
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={50} color="#5c2f0c" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.root}>
        <Error message={error} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={items}
      renderItem={({item}) => {
        return <Product product={item} />;
      }}
      keyExtractor={({index}) => index}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  loading: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
