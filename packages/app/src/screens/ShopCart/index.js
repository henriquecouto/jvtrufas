import React, {useContext} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {GlobalContext} from '../../contexts/global';
import ProductCart from '../../components/ProductCart';
import Header from '../../components/Header';

export default function ShopCart() {
  const [{cart}, actions] = useContext(GlobalContext);

  const removeItem = (index) => () => {
    const newCart = cart;
    if (newCart.items.length > 1) {
      newCart.items.splice(index, 1);
    } else {
      delete newCart.items;
    }
    actions.setCart(newCart);
  };

  return (
    <FlatList
      contentContainerStyle={styles.root}
      data={cart.items}
      ListHeaderComponent={<Header title="Seu carrinho" />}
      renderItem={({item, index}) => {
        return (
          <ProductCart product={item} removeItem={() => removeItem(index)} />
        );
      }}
      keyExtractor={(item, index) => item._id + index}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-evenly',
    padding: 20,
  },
  loading: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
