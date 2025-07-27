// customer/AreaSelection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const areas = ['Mangalore', 'Chikamagaluru', 'Mysuru', 'Hassan', 'Davangere'];

export default function AreaSelection() {
  const router = useRouter();

  const handleAreaSelect = (area: string) => {
    router.push({ pathname: '/customer/TechniciansByArea', params: { area } });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Area</Text>
      <FlatList
        data={areas}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => handleAreaSelect(item)}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  buttonText: { color: 'white', fontSize: 18, textAlign: 'center' },
});
