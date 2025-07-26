import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

export default function CompleteProfile() {
  const router = useRouter();
  const user = auth.currentUser;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [projectsCompleted, setProjectsCompleted] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!phone || !area || !projectsCompleted || !currentlyWorking) {
      Alert.alert('Missing Info', 'Please fill all required fields.');
      return;
    }

    setSaving(true);
    try {
      await setDoc(doc(db, 'technicians', user?.uid || ''), {
        name: name || '',
        phone,
        area,
        email: user?.email || '',
        createdAt: serverTimestamp(),
        rating: 3, // Auto calculated later
        projectsCompleted: Number(projectsCompleted),
        currentlyWorking: Number(currentlyWorking),
      });

      router.replace('/technician/TechnicianDashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Complete Your Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name (optional)"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Area"
        value={area}
        onChangeText={setArea}
      />

      <TextInput
        style={styles.input}
        placeholder="Projects Completed"
        value={projectsCompleted}
        onChangeText={setProjectsCompleted}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Currently Working On"
        value={currentlyWorking}
        onChangeText={setCurrentlyWorking}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={saving}>
        <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save & Continue'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#197278',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
