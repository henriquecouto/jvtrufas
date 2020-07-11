import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';

import api from '../../../api';
import isValidEmail from '../../helpers/isValidEmail';
import {GlobalContext} from '../../contexts/global';
import CustomButton from '../../components/CustomButton';
import Error from '../../components/Error';

import {project} from 'jvtrufas-common';
import {ScrollView} from 'react-native-gesture-handler';

const errorList = {
  'user not found': 'Você não está cadastrado',
  'invalid password': 'Sua senha está errada',
  'login failed': 'Ocorreu um erro inesperado',
};

export default function SignIn({navigation}) {
  const [, actions] = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = async () => {
    if (!isValidEmail(email)) {
      setError('Você digitou um email inválido');
      return;
    }

    if (!password) {
      setError('Insira a sua senha');
      return;
    }

    try {
      setError(null);
      const {data} = await api.post('/auth/login', {email, password});
      actions.login(data);
      navigation.navigate('Home');
    } catch (err) {
      setError(errorList[err.response.data.message]);
      console.log('login error: ', err.response.data.message);
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../../assets/images/truffles.jpg')}
        style={styles.image}>
        <View style={styles.root}>
          <View style={styles.header}>
            <Image source={project.logo} style={{width: 150, height: 150}} />
            <Text style={styles.title}>Trufas</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.subtitle}>Entre e faça seu pedido</Text>

            <View style={styles.form}>
              <Error message={error} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCompleteType="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Senha"
                autoCompleteType="password"
                value={password}
                onChangeText={setPassword}
              />
              <CustomButton onPress={login}>Entrar</CustomButton>
            </View>
          </View>
          <View style={styles.footer}>
            <CustomButton
              color="transparent"
              onPress={() => navigation.push('SignUp')}>
              Cadastre-se
            </CustomButton>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#5c2f0ccc',
    height: Dimensions.get('window').height,
    padding: 20,
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: -30,
  },
  body: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: 'FredokaOne-Regular',
    color: '#fff',
    marginLeft: -35,
  },
  subtitle: {
    fontSize: 25,
    fontFamily: 'FredokaOne-Regular',
    color: '#ff6600',
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
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
  footer: {
    alignItems: 'center',
  },
});
