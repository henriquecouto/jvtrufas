import React, {useContext, useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import {TextInputMask, MaskService} from 'react-native-masked-text';

import {GlobalContext} from '../../contexts/global';
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import AddressItem from '../../components/AddressItem';
import CustomButton from '../../components/CustomButton';
import ProductCart from '../../components/ProductCart';
import parsePrice from '../../helpers/parsePrice';
import api from '../../../api';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

const minimumDate = new Date();
minimumDate.setDate(minimumDate.getDate() + 10);

export default function CartConfirm({navigation}) {
  const [{cart, auth}, actions] = useContext(GlobalContext);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date());
  const [observation, setObservation] = useState(false);
  const [change, setChange] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeInstant, setActiveInstant] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [needChange, setNeedChange] = useState(false);

  const loadActiveInstant = useCallback(async () => {
    const {data} = await api.get('/purchaser/order/get-instant', {
      headers: {Authorization: `Bearer ${auth.token}`},
    });
    setActiveInstant(data.active);
  }, [auth.token]);

  useEffect(() => {
    let result = 0;
    for (let i in cart.items) {
      result += cart.items[i].price * cart.items[i].amount;
    }
    setTotal(result);
  }, [cart.items]);

  useEffect(() => {
    loadActiveInstant();
  }, [loadActiveInstant]);

  const handleType = (value) => {
    if (value === 'instant') {
      setDate(new Date());
    } else {
      setDate(minimumDate);
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
      order.observation = observation || undefined;
      order.change = needChange
        ? MaskService.toRawValue('money', change)
        : undefined;

      const {data} = await api.post('/purchaser/order', order, {
        headers: {Authorization: `Bearer ${auth.token}`},
      });

      actions.clearCart();
      actions.addOrder(data.order);

      if (data.order.type === 'scheduled') {
        setConfirmModal(true);
      } else {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
      console.log('error create order: ', error.response.data);
    }
  };

  const closeModal = () => {
    setConfirmModal(false);
    navigation.navigate('Home');
  };

  return (
    <>
      <Modal isVisible={confirmModal} onBackButtonPress={closeModal}>
        <View style={styles.modal}>
          <Text style={styles.title}>Fazer pedido</Text>
          <View style={styles.divider} />
          <Text style={styles.contentModal}>
            Caso deseje, você poderá cancelar o seu pedido em até 2 dias antes
            da data de entrega
          </Text>
          <View style={styles.divider} />
          <View style={styles.footerModal}>
            <Button color="#ff6600" onPress={closeModal} title="Ok" />
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Entrega</Text>
          <View style={styles.checkbox}>
            {activeInstant && (
              <TouchableWithoutFeedback
                style={styles.checkbox}
                onPress={() => handleType('instant')}>
                <CheckBox
                  tintColors={{true: '#ff6600'}}
                  value={type === 'instant'}
                />
                <Text>Hoje</Text>
              </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback
              style={styles.checkbox}
              onPress={() => handleType('scheduled')}>
              <CheckBox
                tintColors={{true: '#ff6600'}}
                value={type === 'scheduled'}
              />
              <Text>Agendar</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {type === 'scheduled' && (
          <Text style={styles.date}>
            {new Intl.DateTimeFormat('pt-BR').format(date)}
          </Text>
        )}

        {/* <View style={styles.input}>
          <Picker selectedValue={type} onValueChange={handleType}>
          <Picker.Item label="Hoje" value="instant" />
          <Picker.Item label="Agendar" value="scheduled" />
          </Picker>
        </View> */}

        {type === 'scheduled' && (
          <CustomButton onPress={() => setShowDatePicker(true)}>
            Selecionar data
          </CustomButton>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            minimumDate={minimumDate}
            onChange={(event, value) => {
              setShowDatePicker(false);
              setDate(value);
            }}
          />
        )}
        <View style={styles.divider} />
        <Text style={styles.title}>Endereço</Text>
        <AddressItem {...cart.address} />

        <View style={styles.divider} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Troco</Text>
          <View style={styles.checkbox}>
            <TouchableWithoutFeedback
              style={styles.checkbox}
              onPress={() => setNeedChange(true)}>
              <CheckBox tintColors={{true: '#ff6600'}} value={needChange} />
              <Text>Sim</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.checkbox}
              onPress={() => setNeedChange(false)}>
              <CheckBox tintColors={{true: '#ff6600'}} value={!needChange} />
              <Text>Não</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {needChange && (
          <TextInputMask
            autoFocus
            type="money"
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            placeholder="Precisa de troco para quanto?"
            style={styles.observation}
            value={change}
            onChangeText={setChange}
            keyboardType="number-pad"
          />
        )}

        <View style={styles.divider} />
        <Text style={styles.title}>Observação</Text>
        <TextInput
          placeholder="Se desejar adicione uma observação ao seu pedido"
          style={styles.observation}
          numberOfLines={3}
          multiline
          textAlignVertical="top"
          maxLength={100}
          onChangeText={setObservation}
        />

        <View style={styles.divider} />
        <Text style={styles.title}>Pedido</Text>
        {cart.items &&
          cart.items.map((item, index) => {
            return <ProductCart product={item} key={item._id + index} />;
          })}
      </ScrollView>
      {!!type && (
        <View style={styles.footer}>
          {total >= 7.5 ? (
            <CustomButton type="custom" onPress={makeOrder}>
              <View style={styles.buttonNext}>
                <Text style={styles.buttonText}>Pedir agora!</Text>
                <Text style={styles.buttonText}>{parsePrice(total)}</Text>
              </View>
            </CustomButton>
          ) : (
            <CustomButton type="custom">
              <View style={styles.buttonNext}>
                <Text style={styles.buttonText}>
                  O pedido mínimo é de 3 trufas!
                </Text>
              </View>
            </CustomButton>
          )}
        </View>
      )}
    </>
  );
}

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
  divider: {
    width: '100%',
    height: 4,
    backgroundColor: '#5c2f0c',
    marginVertical: 15,
  },
  titleContainer: {
    flexDirection: 'row',
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
    flexWrap: 'wrap',
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
  observation: {
    backgroundColor: '#ff660044',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    borderRadius: 20,
    padding: 15,
    color: '#5c2f0c',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
});
