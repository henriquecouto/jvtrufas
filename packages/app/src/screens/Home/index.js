import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default function Home() {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.text}>JV Trufas</Text>
      </View>
    </ScrollView>
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
