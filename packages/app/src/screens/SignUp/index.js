import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import {files} from 'jvtrufas-common/src/files';

import api from '../../../api';
import isValidEmail from '../../helpers/isValidEmail';
import {GlobalContext} from '../../contexts/global';
import CustomButton from '../../components/CustomButton';
import Error from '../../components/Error';
import {ScrollView} from 'react-native-gesture-handler';

const errorList = {
  'invalid user type': 'Tipo de usuário inválido',
  'email is required': 'Você precisa inserir seu email',
  'whatsapp is required': 'Você precisa inserir seu whatsapp',
  'name is required': 'Você precisa inserir seu nome',
  'password is required': 'Você precisa criar uma senha',
  'email already registered': 'Seu email já está cadastrado',
  'registration failed': 'Ocorreu um erro inesperado',
};

export default function SignUp({navigation}) {
  const [, actions] = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const register = async () => {
    LayoutAnimation.easeInEaseOut();
    if (!isValidEmail(email)) {
      setError('Você digitou um email inválido');
      return;
    }

    if (!password) {
      setError('Insira a sua senha');
      return;
    }

    if (!name) {
      setError('Insira o seu nome');
      return;
    }

    if (!whatsapp) {
      setError('Insira o seu Whatsapp');
      return;
    }

    try {
      setError(null);
      const {data} = await api.post('/auth/register', {
        email,
        password,
        whatsapp,
        name,
      });
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
      <ScrollView style={styles.root}>
        <View style={styles.header}>
          <Image source={files.logo} style={{width: 150, height: 150}} />
          <Text style={styles.title}>Trufas</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.subtitle}>Faça seu cadastro</Text>

          <View style={styles.form}>
            <Error message={error} />
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              autoCompleteType="name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Whatsapp"
              autoCompleteType="cc-number"
              textContentType="telephoneNumber"
              keyboardType="numeric"
              dataDetectorTypes="phoneNumber"
              maxLength={12}
              value={whatsapp}
              onChangeText={setWhatsapp}
            />
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
            <CustomButton onPress={register}>Cadastrar</CustomButton>
            <Text style={styles.terms}>
              Ao se cadastrar você concorda com nossos{' '}
              <Text
                onPress={() => {
                  navigation.navigate('Doc', {name: 'useTerms'});
                }}
                style={styles.link}>
                Termos de Uso
              </Text>{' '}
              e{' '}
              <Text
                onPress={() => {
                  navigation.navigate('Doc', {name: 'privacyPolicy'});
                }}
                style={styles.link}>
                Políticas de Privacidade
              </Text>
              .
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <CustomButton
            color="transparent"
            onPress={() => navigation.navigate('SignIn')}>
            Já tenho uma conta! 😁
          </CustomButton>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#5c2f0ccc',
    // minHeight: Dimensions.get('window').height - 38.5,
    paddingHorizontal: 20,
    // justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  link: {color: '#ff6600'},
  terms: {color: '#5c2f0c'},
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
