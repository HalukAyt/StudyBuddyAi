import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, Alert, View } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../api'; // API'deki login fonksiyonunu import ediyoruz
import { storeToken } from '../auth'; // Token işlemleri için ayrı bir dosya

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Sayfalar arası yönlendirme

  const handleLogin = async () => {
    try {
      // Backend API'ye login isteği gönderiyoruz
      const response = await login(email, password);
      
      const { token } = response;

      if (token) {
        // Token'ı güvenli bir şekilde AsyncStorage'a kaydediyoruz
        await storeToken(token);

        Alert.alert('Giriş Başarılı', 'Hoş geldiniz!');

        // Başarılı girişte MainMenu sayfasına yönlendirme
        router.push('/MainMenu');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Giriş Başarısız', 'Email veya şifre hatalı!');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-800 p-5">
      <View className="flex-1 justify-center items-center">
        {/* Email Input */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full p-4 mb-4 bg-gray-700 text-white rounded-lg"
        />
        
        {/* Password Input */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="w-full p-4 mb-4 bg-gray-700 text-white rounded-lg"
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-blue-500 py-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">Log In</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity onPress={() => router.push('/register')} className="mt-4">
          <Text className="text-blue-400 text-center font-semibold">Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
