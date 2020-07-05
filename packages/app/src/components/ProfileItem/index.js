import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ProfileItem({value, icon, name}) {
  return (
    <View style={styles.root}>
      <View style={styles.icon}>
        <Icon name={icon} size={30} color="#fff" />
      </View>
      <View>
        <Text>{name}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderColor: '#5c2f0c',
    backgroundColor: '#fff',
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
  icon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#ff6600',
    marginRight: 20,
  },
  value: {
    fontSize: 20,
    fontFamily: 'FredokaOne-Regular',
  },
});
