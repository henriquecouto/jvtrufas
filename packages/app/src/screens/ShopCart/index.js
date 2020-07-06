import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GlobalContext} from '../../contexts/global';
import ProductCart from '../../components/ProductCart';

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
    padding: 20,
  },
  loading: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
