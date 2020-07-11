import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AddressItem from '../../components/AddressItem';
import {GlobalContext} from '../../contexts/global';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather';
import LargeButton from '../../components/LargeButton';

export default function SelectAddress({navigation}) {
  const [{auth, cart}, actions] = useContext(GlobalContext);

  useEffect(() => {
    if (!auth.user.addresses.length) {
      actions.setCartAddress(null);
    }
  }, [auth.user.addresses, actions]);

  if (!auth.user.addresses.length) {
    return (
      <View style={styles.root}>
        <LargeButton
          onPress={() => navigation.push('Addresses')}
          header="Ops..."
          title="Você não tem nenhum endereço cadastrado 😕"
          subtitle="Cadastre agora!"
        />
      </View>
    );
  }

  return (
    <>
      <FlatList
        contentContainerStyle={styles.root}
        data={auth.user.addresses}
        renderItem={({item, index}) => {
          return (
            <AddressItem
              selected={cart.address && item._id === cart.address._id}
              street={item.street}
              neighborhood={item.neighborhood}
              landmark={item.landmark}
              onPress={() => actions.setCartAddress(item)}
            />
          );
        }}
        keyExtractor={(item, index) => item._id + index}
      />
      {cart.address && cart.address._id && (
        <View style={styles.footer}>
          <CustomButton
            type="custom"
            onPress={() => navigation.navigate('CartConfirm')}>
            <View style={styles.buttonNext}>
              <Text style={styles.buttonText}>Confirmar pedido</Text>
              <Icon name="chevron-right" size={25} color="#fff" />
            </View>
          </CustomButton>
        </View>
      )}
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
