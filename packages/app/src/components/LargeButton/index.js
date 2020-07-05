import React from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';

export default function LargeButton({onPress, header, title, subtitle}) {
  return (
    <TouchableHighlight style={styles.root} onPress={onPress}>
      <View>
        <Text style={styles.header}>{header}</Text>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#5c2f0c',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    flex: 1,
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    fontFamily: 'FredokaOne-Regular',
    color: '#fff',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    color: '#fff',
  },
  subtitle: {
    marginTop: 20,
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
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
