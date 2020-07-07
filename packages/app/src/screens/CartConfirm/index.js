import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {GlobalContext} from '../../contexts/global';
import {ScrollView} from 'react-native-gesture-handler';
import AddressItem from '../../components/AddressItem';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather';
import ProductCart from '../../components/ProductCart';
import parsePrice from '../../helpers/parsePrice';
import api from '../../../api';

export default function CartConfirm({navigation}) {
  const [{cart, auth}, actions] = useContext(GlobalContext);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState('instant');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let result = 0;
    for (let i in cart.items) {
      result += cart.items[i].price * cart.items[i].amount;
    }
    setTotal(result);
  }, [cart.items]);

  const handleType = (value) => {
    if (value === 'instant') {
      setDate(new Date());
    }
    setType(value);
  };

  const makeOrder = async () => {
    try {
      const order = cart;
      order.type = type;
      order.deliveryDate = date;
      order.status = 'waiting';
      order.purchaserId = auth.user._id;

      const {data} = await api.post('/purchaser/order', order, {
        headers: {Authorization: `Bearer ${auth.token}`},
      });

      console.log(data.order);

      actions.clearCart();
      navigation.navigate('Home');
    } catch (error) {
      console.log('error create order: ', error.response.data);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.root}>
        <Text style={styles.title}>Entrega</Text>
        <View style={styles.input}>
          <Picker selectedValue={type} onValueChange={handleType}>
            <Picker.Item label="Hoje" value="instant" />
            <Picker.Item label="Selecionar data" value="scheduled" />
          </Picker>
        </View>
        <View style={styles.divider} />
        <Text style={styles.title}>Pedido</Text>
        {cart.items &&
          cart.items.map((item, index) => {
            return <ProductCart product={item} key={item._id + index} />;
          })}
        <View style={styles.divider} />
        <Text style={styles.title}>Endereço</Text>
        <AddressItem {...cart.address} />
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton type="custom" onPress={makeOrder}>
          <View style={styles.buttonNext}>
            <Text style={styles.buttonText}>Pedir agora!</Text>
            <Text style={styles.buttonText}>{parsePrice(total)}</Text>
          </View>
        </CustomButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  divider: {
    width: '100%',
    height: 4,
    backgroundColor: '#5c2f0c',
    marginVertical: 15,
  },
  title: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 30,
    color: '#5c2f0c',
  },
  footer: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5c2f0c44',
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
  input: {
    backgroundColor: '#ff660044',
    borderRadius: 20,
    padding: 5,
    color: '#5c2f0c',
    marginVertical: 10,
  },
});
