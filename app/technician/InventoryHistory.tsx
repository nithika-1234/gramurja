// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';
// import { auth, db } from '../../firebase/config'; // ✅ use auth from config.ts


// // ✅ Type definition for inventory history item
// type InventoryHistoryItem = {
//   itemName: string;
//   action: 'added' | 'removed';
//   previousQuantity: number;
//   newQuantity: number;
//   timestamp: string;
//   technicianId: string;
// };


// export default function InventoryHistory() {
//   const [history, setHistory] = useState<InventoryHistoryItem[]>([]);


//   useEffect(() => {
//     const technicianId = auth.currentUser?.uid;
//     if (!technicianId) return;


//     const fetchHistory = async () => {
//       try {
//         const q = query(
//           collection(db, 'inventory_history'),
//           where('technicianId', '==', technicianId)
//         );
//         const querySnapshot = await getDocs(q);
//         const data: InventoryHistoryItem[] = querySnapshot.docs.map(doc => {
//           const docData = doc.data();
//           return {
//             itemName: docData.itemName,
//             action: docData.action,
//             previousQuantity: docData.previousQuantity,
//             newQuantity: docData.newQuantity,
// timestamp: docData.timestamp && typeof docData.timestamp.toDate === 'function'
//   ? docData.timestamp.toDate().toLocaleString()
//   : (typeof docData.timestamp === 'string' ? docData.timestamp : 'No date'),
//             technicianId: docData.technicianId,
//           };
//         });
//         setHistory(data);
//       } catch (err) {
//         console.error('Error fetching history:', err);
//       }
//     };


//     fetchHistory();
//   }, []);


//   const renderItem = ({ item }: { item: InventoryHistoryItem }) => (
//     <View style={styles.card}>
//       <Text style={styles.itemName}>{item.itemName}</Text>
//       <Text style={{ color: item.action === 'added' ? '#2E7D32' : '#C62828' }}>
//         {item.action === 'added' ? '➕ Added' : '➖ Removed'}
//       </Text>
//       <Text>{item.previousQuantity} → {item.newQuantity}</Text>
//       <Text style={styles.timestamp}>{item.timestamp}</Text>
//     </View>
//   );


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Inventory History</Text>
//       <FlatList
//         data={history}
//         renderItem={renderItem}
//         keyExtractor={(_, index) => index.toString()}
//         ListEmptyComponent={<Text style={styles.noHistory}>No history found</Text>}
//       />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F3F6FA',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   card: {
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   itemName: {
//     fontWeight: '600',
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   timestamp: {
//     marginTop: 4,
//     fontSize: 12,
//     color: '#666',
//   },
//   noHistory: {
//     textAlign: 'center',
//     color: '#999',
//     marginTop: 20,
//   },
// });


//Modifieddbyadithi

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../firebase/config'; // ✅ use auth from config.ts




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
    marginTop: 20,
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
