import React from 'react';
import {Text, StyleSheet, View, Dimensions, Image, Button} from 'react-native';
import parsePrice from '../../helpers/parsePrice';
import {baseURL} from '../../../api';

export default function ProductCart({product, removeItem}) {
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
        <Button onPress={removeItem()} title="Remover" />
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
    color: '#5c2f0c',
  },
  details: {
    fontSize: 20,
    color: '#5c2f0c',
  },
});
