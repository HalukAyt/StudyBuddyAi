import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import api from '../api';

interface UserSummary {
  note: string;
  summary: string;
}

const notes: React.FC = () => {
  const [userSummaries, setUserSummaries] = useState<UserSummary[]>([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await api.get('/notes/getSummaries');
        setUserSummaries(response.data);
      } catch (error) {
        console.error('Error fetching summaries:', error);
      }
    };

    fetchSummaries();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#1F1F1F' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Notlarım</Text>

        <ScrollView>
          {userSummaries.map((summary, index) => (
            <View key={index} style={{ padding: 15, backgroundColor: '#2F2F2F', borderRadius: 8, marginBottom: 20 }}>
              <Text style={{ color: '#FFF', fontWeight: '600' }}>Not:</Text>
              <Text style={{ color: '#D3D3D3', marginTop: 10 }}>{summary.note}</Text>
              <Text style={{ color: '#FFF', fontWeight: '600', marginTop: 15 }}>Özet:</Text>
              <Text style={{ color: '#D3D3D3', marginTop: 10 }}>{summary.summary}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default notes;
