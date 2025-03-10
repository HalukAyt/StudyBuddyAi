import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, View, ActivityIndicator, Alert, ScrollView } from 'react-native';
import api from '../api';
import { useNavigation } from '@react-navigation/native';

const NotesSummary = () => {
  const [note, setNote] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // navigation hook

  const handleSummarize = async () => {
    if (!note.trim()) {
      Alert.alert('Uyarı', 'Lütfen özetlenmesini istediğiniz notu girin.');
      return;
    }
  
    setLoading(true);
    try {
      const sanitizedNote = note.replace(/\r?\n/g, ' '); // Yeni satırları boşluk ile değiştir
  
      const response = await api.post('/notes/summarize', { note: sanitizedNote });
      setSummary(response.data.summary);
  
      // Kaydetme işlemi
      const saveResponse = await api.post('/notes/saveSummary', {
        note: sanitizedNote,
        summary: response.data.summary,
      });
  
      if (saveResponse.status === 200) {
        Alert.alert('Başarı', 'Özet başarıyla kaydedildi.');
        // Kaydedilen notu göstermek için sayfayı güncelle
     
      }
    } catch (error) {
      console.error('Summarization Error:', error);
      Alert.alert('Hata', 'Özetleme işlemi sırasında bir hata oluştu.');
    }
    setLoading(false);
  };
  

  return (
    <SafeAreaView className="flex-1 bg-gray-900 p-5">
      <View className="flex-1">
        <Text className="text-white text-2xl font-bold mb-4">Not Özetleme</Text>
        <ScrollView>
          <TextInput
            placeholder="Buraya notunuzu yazın..."
            value={note}
            onChangeText={setNote}
            multiline
            className="w-full p-4 bg-gray-700 text-white rounded-lg mb-4"
          />
        </ScrollView>
        <TouchableOpacity
          onPress={handleSummarize}
          className="bg-blue-500 py-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">Özetle</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#ffffff" />}

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
