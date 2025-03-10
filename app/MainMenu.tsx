import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeToken } from '../auth'; // Token'ı silme fonksiyonunu import ediyoruz
import { Link, useRouter } from 'expo-router';

const studyIcon = require("../assets/images/study.png");
const notesIcon = require("../assets/images/notes.png");
const quizIcon = require("../assets/images/quiz.png");
const settingsIcon = require("../assets/images/settings.png");

type MainMenuProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const MainMenu: React.FC<MainMenuProps> = ({ navigation }) => {
  const router = useRouter(); // Sayfa yönlendirmeyi burada yapacağız
  const [userName, setUserName] = useState<string | null>(null);

  // Kullanıcı bilgilerini AsyncStorage'dan al
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName'); // Kullanıcı adını al
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error('Kullanıcı bilgisi alınamadı:', error);
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await removeToken(); // Token'ı sil
      await AsyncStorage.removeItem('userName'); // Kullanıcı adını da sil
      Alert.alert('Başarıyla Çıkış Yapıldı', 'Tekrar görüşmek üzere!');
      router.push('/login'); // Login sayfasına yönlendiriyoruz
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Çıkış Yapılamadı', 'Bir hata oluştu!');
    }
  };

  return (
    <SafeAreaView className="bg-slate-800 h-full">
      <ScrollView contentContainerClassName="h-full px-8 pt-10">
        
        {/* Kullanıcı Bilgisi */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="font-bold text-3xl text-white">StudyBuddy</Text>
          {userName && <Text className="text-white text-lg">Merhaba, {userName} 👋</Text>}
        </View>

        {/* Menü Seçenekleri */}
        <View className="space-y-6">
          <TouchableOpacity className="bg-blue-500 rounded-lg py-5 flex-row items-center justify-center mb-10" onPress={() => navigation.navigate('StudyPlan')}>
            <Image source={studyIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-semibold">Çalışma Planı</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-green-500 rounded-lg py-5 flex-row items-center justify-center mb-10" onPress={() => navigation.navigate('index')}>
            <Image source={notesIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-semibold">Not Özetleme</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-yellow-500 rounded-lg py-5 flex-row items-center justify-center mb-10" onPress={() => navigation.navigate('QuizFlashcards')}>
            <Image source={quizIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-semibold">Quiz & Flashcard</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-600 rounded-lg py-5 flex-row items-center justify-center mb-10" onPress={() => navigation.navigate('Settings')}>
            <Image source={settingsIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-semibold">Ayarlar</Text>
          </TouchableOpacity>
          <Link className='bg-white rounded-lg items-center justify-center py-5 flex-row text-center mb-10' href={"/NotesSummary"}>ÖZETLE</Link>
          <Link className='bg-white rounded-lg items-center justify-center py-5 flex-row text-center' href={"/notes"}>Notlarım</Link>

          {/* Çıkış Yap Butonu */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 rounded-lg py-5 flex-row items-center justify-center mt-6"
          >
            <Text className="text-white text-lg font-semibold">Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainMenu;
