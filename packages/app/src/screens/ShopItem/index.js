import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {baseURL} from '../../../api';
import parsePrice from '../../helpers/parsePrice';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather';
import {GlobalContext} from '../../contexts/global';

export default function ShopItem({route, navigation}) {
  const {product} = route.params;
  const [{cart}, actions] = useContext(GlobalContext);
  const [quantity, setQuantity] = useState(1);

  const minus = () => {
    if (quantity > 1) {
      setQuantity((old) => old - 1);
    }
  };
  const plus = () => {
    setQuantity((old) => old + 1);
  };

  const add = () => {
    const item = product;
    item.amount = quantity;
    if (!cart.items) {
      const data = {};
      data.items = [item];
      actions.setCart(data);
    } else {
      const data = cart;
      data.items.push(item);
      actions.setCart(data);
    }
    navigation.pop();
    navigation.navigate('CartHome');
  };

  useEffect(() => {
    navigation.setOptions({title: `${product.name} de ${product.flavor}`});
  }, [product, navigation]);

  return (
    <>
      <ScrollView>
        <FlatList
          horizontal
          pagingEnabled
          data={product.photos}
          renderItem={({item}) => {
            return (
              <View>
                <Image
                  style={styles.photo}
                  source={{uri: `${baseURL}${item}`}}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item}
        />

        <View style={styles.body}>
          <Text style={styles.title}>
            {product.name} de {product.flavor}
          </Text>
          <Text style={styles.price}>
            {parsePrice(product.price)} (unidade)
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.changer}>
          <TouchableOpacity onPress={minus} style={styles.changerLeft}>
            <Icon name="minus" color="#5c2f0c" size={30} />
          </TouchableOpacity>
          <Text style={styles.changerText}>{quantity}</Text>
          <TouchableOpacity onPress={plus} style={styles.changerRight}>
            <Icon name="plus" color="#5c2f0c" size={30} />
          </TouchableOpacity>
        </View>
        <CustomButton type="custom" onPress={add}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Adicionar</Text>
            <Text style={[styles.buttonText, {fontFamily: 'Roboto-Regular'}]}>
              {parsePrice(product.price * quantity)}
            </Text>
          </View>
        </CustomButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 20,
    marginBottom: 160,
  },
  photo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width - 100,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 30,
    fontFamily: 'FredokaOne-Regular',
    color: '#5c2f0c',
  },
  price: {
    fontSize: 25,
    color: '#5c2f0c',
  },
  footer: {
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 160,
    backgroundColor: '#eee',
  },
  changer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: '#5c2f0c',
    borderRadius: 20,
    borderWidth: 2,
  },
  changerText: {
    flex: 1,
    padding: 10,
    color: '#5c2f0c',
    fontFamily: 'FredokaOne-Regular',
    fontSize: 25,
    textAlign: 'center',
    borderLeftColor: '#5c2f0c',
    borderLeftWidth: 2,
    borderRightColor: '#5c2f0c',
    borderRightWidth: 2,
  },
  changerLeft: {
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    padding: 10,
    flex: 1,
  },
  changerRight: {
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    padding: 10,
    flex: 1,
  },
  footerText: {
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
  },
});
