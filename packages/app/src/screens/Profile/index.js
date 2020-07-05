import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {GlobalContext} from '../../contexts/global';
import {TouchableHighlight} from 'react-native-gesture-handler';
import ProfileItem from '../../components/ProfileItem';

export default function Profile({navigation}) {
  const [{auth}] = useContext(GlobalContext);

  if (!auth.token) {
    return (
      <View style={styles.root}>
        <TouchableHighlight
          style={styles.makeLogin}
          onPress={() => navigation.push('Login')}>
          <View>
            <Text style={styles.makeLoginText}>
              Você ainda não está conectado 😕
            </Text>
            <Text style={styles.makeLoginCall}>Entre agora!</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.text}>Seu Perfil</Text>
        </View>
        <ProfileItem value={auth.user.name} icon="user" name="Nome" />
        <ProfileItem value={auth.user.email} icon="mail" name="Email" />
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
  header: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 50,
    fontFamily: 'FredokaOne-Regular',
    color: '#5c2f0c',
  },
  makeLogin: {
    backgroundColor: '#5c2f0c',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  makeLoginText: {
    fontSize: 20,
    fontFamily: 'FredokaOne-Regular',
    color: '#fff',
  },
  makeLoginCall: {
    marginTop: 20,
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
