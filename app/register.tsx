import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, Alert, View } from 'react-native';
import { useRouter } from 'expo-router';
import { register } from '../api'; // API'deki register fonksiyonunu import ediyoruz

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Sayfalar arası yönlendirme

  const handleRegister = async () => {
    try {
      // Backend API'ye register isteği gönderiyoruz
      await register(email, password);

      Alert.alert('Kayıt Başarılı', 'Hesabınız oluşturuldu!');

      // Başarılı kayıt sonrası login sayfasına yönlendirme
      router.push('/login');
    } catch (error) {
      console.error('Register Error:', error);
      Alert.alert('Kayıt Başarısız', 'Email zaten kullanılıyor veya bir hata oluştu!');
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

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleRegister}
          className="w-full bg-green-500 py-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">Register</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity onPress={() => router.push('/login')} className="mt-4">
          <Text className="text-blue-400 text-center font-semibold">Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
