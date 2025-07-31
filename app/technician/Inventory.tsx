import { useRouter } from 'expo-router';
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/config';


export default function Inventory() {
  const router = useRouter();
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]); // ✅ updated field name


  const fetchInventory = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'inventory_items'));
      const list: { name: string; quantity: number }[] = [];


      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({ name: doc.id, quantity: data.quantity || 0 }); // ✅ use quantity
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
    const previousQuantity = items.find((i) => i.name === itemName)?.quantity || 0;
    const newQuantity = previousQuantity + 1;


    try {
      const itemRef = doc(db, 'inventory_items', itemName);
      await setDoc(itemRef, { quantity: newQuantity }, { merge: true });


      const historyRef = collection(db, 'inventory_history');
      await addDoc(historyRef, {
        action: 'added',
        itemName,
        previousQuantity,
        newQuantity,
        technicianId: auth.currentUser?.uid || 'unknown',
timestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
      });


      fetchInventory();
    } catch (err) {
      console.error('Add error:', err);
    }
  };


  const handleRemove = async (itemName: string) => {
    const previousQuantity = items.find((i) => i.name === itemName)?.quantity || 0;
    const newQuantity = Math.max(previousQuantity - 1, 0);


    try {
      const itemRef = doc(db, 'inventory_items', itemName);
      await setDoc(itemRef, { quantity: newQuantity }, { merge: true });


      const historyRef = collection(db, 'inventory_history');
      await addDoc(historyRef, {
        action: 'removed',
        itemName,
        previousQuantity,
        newQuantity,
        technicianId: auth.currentUser?.uid || 'unknown',
timestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
      });


      fetchInventory();
    } catch (err) {
      console.error('Remove error:', err);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inventory Management</Text>


      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>


            <Text style={styles.itemCount}>
              {item.quantity} ✅
            </Text>


            <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item.name)}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.name)}>
              <Text style={styles.btnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}


        <TouchableOpacity style={styles.historyBtn} onPress={() => router.push('/technician/InventoryHistory')}>
          <Text style={styles.historyText}>View History</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>⬅ Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },


  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
scrollContainer: {
  paddingBottom: 100, // Adjust as needed
},
 itemRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: '#ddd',
  paddingVertical: 12,
  paddingHorizontal: 10,
  borderRadius: 10,
  marginBottom: 10,
  backgroundColor: '#fff',
  gap: 8,
},


itemName: {
  flex: 2,
  fontSize: 16,
  color: '#000',
  fontWeight: '500',
},


itemCount: {
  flex: 1.2,
  fontSize: 15,
  color: '#2e7d32',
  textAlign: 'center',
},


addBtn: {
  flex: 1,
  backgroundColor: '#1f67c0ff',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 6,
  alignItems: 'center',
  width: '30%',
  justifyContent: 'center',
},


removeBtn: {
  flex: 1,
  backgroundColor: '#e80a0aff',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 6,
  width: '30%',
  alignItems: 'center',
  justifyContent: 'center',
},


btnText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
}
,


  historyBtn: {
    backgroundColor: '#1E88E5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },


  historyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },


  back: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
});
