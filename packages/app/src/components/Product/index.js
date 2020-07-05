import React from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import parsePrice from '../../helpers/parsePrice';

export default function Product({product}) {
  console.log(typeof product.price);
  return (
    <View style={styles.root}>
      <View style={styles.icon}>
        <Icon name="slash" size={70} color="#fff" />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>
          {product.name} de {product.flavor}
        </Text>
        <Text style={styles.price}>{parsePrice(product.price)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    // width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderColor: '#5c2f0c',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    borderRadius: 100,
    backgroundColor: '#ff6600',
    marginRight: 20,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {},
  title: {
    width: Dimensions.get('window').width - 180,
    fontSize: 25,
    fontFamily: 'FredokaOne-Regular',
  },
  price: {
    fontSize: 20,
  },
});
