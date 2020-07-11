import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import LargeButton from '../../components/LargeButton';
const {project} = require('jvtrufas-common');

export default function AboutHome({navigation}) {
  return (
    <ScrollView>
      <View style={styles.root}>
        <LargeButton
          header="Desenvolvimento"
          title={`O aplicativo ${project.name} é mantido com ❤ por ${project.author.name}.`}
          subtitle="Ver site"
          onPress={() => Linking.openURL(`https://${project.author.url}`)}
        />
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
