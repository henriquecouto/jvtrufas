import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AddressItem from '../../components/AddressItem';
import {ScrollView} from 'react-native-gesture-handler';
import ProductCart from '../../components/ProductCart';
import parsePrice from '../../helpers/parsePrice';

const statuses = {
  waiting: 'Aguardando preparo',
  preparing: 'Sendo preparado',
  delivered: 'Pedido entregue',
  canceled: 'Pedido cancelado',
};

export default function OrderDetails({navigation, route}) {
  const [total, setTotal] = useState(0);

  const loadTotal = useCallback(() => {
    let result = 0;
    for (let i in route.params.order.items) {
      result +=
        route.params.order.items[i].price * route.params.order.items[i].amount;
    }
    setTotal(result);
  }, [route.params]);

  const loadTitle = useCallback(() => {
    navigation.setOptions({
      title: 'Pedido Nº ' + route.params.order.orderNumber,
    });
  }, [route.params, navigation]);

  useEffect(() => {
    loadTitle();
  }, [loadTitle]);

  useEffect(() => {
    loadTotal();
  }, [loadTotal]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.titleContainer}>
          <View style={styles.statusContainer}>
            <Text style={styles.title}>
              {statuses[route.params.order.status]}
            </Text>
            <View style={stylesStatus[route.params.order.status]} />
          </View>
          <View style={styles.divider} />
          <Text style={styles.title}>Detalhes</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Entrega:{' '}
              <Text style={styles.infoValue}>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(route.params.order.deliveryDate),
                )}
              </Text>
            </Text>
            <Text style={styles.info}>
              Realizado:{' '}
              <Text style={styles.infoValue}>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(route.params.order.registrationDate),
                )}
              </Text>
            </Text>
            <Text style={styles.info}>
              Valor: <Text style={styles.infoValue}>{parsePrice(total)}</Text>
            </Text>
          </View>
        </View>
        {/* {type === 'scheduled' && (
          <Text style={styles.date}>
            {new Intl.DateTimeFormat('pt-BR').format(date)}
          </Text>
        )} */}

        <View style={styles.divider} />
        <Text style={styles.title}>Endereço</Text>
        <AddressItem {...route.params.order.address} />
        <View style={styles.divider} />
        <Text style={styles.title}>Pedido</Text>
        {route.params.order.items.map((item, index) => {
          return <ProductCart product={item} key={item._id + index} />;
        })}
      </ScrollView>
      {/* <View style={styles.footer}>
        <CustomButton type="custom" onPress={makeOrder}>
          <View style={styles.buttonNext}>
            <Text style={styles.buttonText}>Pedir agora!</Text>
            <Text style={styles.buttonText}>{parsePrice(total)}</Text>
          </View>
        </CustomButton>
      </View> */}
    </>
  );
}

const stylesStatus = StyleSheet.create({
  waiting: {
    width: 20,
    height: 20,
    backgroundColor: '#D5B942',
    borderRadius: 20,
  },
  delivered: {
    width: 20,
    height: 20,
    backgroundColor: '#8FAD88',
    borderRadius: 20,
  },
  preparing: {
    width: 20,
    height: 20,
    backgroundColor: '#1B4079',
    borderRadius: 20,
  },
  canceled: {
    width: 20,
    height: 20,
    backgroundColor: '#B6244F',
    borderRadius: 20,
  },
});

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
  titleContainer: {
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 30,
    color: '#5c2f0c',
  },
  date: {
    fontSize: 20,
    color: '#5c2f0c',
    fontFamily: 'Roboto-Regular',
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
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  info: {
    fontSize: 20,
    color: '#5c2f0c',
  },
  infoValue: {
    fontFamily: 'FredokaOne-Regular',
    color: '#ff6600',
  },
});
