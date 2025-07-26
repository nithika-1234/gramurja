import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

type Technician = {
  id: string;
  name: string;
  phone?: string;
  area: string;
  email?: string;
  rating?: number;
  projectsCompleted?: number;
  currentlyWorking?: boolean;
};

export default function TechniciansByArea() {
  const { area } = useLocalSearchParams<{ area: string }>();
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const q = query(collection(db, 'technicians'), where('area', '==', area));
        const querySnapshot = await getDocs(q);
        const techs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Technician[];
        setTechnicians(techs);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    fetchTechnicians();
  }, [area]);

  const renderItem = ({ item }: { item: Technician }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Name: {item.name || 'No Name'}</Text>
      <Text>Rating: {item.rating ?? 'Not Rated'}</Text>
      <Text>Completed Projects: {item.projectsCompleted ?? 0}</Text>
      <Text>Currently Working: {item.currentlyWorking ? 'Yes' : 'No'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Technicians in {area}</Text>
      <FlatList
        data={technicians}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No technicians found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
});
