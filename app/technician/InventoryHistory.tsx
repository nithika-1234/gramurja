// import { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { db } from '../../firebase/config';

// export default function InventoryHistory() {
//   const [history, setHistory] = useState<any[]>([]);

//   const fetchHistory = async () => {
//     try {
//       const q = query(collection(db, 'inventory-history'), orderBy('timestamp', 'desc'));
//       const snapshot = await getDocs(q);
//       const list: any[] = [];

//       snapshot.forEach((doc) => {
//         list.push({ id: doc.id, ...doc.data() });
//       });

//       setHistory(list);
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>📦 Inventory History</Text>

//       {history.map((entry, index) => (
//         <View key={index} style={styles.card}>
//           <Text style={styles.user}>{entry.user}</Text>
//           <Text style={entry.action === 'add' ? styles.actionAdd : styles.actionRemove}>
//             {entry.action === 'add' ? '➕' : '➖'}
//           </Text>
//           <Text style={styles.item}>{entry.item}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//     padding: 20,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginBottom: 24,
//     color: '#333',
//   },

//   card: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#F3F4F6',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 14,
//     marginBottom: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 2,
//   },

//   user: {
//     flex: 4,
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#374151',
//   },

//   actionAdd: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#16a34a', // green
//     textAlign: 'center',
//   },

//   actionRemove: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#dc2626', // red
//     textAlign: 'center',
//   },

//   item: {
//     flex: 3,
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'right',
//     color: '#1f2937',
//   },
// });
// Your imports remain the same









//Correct Output
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase/config'; // ✅ use auth from config.ts

// ✅ Type definition for inventory history item
type InventoryHistoryItem = {
  itemName: string;
  action: 'added' | 'removed';
  previousQuantity: number;
  newQuantity: number;
  timestamp: string;
  technicianId: string;
};

export default function InventoryHistory() {
  const [history, setHistory] = useState<InventoryHistoryItem[]>([]);

  useEffect(() => {
    const technicianId = auth.currentUser?.uid;
    if (!technicianId) return;

    const fetchHistory = async () => {
      try {
        const q = query(
          collection(db, 'inventory_history'),
          where('technicianId', '==', technicianId)
        );
        const querySnapshot = await getDocs(q);
        const data: InventoryHistoryItem[] = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            itemName: docData.itemName,
            action: docData.action,
            previousQuantity: docData.previousQuantity,
            newQuantity: docData.newQuantity,
timestamp: docData.timestamp && typeof docData.timestamp.toDate === 'function'
  ? docData.timestamp.toDate().toLocaleString()
  : (typeof docData.timestamp === 'string' ? docData.timestamp : 'No date'),
            technicianId: docData.technicianId,
          };
        });
        setHistory(data);
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchHistory();
  }, []);

  const renderItem = ({ item }: { item: InventoryHistoryItem }) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>{item.itemName}</Text>
      <Text style={{ color: item.action === 'added' ? '#2E7D32' : '#C62828' }}>
        {item.action === 'added' ? '➕ Added' : '➖ Removed'}
      </Text>
      <Text>{item.previousQuantity} → {item.newQuantity}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory History</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noHistory}>No history found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F6FA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  noHistory: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
