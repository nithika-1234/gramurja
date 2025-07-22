import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useRouter } from 'expo-router';

export default function InventoryHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const q = query(collection(db, 'inventory-history'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const logs: any[] = [];

        snapshot.forEach((doc) => {
          logs.push(doc.data());
        });

        setHistory(logs);
      } catch (err) {
        console.error('Fetch history error:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📜 Inventory Action History</Text>
      <ScrollView>
        {history.map((entry, index) => {
          const isAdd = entry.action === 'add';
          return (
            <View
              key={index}
              style={[
                styles.logCard,
                { backgroundColor: isAdd ? '#E8F5E9' : '#FFEBEE' },
              ]}
            >
              <Text style={styles.time}>
                {entry.timestamp?.toDate().toLocaleString() || 'Unknown time'}
              </Text>
              <Text style={styles.details}>
                <Text style={{ fontWeight: 'bold' }}>{entry.user}</Text>{' '}
                {isAdd ? '➕ added' : '➖ removed'}{' '}
                <Text style={{ fontWeight: 'bold' }}>{entry.item}</Text>
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  logCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  time: { fontSize: 13, color: '#555', marginBottom: 6 },
  details: { fontSize: 15, color: '#333' },
  back: { marginTop: 20, textAlign: 'center', color: '#007BFF', fontSize: 16 },
});
