import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import LargeButton from '../../components/LargeButton';

export default function Home() {
  return (
    <ScrollView>
      <View style={styles.root}>
        <Header title="JV Trufas" />
        <LargeButton
          header="Fazer encomenda"
          title="Deliciosas trufas e licores esperam por você! 😉"
          subtitle="Eu quero"
          onPress={() => {}}
        />
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
