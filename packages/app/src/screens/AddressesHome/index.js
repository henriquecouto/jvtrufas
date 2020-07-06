import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {GlobalContext} from '../../contexts/global';
import {FlatList} from 'react-native-gesture-handler';
import AddressItem from '../../components/AddressItem';
import api from '../../../api';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather';

export default function AddressesHome({navigation}) {
  const [{auth}, actions] = useContext(GlobalContext);

  const remove = (id) => async () => {
    try {
      const {data} = await api.delete(`/purchaser/address/${id}`, {
        headers: {Authorization: `Bearer ${auth.token}`},
      });

      actions.updateAddresses(data.addresses);
    } catch (error) {
      console.log('error remove address: ', error);
    }
  };

  return (
    <>
      <FlatList
        contentContainerStyle={styles.root}
        data={auth.user.addresses}
        renderItem={({item, index}) => {
          return (
            <AddressItem
              street={item.street}
              neighborhood={item.neighborhood}
              landmark={item.landmark}
              remove={remove(item._id)}
            />
          );
        }}
        keyExtractor={(item, index) => item._id + index}
      />
      <View style={styles.footer}>
        <CustomButton
          type="custom"
          onPress={() => navigation.navigate('AddAddress')}>
          <View style={styles.buttonNext}>
            <Text style={styles.buttonText}>Adicionar endereço</Text>
            <Icon name="plus" size={25} color="#fff" />
          </View>
        </CustomButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-evenly',
    padding: 20,
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
});
