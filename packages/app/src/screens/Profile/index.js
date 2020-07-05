import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {GlobalContext} from '../../contexts/global';
import {TouchableHighlight} from 'react-native-gesture-handler';
import ProfileItem from '../../components/ProfileItem';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import LargeButton from '../../components/LargeButton';

export default function Profile({navigation}) {
  const [{auth}, actions] = useContext(GlobalContext);

  if (!auth.token) {
    return (
      <View style={styles.root}>
        <LargeButton
          onPress={() => navigation.push('SignIn')}
          title="Você ainda não está conectado 😕"
          subtitle="Entre agora!"
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Header title="Meu perfil" />
        <ProfileItem value={auth.user.name} icon="user" name="Nome" />
        <ProfileItem value={auth.user.email} icon="mail" name="Email" />
        <ProfileItem value={auth.user.whatsapp} icon="phone" name="WhatsApp" />
        <CustomButton onPress={actions.logout}>Sair</CustomButton>
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
  button: {
    marginVertical: 10,
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
  },
  buttonText: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
