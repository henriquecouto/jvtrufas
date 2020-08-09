import React, {useState, useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import api from '../../../api';
import {GlobalContext} from '../../contexts/global';

export default function AddAddress({navigation}) {
  const [{auth}, actions] = useContext(GlobalContext);

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [landmark, setLandmark] = useState('');

  const add = async () => {
    try {
      const {data} = await api.post(
        '/purchaser/address',
        {
          street: `${street}, ${number}`,
          neighborhood,
          landmark,
        },
        {headers: {Authorization: `Bearer ${auth.token}`}},
      );

      actions.updateAddresses(data.addresses);
      navigation.pop();
    } catch (error) {
      console.log('error on add address: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <TextInput
        placeholder="Nome da rua"
        value={street}
        onChangeText={setStreet}
        style={styles.input}
        maxLength={80}
      />
      <TextInput
        placeholder="Número"
        value={number}
        onChangeText={setNumber}
        style={styles.input}
        keyboardType="visible-password"
        maxLength={18}
      />
      <TextInput
        placeholder="Nome do bairro"
        value={neighborhood}
        onChangeText={setNeighborhood}
        style={styles.input}
        maxLength={50}
      />
      <TextInput
        placeholder="Ponto de referência"
        value={landmark}
        onChangeText={setLandmark}
        style={styles.input}
        maxLength={50}
      />
      <Text style={styles.input}>Lajedo-PE</Text>
      <CustomButton onPress={add}>Adicionar</CustomButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  input: {
    backgroundColor: '#ff660044',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    borderRadius: 20,
    padding: 15,
    color: '#5c2f0c',
    marginVertical: 10,
  },
});
