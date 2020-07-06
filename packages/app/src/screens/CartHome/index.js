import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GlobalContext} from '../../contexts/global';
import ProductCart from '../../components/ProductCart';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather';

export default function CartHome({navigation}) {
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
    <>
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
      <View style={styles.footer}>
        <CustomButton
          type="custom"
          onPress={() => navigation.navigate('SelectAddress')}>
          <View style={styles.buttonNext}>
            <Text style={styles.buttonText}>Selecionar Endereço</Text>
            <Icon name="chevron-right" size={25} color="#fff" />
          </View>
        </CustomButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-evenly',
    padding: 20,
  },
  footer: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5c2f0c44',
  },
  loading: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
  },
});
