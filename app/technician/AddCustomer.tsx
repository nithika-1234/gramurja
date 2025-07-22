//     // app/technician/AddCustomer.tsx
// import { useRouter } from 'expo-router';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function AddCustomer() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>New Installation</Text>

//       <TextInput placeholder="Customer Name" style={styles.input} />
//       <TextInput placeholder="Address" style={styles.input} />
//       <TextInput placeholder="System Size (kW)" keyboardType="numeric" style={styles.input} />
//       <TextInput placeholder="Status (e.g., Installed, Pending)" style={styles.input} />

//       <TouchableOpacity style={styles.submitButton}>
//         <Text style={styles.submitText}>SUBMIT</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.back()}>
//         <Text style={styles.back}>⬅ Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }


import { useRouter } from 'expo-router';
import { useState } from 'react';
import { query, where, getDocs } from 'firebase/firestore';

import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { auth, db } from '../../firebase/config';

export default function AddCustomer() {
  const router = useRouter();

  // 🔹 State for input fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [status, setStatus] = useState('');
const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
     if (loading) return;
  setLoading(true);
    if (!name || !address || !systemSize || !status) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const technician = getAuth().currentUser;

    if (!technician) {
      Alert.alert('Error', 'Technician not logged in');
      return;
    }

try {
    // 🔍 Check if customer with same name exists for this technician
    const customerQuery = query(
  collection(db, 'customers'),
  where('name', '==', name),
    // where('technicianId', '==', technician.uid)  

);
    const querySnapshot = await getDocs(customerQuery);

    if (!querySnapshot.empty) {
      Alert.alert('Duplicate Entry', 'Customer with this name already exists');
      return;
    }

    // ✅ Add new customer
    await addDoc(collection(db, 'customers'), {
      name,
      address,
      systemSize,
      status,
      technicianId: technician.uid,
      createdAt: serverTimestamp(),
    });

    Alert.alert('Success', 'Customer added successfully', [
  { text: 'OK', onPress: () => router.back() }
]);
  } catch (error) {
    console.error('Error adding document: ', error);
    Alert.alert('Error', 'Failed to add customer');
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Installation</Text>

      <TextInput placeholder="Customer Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Address" style={styles.input} value={address} onChangeText={setAddress} />
      <TextInput placeholder="System Size (kW)" keyboardType="numeric" style={styles.input} value={systemSize} onChangeText={setSystemSize} />
      <TextInput placeholder="Status (e.g., Installed, Pending)" style={styles.input} value={status} onChangeText={setStatus} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#F0F0F0', padding: 12, borderRadius: 8,
    marginBottom: 16, fontSize: 15, borderColor: '#ccc', borderWidth: 1,width:'100%',
  },
  submitButton: {
    backgroundColor: '#283593', padding: 15, borderRadius: 10,
    alignItems: 'center', marginTop: 10,width:'100%'
  },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  back: { marginTop: 20, textAlign: 'center', color: '#555' },
});
