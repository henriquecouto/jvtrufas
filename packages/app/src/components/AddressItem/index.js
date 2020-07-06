import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../CustomButton';

export default function AddressItem({
  street,
  neighborhood,
  landmark,
  remove,
  type = 'default',
}) {
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <Icon name="map-pin" size={30} color="#fff" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.street}>{street}</Text>
          <Text style={styles.info}>{neighborhood}</Text>
          <Text style={styles.info}>{landmark}</Text>
        </View>
      </View>
      {type === 'default' && (
        <View style={{width: '100%'}}>
          <CustomButton onPress={remove}>Remover</CustomButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
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
  row: {flexDirection: 'row', alignItems: 'flex-start'},
  icon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#ff6600',
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  street: {
    color: '#5c2f0c',
    fontSize: 25,
    fontFamily: 'FredokaOne-Regular',
  },
  info: {
    fontSize: 20,
    // fontFamily: 'FredokaOne-Regular',
    color: '#5c2f0c',
  },
});
