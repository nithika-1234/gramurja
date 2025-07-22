//     // app/technician/Inventory.tsx
// import { useRouter } from 'expo-router';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function Inventory() {
//   const router = useRouter();

//   const items = [
//     { name: 'Panel', count: 12 },
//     { name: 'Battery', count: 8 },
//     { name: 'Inverter', count: 5 },
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Inventory Management</Text>

//       {items.map((item, index) => (
//         <View key={index} style={styles.itemRow}>
//           <Text style={styles.itemText}>{item.name} ({item.count} available)</Text>
//           <TouchableOpacity style={styles.addBtn}><Text style={styles.btnText}>Add</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.removeBtn}><Text style={styles.btnText}>Remove</Text></TouchableOpacity>
//         </View>
//       ))}

//       <TouchableOpacity style={styles.historyBtn}>
//         <Text style={styles.historyText}>View History</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.back()}>
//         <Text style={styles.back}>⬅ Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   itemRow: {
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     marginBottom: 15, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8,
//   },
//   itemText: { fontSize: 16 },
//   addBtn: { backgroundColor: '#8E24AA', padding: 10, borderRadius: 6 },
//   removeBtn: { backgroundColor: '#F44336', padding: 10, borderRadius: 6 },
//   btnText: { color: '#fff' },
//   historyBtn: {
//     backgroundColor: '#1E88E5', padding: 14, borderRadius: 8,
//     alignItems: 'center', marginTop: 20,
//   },
//   historyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   back: { marginTop: 20, textAlign: 'center', color: '#555' },
// });

// import { useEffect, useState } from 'react';
// import { useRouter } from 'expo-router';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { collection, getDocs } from 'firebase/firestore';
// import { auth, db } from '../../firebase/config';

// export default function Inventory() {
//   const router = useRouter();
//   const [items, setItems] = useState<{ name: string; count: number }[]>([]);

//   useEffect(() => {
//   const fetchInventory = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, 'inventory'));
//       const list: { name: string; count: number }[] = [];

//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         console.log('Fetched doc:', doc.id, data); // 🔍 Debug line
//         list.push({ name: doc.id, count: data.count || 0 });
//       });

//       setItems(list);
//     } catch (error) {
//       console.error('Error fetching inventory:', error);
//     }
//   };

//   fetchInventory();
// }, []);


//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Inventory Management</Text>
       

//       {items.map((item, index) => (
//         <View key={index} style={styles.itemRow}>
//           <Text style={styles.itemText}>
//             {item.name} ({item.count} available)
//           </Text>
//           <TouchableOpacity style={styles.addBtn}>
//             <Text style={styles.btnText}>Add</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.removeBtn}>
//             <Text style={styles.btnText}>Remove</Text>
//           </TouchableOpacity>
//         </View>
//       ))}

//       <TouchableOpacity style={styles.historyBtn}>
//         <Text style={styles.historyText}>View History</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.back()}>
//         <Text style={styles.back}>⬅ Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   itemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//   },
//   itemText: { fontSize: 16 },
//   addBtn: { backgroundColor: '#8E24AA', padding: 10, borderRadius: 6 },
//   removeBtn: { backgroundColor: '#F44336', padding: 10, borderRadius: 6 },
//   btnText: { color: '#fff' },
//   historyBtn: {
//     backgroundColor: '#1E88E5',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   historyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   back: { marginTop: 20, textAlign: 'center', color: '#555' },
// });

import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

export default function Inventory() {
  const router = useRouter();
  const [items, setItems] = useState<{ name: string; count: number }[]>([]);

  const fetchInventory = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'inventory'));
      const list: { name: string; count: number }[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({ name: doc.id, count: data.count || 0 });
      });

      setItems(list);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdd = async (itemName: string) => {
    const itemRef = doc(db, 'inventory', itemName);
    const current = items.find((i) => i.name === itemName)?.count || 0;

    try {
      await setDoc(itemRef, { count: current + 1 }, { merge: true });
      fetchInventory(); // Refresh after update
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const handleRemove = async (itemName: string) => {
    const itemRef = doc(db, 'inventory', itemName);
    const current = items.find((i) => i.name === itemName)?.count || 0;

    if (current <= 0) return; // Prevent negative

    try {
      await updateDoc(itemRef, { count: current - 1 });
      fetchInventory(); // Refresh after update
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inventory Management</Text>

      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.itemText}>
            {item.name} ({item.count} available)
          </Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item.name)}>
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.name)}>
            <Text style={styles.btnText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.historyBtn}>
        <Text style={styles.historyText}>View History</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  itemText: { fontSize: 16 },
  addBtn: { backgroundColor: '#8E24AA', padding: 10, borderRadius: 6 },
  removeBtn: { backgroundColor: '#F44336', padding: 10, borderRadius: 6 },
  btnText: { color: '#fff' },
  historyBtn: {
    backgroundColor: '#1E88E5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  historyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  back: { marginTop: 20, textAlign: 'center', color: '#555' },
});
