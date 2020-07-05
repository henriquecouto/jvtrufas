import AsyncStorage from '@react-native-community/async-storage';

const setItem = async (name, data) => {
  await AsyncStorage.setItem(name, JSON.stringify(data));
};

const getItem = async (name) => {
  const value = await AsyncStorage.getItem(name);
  return JSON.parse(value || '{}');
};

export default {
  setItem,
  getItem,
};
