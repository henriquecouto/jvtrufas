import React, {useEffect, useCallback, useState, useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import AddressItem from '../../components/AddressItem';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import ProductCart from '../../components/ProductCart';
import parsePrice from '../../helpers/parsePrice';
import CustomButton from '../../components/CustomButton';
import api from '../../../api';
import {GlobalContext} from '../../contexts/global';

const statuses = {
  waiting: 'Aguardando preparo',
  preparing: 'Sendo preparado',
  delivered: 'Pedido entregue',
  canceled: 'Pedido cancelado',
};

const priceToCancelable = 50,
  daysToCancelable = 86400000 * 2;

export default function OrderDetails({navigation, route}) {
  const [{auth}, actions] = useContext(GlobalContext);
  const [order, setOrder] = useState(route.params.order);
  const [total, setTotal] = useState(0);
  const [cancelable, setCancelable] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const loadTotal = useCallback(() => {
    let result = 0;
    for (let i in order.items) {
      result += order.items[i].price * order.items[i].amount;
    }
    setTotal(result);
  }, [order.items]);

  const loadTitle = useCallback(() => {
    navigation.setOptions({
      title: 'Pedido Nº ' + order.orderNumber,
    });
  }, [order.orderNumber, navigation]);

  const toggleConfirmCancel = () => {
    setConfirmCancel((old) => !old);
  };

  const cancel = async () => {
    toggleConfirmCancel();
    try {
      const {data} = await api.delete(`/purchaser/order/${order._id}`, {
        headers: {Authorization: `Bearer ${auth.token}`},
      });
      actions.updateOrder(data.order);
      setOrder(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTitle();
  }, [loadTitle]);

  useEffect(() => {
    loadTotal();
  }, [loadTotal]);

  useEffect(() => {
    if (total) {
      const deliveryDate = new Date(order.deliveryDate).getTime();
      const now = Date.now();

      if (order.status !== 'canceled') {
        if (
          order.type === 'scheduled' &&
          total >= priceToCancelable &&
          deliveryDate - now <= daysToCancelable
        ) {
          setCancelable(false);
        } else if (order.type === 'instant' && order.status !== 'waiting') {
          setCancelable(false);
        } else {
          setCancelable(true);
        }
      }
    }
  }, [total, order]);

  return (
    <>
      <Modal isVisible={confirmCancel} onBackButtonPress={toggleConfirmCancel}>
        <View style={styles.modal}>
          <Text style={styles.title}>Cancelar</Text>
          <View style={styles.divider} />
          <Text style={styles.contentModal}>
            Deseja confirmar o cancelamento do pedido Nº {order.orderNumber}?
          </Text>
          <View style={styles.divider} />
          <View style={styles.footerModal}>
            <View style={styles.buttonModalLeft}>
              <Button color="#5c2f0c" onPress={cancel} title="Sim" />
            </View>
            <View style={styles.buttonModalRight}>
              <Button
                color="#ff6600"
                onPress={toggleConfirmCancel}
                title="Não"
              />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.titleContainer}>
          <View style={styles.statusContainer}>
            <Text style={styles.title}>{statuses[order.status]}</Text>
            <View style={stylesStatus[order.status]} />
          </View>
          <View style={styles.divider} />
          <Text style={styles.title}>Detalhes</Text>
          <View style={styles.infoContainer}>
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
        </View>

        <View style={styles.divider} />
        <Text style={styles.title}>Endereço</Text>
        <AddressItem {...order.address} />

        {order.observation && (
          <>
            <View style={styles.divider} />
            <Text style={styles.title}>Observação</Text>
            <Text style={styles.info}>{order.observation}</Text>
          </>
        )}

        <View style={styles.divider} />
        <Text style={styles.title}>Pedido</Text>
        {order.items.map((item, index) => {
          return <ProductCart product={item} key={item._id + index} />;
        })}
      </ScrollView>
      {cancelable && (
        <View style={styles.footer}>
          <CustomButton onPress={toggleConfirmCancel}>
            Cancelar pedido
          </CustomButton>
        </View>
      )}
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
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  contentModal: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    color: '#ff6600',
  },
  footerModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonModalLeft: {flex: 1, marginRight: 10},
  buttonModalRight: {flex: 1, marginLeft: 10},
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
