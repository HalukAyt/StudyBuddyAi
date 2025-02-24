import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, View, ActivityIndicator, Alert, ScrollView } from 'react-native';
import api from '../api'; // API fonksiyonlarını içeren dosya

const NotesSummary = () => {
  const [note, setNote] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!note.trim()) {
      Alert.alert('Uyarı', 'Lütfen özetlenmesini istediğiniz notu girin.');
      return;
    }
  
    setLoading(true);
    try {
      // JSON içindeki \n karakterlerini \\n olarak kaçış karakteriyle değiştiriyoruz
      const sanitizedNote = note.replace(/\r?\n/g, ' '); // Yeni satırları boşluk ile değiştir
  
      const response = await api.post('/notes/summarize', { note: sanitizedNote });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Summarization Error:', error);
      Alert.alert('Hata', 'Özetleme işlemi sırasında bir hata oluştu.');
    }
    setLoading(false);
  };
  
  
  
  
  
  

  return (
    <SafeAreaView className="flex-1 bg-gray-900 p-5">
      <View className="flex-1">
        {/* Başlık */}
        <Text className="text-white text-2xl font-bold mb-4">Not Özetleme</Text>

        {/* Not Girişi */}
        <ScrollView>
        <TextInput
          placeholder="Buraya notunuzu yazın..."
          value={note}
          onChangeText={setNote}
          multiline
          className="w-full p-4 bg-gray-700 text-white rounded-lg mb-4"
        />
        </ScrollView>
        {/* Özetle Butonu */}
        <TouchableOpacity
          onPress={handleSummarize}
          className="bg-blue-500 py-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">Özetle</Text>
        </TouchableOpacity>

        {/* Yüklenme Göstergesi */}
        {loading && <ActivityIndicator size="large" color="#ffffff" />}

        {/* Özet Gösterimi */}
        {summary ? (
          <View className="mt-6 p-4 bg-gray-800 rounded-lg">
            <Text className="text-white font-semibold">Özet:</Text>
            <Text className="text-gray-300 mt-2">{summary}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default NotesSummary;
