import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';

export default function AboutHome({navigation}) {
  return (
    <ScrollView>
      <View style={styles.root}>
        <CustomButton
          onPress={() => navigation.navigate('Doc', {name: 'privacyPolicy'})}>
          Políticas de Privacidade
        </CustomButton>
        <CustomButton
          onPress={() => navigation.navigate('Doc', {name: 'useTerms'})}>
          Termos de Uso
        </CustomButton>
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
