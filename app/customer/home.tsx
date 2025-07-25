// 📁 File: app/customer/status/[id].tsx

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { db } from '../../firebase/config';

export default function CustomerStatus() {
  const { id } = useLocalSearchParams();
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchStatus();
  }, [id]);

  const fetchStatus = async () => {
    try {
      const snapshot = await getDoc(doc(db, 'customers', id));
      if (snapshot.exists()) {
        setStatusData(snapshot.data());
      }
    } catch (error) {
      console.error('Error fetching customer status:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (iso) => {
    if (!iso) return '';
    const date = new Date(iso);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStep = (label, status) => (
    <View style={styles.stepRow} key={label}>
      <Ionicons
        name={status?.done ? 'checkmark-circle' : 'ellipse-outline'}
        size={22}
        color={status?.done ? 'green' : '#bbb'}
        style={styles.icon}
      />
      <View>
        <Text style={styles.stepText}>{label}</Text>
        {status?.timestamp && (
          <Text style={styles.timestamp}>{formatDateTime(status.timestamp)}</Text>
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

  if (!statusData?.statusRoadmap) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>No Status Found</Text>
      </View>
    );
  }

  const { statusRoadmap, technicianName, billUrl } = statusData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Installation Progress</Text>

      <View style={styles.card}>
        {renderStep('Request Approved', statusRoadmap.requestApproved)}
        {renderStep('Installed', statusRoadmap.installed)}
        {renderStep('Docs Submitted', statusRoadmap.docsSubmitted)}
      </View>

      <Text style={styles.techName}>Technician: {technicianName || 'Unknown'}</Text>

      {billUrl && (
        <Text style={styles.billLink} onPress={() => Linking.openURL(billUrl)}>
          📄 View Final Bill
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  icon: { marginRight: 10 },
  stepText: { fontSize: 16, fontWeight: '600' },
  timestamp: { fontSize: 13, color: '#555', marginTop: 2 },
  techName: { fontSize: 15, marginBottom: 15, color: '#444' },
  billLink: {
    fontSize: 16,
    color: '#1E88E5',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
