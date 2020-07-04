import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Home() {
  return (
    <View>
      <Text style={styles.text}>JV Trufas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    fontFamily: 'FredokaOne-Regular',
  },
});
