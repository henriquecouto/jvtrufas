import React from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Text, StyleSheet} from 'react-native';

export default function CustomButton({onPress, color = 'primary', children}) {
  return (
    <TouchableHighlight style={styles[color]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  primary: {
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
  transparent: {
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
});
