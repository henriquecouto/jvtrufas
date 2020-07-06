import React from 'react';
import {Text, StyleSheet, View, Dimensions, Image} from 'react-native';
import parsePrice from '../../helpers/parsePrice';
import {baseURL} from '../../../api';

export default function Product({product}) {
  return (
    <View style={styles.root}>
      {product.photos[0] && (
        <Image
          style={styles.image}
          source={{uri: `${baseURL}${product.photos[0]}`}}
        />
      )}
      <View>
        <Text
          style={[
            styles.title,
            product.photos[0] && {width: Dimensions.get('window').width - 180},
          ]}>
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
  image: {
    borderRadius: 100,
    // backgroundColor: '#ff6600',
    marginRight: 20,
    height: 100,
    width: 100,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    fontFamily: 'FredokaOne-Regular',
  },
  price: {
    fontSize: 20,
  },
});
