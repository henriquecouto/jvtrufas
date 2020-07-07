import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import parsePrice from '../../helpers/parsePrice';

const statuses = {
  waiting: 'Aguardando preparo',
  preparing: 'Sendo preparado',
  delivered: 'Pedido entregue',
  canceled: 'Pedido cancelado',
};

export default function OrderListItem({order}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let result = 0;
    for (let i in order.items) {
      result += order.items[i].price * order.items[i].amount;
    }
    setTotal(result);
  }, [order.items]);

  return (
    <TouchableHighlight onPress={() => {}} style={styles.root}>
      <>
        <View style={styles.infoContainer}>
          <Text style={styles.status}>
            <View style={stylesStatus[order.status]} />
            {statuses[order.status]}
          </Text>
          <Text style={styles.info}>
            Entrega:{' '}
            <Text style={styles.infoValue}>
              {new Intl.DateTimeFormat('pt-BR').format(
                new Date(order.deliveryDate),
              )}
            </Text>
          </Text>
          <Text style={styles.info}>
            Realizado:{' '}
            <Text style={styles.infoValue}>
              {new Intl.DateTimeFormat('pt-BR').format(
                new Date(order.registrationDate),
              )}
            </Text>
          </Text>
          <Text style={styles.info}>
            Valor: <Text style={styles.infoValue}>{parsePrice(total)}</Text>
          </Text>
        </View>
        <Text style={styles.number}>Nº {order.orderNumber}</Text>
      </>
    </TouchableHighlight>
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
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
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
  number: {
    fontSize: 30,
    fontFamily: 'FredokaOne-Regular',
    color: '#ff6600',
    textAlign: 'right',
  },
  infoContainer: {
    flex: 1,
  },
  status: {
    fontSize: 25,
    color: '#5c2f0c',
    fontFamily: 'FredokaOne-Regular',
  },
  info: {
    fontSize: 17,
    color: '#5c2f0c',
  },
  infoValue: {
    fontFamily: 'FredokaOne-Regular',
    color: '#ff6600',
  },
});
