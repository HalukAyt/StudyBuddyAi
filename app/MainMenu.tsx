import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React from 'react';
import { removeToken } from '../auth'; // Token'ı silme fonksiyonunu import ediyoruz
import { useRouter } from 'expo-router';

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

  const handleLogout = async () => {
    try {
      // Token'ı silme işlemi
      await removeToken();
      Alert.alert('Başarıyla Çıkış Yapıldı', 'Tekrar görüşmek üzere!');
      router.push('/login'); // Login sayfasına yönlendiriyoruz
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Çıkış Yapılamadı', 'Bir hata oluştu!');
    }
  };

  return (
    <SafeAreaView className="bg-slate-800 h-full">
      <ScrollView contentContainerClassName='h-full px-8 pt-10'>
        {/* Uygulama Başlığı */}
        <Text className="font-bold text-3xl text-white text-center mb-6">StudyBuddy</Text>
        
        {/* Menü Seçenekleri */}
        <View className="space-y-6">
          <TouchableOpacity className="bg-blue-500 rounded-lg py-5 flex-row items-center justify-center" onPress={() => navigation.navigate('StudyPlan')}>
            <Image source={studyIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-semibold">Çalışma Planı</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-green-500 rounded-lg py-5 flex-row items-center justify-center" onPress={() => navigation.navigate('NotesSummary')}>
            <Image source={notesIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-semibold">Not Özetleme</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-yellow-500 rounded-lg py-5 flex-row items-center justify-center" onPress={() => navigation.navigate('QuizFlashcards')}>
            <Image source={quizIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-semibold">Quiz & Flashcard</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-600 rounded-lg py-5 flex-row items-center justify-center" onPress={() => navigation.navigate('Settings')}>
            <Image source={settingsIcon} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-semibold">Ayarlar</Text>
          </TouchableOpacity>

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
