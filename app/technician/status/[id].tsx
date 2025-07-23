// app/technician/status/[id].tsx

import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import { db } from '../../../firebase/config';

export default function StatusTracker() {
  const { id } = useLocalSearchParams();
  const [status, setStatus] = useState({
    requestApproved: false,
    installed: false,
    docsSubmitted: false,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const snap = await getDoc(doc(db, 'customers', id));
        if (snap.exists()) {
          const data = snap.data();
          setStatus({
            requestApproved: data.requestApproved || false,
            installed: data.installed || false,
            docsSubmitted: data.docsSubmitted || false,
          });
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
  }, [id]);

  const updateStatus = async (field: keyof typeof status) => {
    const newStatus = !status[field];
    setStatus(prev => ({ ...prev, [field]: newStatus }));

    try {
      await updateDoc(doc(db, 'customers', id), {
        [field]: newStatus,
      });
      Alert.alert('✅ Updated', `${field} status updated successfully`);
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to update status');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Installation Status Tracker</Text>

      <TouchableOpacity
        style={[styles.statusButton, status.requestApproved && styles.active]}
        onPress={() => updateStatus('requestApproved')}
      >
        <Text style={styles.buttonText}>✅ Request Approved</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.statusButton, status.installed && styles.active]}
        onPress={() => updateStatus('installed')}
      >
        <Text style={styles.buttonText}>🏗️ Installed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.statusButton, status.docsSubmitted && styles.active]}
        onPress={() => updateStatus('docsSubmitted')}
      >
        <Text style={styles.buttonText}>📝 Docs Submitted</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, flex: 1, backgroundColor: '#fff',
  },
  title: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 20,
  },
  statusButton: {
    padding: 14,
    backgroundColor: '#ccc',
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
