import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {GlobalContext} from '../../contexts/global';
import {FlatList} from 'react-native-gesture-handler';
import AddressItem from '../../components/AddressItem';
import api from '../../../api';

export default function AddressesHome() {
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
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-evenly',
    padding: 20,
  },
});
