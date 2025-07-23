import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase/config';

export default function AddCustomer() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    if (!name || !address || !systemSize) {
      Alert.alert('Error', 'Please fill all fields');
      setLoading(false);
      return;
    }

    const technician = getAuth().currentUser;

    if (!technician) {
      Alert.alert('Error', 'Technician not logged in');
      setLoading(false);
      return;
    }

    try {
      const customerQuery = query(
        collection(db, 'customers'),
        where('name', '==', name)
      );

      const querySnapshot = await getDocs(customerQuery);
      if (!querySnapshot.empty) {
        Alert.alert('Duplicate Entry', 'Customer with this name already exists');
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'customers'), {
        name,
        address,
        systemSize,
        technicianId: technician.uid,
        technicianName: technician.displayName || 'Unknown Technician',
        status: {
          requestApproved: { done: false, timestamp: null },
          installed: { done: false, timestamp: null },
          docsSubmitted: { done: false, timestamp: null },
        },
        billUrl: '',
        createdAt: serverTimestamp(),
      });

      Alert.alert('✅ Success', 'Customer added successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error adding customer:', error);
      Alert.alert('Error', 'Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Installation</Text>

      <TextInput placeholder="Customer Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Address" style={styles.input} value={address} onChangeText={setAddress} />
      <TextInput placeholder="System Size (kW)" keyboardType="numeric" style={styles.input} value={systemSize} onChangeText={setSystemSize} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{loading ? 'Adding...' : 'SUBMIT'}</Text>
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
    marginBottom: 16, fontSize: 15, borderColor: '#ccc', borderWidth: 1,
    width: '40%', marginLeft: '30%'
  },
  submitButton: {
    backgroundColor: '#283593', padding: 15, borderRadius: 10,
    alignItems: 'center', marginTop: 10, width: '40%', marginLeft: '30%'
  },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  back: { marginTop: 20, textAlign: 'center', color: '#555' },
});
