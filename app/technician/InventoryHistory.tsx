import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function InventoryHistory() {
  const [history, setHistory] = useState<any[]>([]);

  const fetchHistory = async () => {
    try {
      const q = query(collection(db, 'inventory-history'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const list: any[] = [];

      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      setHistory(list);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📦 Inventory History</Text>

      {history.map((entry, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.user}>{entry.user}</Text>
          <Text style={entry.action === 'add' ? styles.actionAdd : styles.actionRemove}>
            {entry.action === 'add' ? '➕' : '➖'}
          </Text>
          <Text style={styles.item}>{entry.item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  user: {
    flex: 4,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },

  actionAdd: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a', // green
    textAlign: 'center',
  },

  actionRemove: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626', // red
    textAlign: 'center',
  },

  item: {
    flex: 3,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    color: '#1f2937',
  },
});
