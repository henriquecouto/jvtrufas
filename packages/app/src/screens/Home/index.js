import React, {useContext} from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import Header from '../../components/Header';
import LargeButton from '../../components/LargeButton';
import {GlobalContext} from '../../contexts/global';

export default function Home({navigation}) {
  const [{cart, orders}] = useContext(GlobalContext);

  return (
    <ScrollView>
      <View style={styles.root}>
        <Header title="JV Trufas" />
        <LargeButton
          header="Fazer encomenda"
          title="Deliciosas trufas e licores esperam por você! 😉"
          subtitle="Eu quero"
          onPress={() => navigation.navigate('Shop')}
        />
        {cart.items && (
          <LargeButton
            header="Seu carrinho 🛒"
            title={`Você tem ${cart.items.length} ${
              cart.items.length > 1 ? 'itens prontos' : 'item pronto'
            } para pedir`}
            subtitle="Ver agora"
            onPress={() => navigation.navigate('CartHome')}
          />
        )}
        <Text>{orders.length}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    padding: 20,
    justifyContent: 'space-evenly',
  },
});
