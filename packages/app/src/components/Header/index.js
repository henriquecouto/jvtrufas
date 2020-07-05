import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Header({title}) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 50,
    fontFamily: 'FredokaOne-Regular',
    color: '#5c2f0c',
  },
});
