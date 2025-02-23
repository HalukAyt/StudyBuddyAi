import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Token Storage Error:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('Get Token Error:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Remove Token Error:', error);
  }
};
