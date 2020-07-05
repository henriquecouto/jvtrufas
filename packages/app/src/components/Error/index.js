import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Error({message}) {
  return (
    !!message && (
      <View style={styles.root}>
        <Text style={styles.message}>{message}</Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    backgroundColor: '#f002',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  message: {
    color: '#f00',
    fontSize: 15,
  },
});
