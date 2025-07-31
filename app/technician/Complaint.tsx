
import { getAuth } from 'firebase/auth';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { db } from '../../firebase/config';


export default function ViewComplaintsScreen() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) return;


      try {
        const q = query(
          collection(db, 'feedbacks'),
          where('technicianId', '==', user.uid),
          where('complaint', '!=', '')
        );
        const snapshot = await getDocs(q);
        const complaintList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComplaints(complaintList);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false);
      }
    };


    fetchComplaints();
  }, []);


  const renderItem = ({ item }: { item: any }) => {
    const formattedTime = item.timestamp?.toDate?.().toLocaleString?.() || 'Time not available';
    return (
      <View style={styles.card}>
        <Text style={styles.label}>Customer Name</Text>
        <Text style={styles.value}>{item.customerName || 'Unknown'}</Text>


        {/* <Text style={styles.label}>Complaint</Text> */}
        <Text style={styles.complaintText}>{item.complaint}</Text>


        <Text style={styles.timestamp}>{formattedTime}</Text>
      </View>
    );
  };


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Complaints</Text>


      {complaints.length === 0 ? (
        <Text style={styles.noData}>No complaints found.</Text>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#005A9E',
    textAlign: 'center',
    marginBottom: 20,
  },
  noData: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1007bcff',
    marginBottom: 10,
    fontWeight: '500',
  },
  complaintText: {
    fontSize: 17,
    color: '#f64615ff',
    marginBottom: 12,
    lineHeight: 20,
    fontWeight: '500',},
  timestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});


