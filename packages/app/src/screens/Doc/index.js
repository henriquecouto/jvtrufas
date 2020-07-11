import React, {useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {baseURL} from '../../../api';

const docs = {
  privacyPolicy: {
    url: `${baseURL}/politicas-de-privacidade`,
    name: 'Políticas de Privacidade',
  },
  useTerms: {url: `${baseURL}/termos-de-uso`, name: 'Termos de Uso'},
};

export default function Doc({route, navigation}) {
  useEffect(() => {
    navigation.setOptions({title: docs[route.params.name].name});
  }, [navigation, route]);

  return <WebView source={{uri: docs[route.params.name].url}} />;
}
