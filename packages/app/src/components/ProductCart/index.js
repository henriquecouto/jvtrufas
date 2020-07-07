import React from 'react';
import {Text, StyleSheet, View, Dimensions, Image, Button} from 'react-native';
import parsePrice from '../../helpers/parsePrice';
import {baseURL} from '../../../api';

import CustomButton from '../CustomButton';

export default function ProductCart({product, removeItem}) {
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        {product.photos[0] && (
          <Image
            style={styles.image}
            source={{uri: `${baseURL}${product.photos[0]}`}}
          />
        )}
        <View style={styles.info}>
          <Text
            style={[
              styles.title,
              product.photos[0] && {
                width: Dimensions.get('window').width - 180,
              },
            ]}>
            {product.name} de {product.flavor}
          </Text>
          <Text style={styles.details}>{product.amount} unidades</Text>
          <Text style={styles.details}>
            {parsePrice(product.price * product.amount)}
          </Text>
        </View>
      </View>
      {removeItem && (
        <View style={{width: '100%'}}>
          <CustomButton onPress={removeItem()}>Remover</CustomButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    // marginHorizontal: 5,
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
  row: {flexDirection: 'row'},
  image: {
    borderRadius: 100,
    marginRight: 20,
    height: 100,
    width: 100,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontFamily: 'FredokaOne-Regular',
    color: '#5c2f0c',
  },
  details: {
    fontSize: 20,
    color: '#5c2f0c',
  },
});
