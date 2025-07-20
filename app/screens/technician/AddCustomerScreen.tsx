import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase/config'; // Adjust path if needed

const AddCustomerScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [systemType, setSystemType] = useState('');
  const [status, setStatus] = useState('Survey Done');

  const handleAddCustomer = async () => {
    if (!name || !phone || !address || !systemType) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    try {
      const technicianId = auth.currentUser?.uid || 'test_technician';

      await addDoc(collection(db, 'customers'), {
        name,
        phone,
        address,
        systemType,
        status,
        technicianId,
        createdAt: serverTimestamp()
      });

      Alert.alert('Success', 'Customer added successfully!');
      setName('');
      setPhone('');
      setAddress('');
      setSystemType('');
    } catch (error: any) {
      console.error('Error adding customer:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add New Customer</Text>

        <TextInput
          placeholder="Customer Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <TextInput
          placeholder="System Type (e.g., 1kW, 2kW)"
          value={systemType}
          onChangeText={setSystemType}
          style={styles.input}
        />

        <Button title="Add Customer" onPress={handleAddCustomer} color="#4B4BFB" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 20,
    paddingTop: 60
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20
  }
});
