import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../../firebase/config';

export default function TechnicianStatus() {
  const { id } = useLocalSearchParams();
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchStatus();
  }, [id]);

  const fetchStatus = async () => {
    try {
      const docRef = doc(db, 'customers', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setStatusData(snapshot.data());
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata', // Indian time zone
  });
};


  const handleMarkDone = async (stepKey) => {
    try {
      const docRef = doc(db, 'customers', id);
      const timestamp = new Date().toISOString();

      await updateDoc(docRef, {
        [`statusRoadmap.${stepKey}.done`]: true,
        [`statusRoadmap.${stepKey}.timestamp`]: timestamp,
      });

      fetchStatus();
      Alert.alert('✅ Updated', `${stepKey} marked as done`);
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to update status');
      console.error(error);
    }
  };

  const handleUndo = async (stepKey) => {
    try {
      const docRef = doc(db, 'customers', id);

      await updateDoc(docRef, {
        [`statusRoadmap.${stepKey}.done`]: false,
        [`statusRoadmap.${stepKey}.timestamp`]: null,
      });

      fetchStatus();
      Alert.alert('↩️ Undone', `${stepKey} was reverted`);
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to undo status');
      console.error(error);
    }
  };

  const renderStep = (label, key, status) => (
    <View style={styles.stepRow} key={key}>
      <Ionicons
        name={status?.done ? 'checkmark-circle' : 'ellipse-outline'}
        size={22}
        color={status?.done ? 'green' : '#ccc'}
        style={styles.icon}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.stepText}>{label}</Text>
        {status?.timestamp && (
          <Text style={styles.timestamp}>{formatDate(status.timestamp)}</Text>
        )}
        {status?.done ? (
          <TouchableOpacity style={styles.undoButton} onPress={() => handleUndo(key)}>
            <Text style={styles.undoText}>Undo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.markButton} onPress={() => handleMarkDone(key)}>
            <Text style={styles.markButtonText}>Mark as Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#283593" />
        <Text>Loading Status...</Text>
      </View>
    );
  }

  if (!statusData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No data found</Text>
      </View>
    );
  }

  const { statusRoadmap, technicianName, billUrl } = statusData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>STATUS</Text>

      <View style={styles.card}>
        {renderStep('Request Approved', 'requestApproved', statusRoadmap?.requestApproved)}
        {renderStep('Installed', 'installed', statusRoadmap?.installed)}
        {renderStep('Docs Submitted', 'docsSubmitted', statusRoadmap?.docsSubmitted)}
      </View>

      <Text style={styles.techName}>Tech - {technicianName || 'Unknown'}</Text>

      {billUrl ? (
        <TouchableOpacity style={styles.billButton} onPress={() => Linking.openURL(billUrl)}>
          <Text style={styles.billText}>View Bill</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F9F9F9', alignItems: 'center' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  icon: { marginRight: 12 },
  stepText: { fontSize: 16, fontWeight: '600' },
  timestamp: { color: '#555', fontSize: 13, marginTop: 2 },
  techName: { fontSize: 16, fontWeight: '500', marginBottom: 20 },
  billButton: {
    borderWidth: 1,
    borderColor: '#283593',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  billText: { color: '#283593', fontWeight: 'bold', fontSize: 16 },
  markButton: {
    marginTop: 6,
    backgroundColor: '#283593',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  markButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  undoButton: {
    marginTop: 6,
    backgroundColor: '#D32F2F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  undoText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
});
