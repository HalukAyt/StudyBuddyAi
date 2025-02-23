// import React, { useState } from 'react';
// import { SafeAreaView, TextInput, TouchableOpacity, Text, Alert, View } from 'react-native';
// import { verifyEmail } from '../api'; // API'den verifyEmail fonksiyonu

// const Verification = ({ route, navigation }: any) => {
//   const { email } = route.params;  // Kullanıcının emailini alıyoruz
//   const [verificationCode, setVerificationCode] = useState('');

//   const handleVerify = async () => {
//     try {
//       const response = await verifyEmail(email, verificationCode);
//       Alert.alert("Başarıyla Doğrulandı", "Hesabınız başarıyla doğrulandı.");
//       navigation.navigate('Login'); // Doğrulama başarılı, Login ekranına yönlendir
//     } catch (error) {
//       console.error('Verification Error:', error);
//       Alert.alert('Doğrulama Hatası', 'Geçersiz doğrulama kodu.');
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 justify-center bg-gray-800 p-5">
//       <View>
//         <TextInput
//           placeholder="6 Haneli Doğrulama Kodu"
//           value={verificationCode}
//           onChangeText={setVerificationCode}
//           keyboardType="numeric"
//           className="w-full p-4 mb-4 bg-gray-700 text-white rounded-lg"
//         />

//         <TouchableOpacity
//           onPress={handleVerify}
//           className="w-full bg-green-500 py-3 rounded-lg mb-4"
//         >
//           <Text className="text-white text-center font-semibold text-lg">Doğrula</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Verification;
