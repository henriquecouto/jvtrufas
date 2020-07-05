import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import api from '../../../api';
import isValidEmail from '../../helpers/isValidEmail';
import {GlobalContext} from '../../contexts/global';

const errorList = {
  'user not found': 'Você não está cadastrado',
  'invalid password': 'Sua senha está errada',
  'login failed': 'Ocorreu um erro inesperado',
};

export default function Home({navigation}) {
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
    <ImageBackground
      source={require('../../../assets/images/truffles.jpg')}
      style={styles.image}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}>JV Trufas</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.subtitle}>Entre e faça seu pedido</Text>

          <View style={styles.form}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>{error}</Text>
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCompleteType="email"
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
            <TouchableHighlight style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.buttonSecondary} onPress={() => {}}>
            <Text style={styles.buttonText}>Cadastre-se</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#5c2f0ccc',
    height: '100%',
    padding: 20,
    justifyContent: 'space-evenly',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  body: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontSize: 50,
    fontFamily: 'FredokaOne-Regular',
    color: '#fff',
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
  buttonSecondary: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
  },
  errorContainer: {
    marginVertical: 10,
    backgroundColor: '#f002',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  error: {
    color: '#f00',
    fontSize: 15,
  },
});
