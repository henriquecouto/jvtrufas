import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import Header from '../../components/Header';

export default function Home() {
  return (
    <ScrollView>
      <View style={styles.root}>
        <Header title="JV Trufas" />
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
});
