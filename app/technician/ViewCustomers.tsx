import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/config';

type Customer = {
  id: string;
  name: string;
  address: string;
  systemSize: string;
  technicianId: string;
  technicianName: string;
  createdAt: any; // Firebase Timestamp
};

export default function ViewCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'recent' | 'all'>('recent');

  const fetchCustomers = async (recentOnly: boolean) => {
    setLoading(true);
    const technicianId = getAuth().currentUser?.uid;

    let q;
    if (recentOnly) {
      const tenDaysAgo = Timestamp.fromDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));
      q = query(
        collection(db, 'customers'),
        where('technicianId', '==', technicianId),
        where('createdAt', '>=', tenDaysAgo)
      );
    } else {
      q = query(
        collection(db, 'customers'),
        where('technicianId', '==', technicianId)
      );
    }

    try {
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Customer[];

      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers(selectedOption === 'recent');
  }, [selectedOption]);

  const renderCustomer = ({ item }: { item: Customer }) => (
    <View style={styles.card}>
      <Text style={styles.name}>👤 {item.name}</Text>
      <Text>📍 <Text style={{ fontWeight: '600' }}>Address:</Text> {item.address}</Text>
      <Text>🔋 <Text style={{ fontWeight: '600' }}>System Size:</Text> {item.systemSize}</Text>
      <Text>📅 <Text style={{ fontWeight: '600' }}>Date:</Text> {item.createdAt?.toDate().toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Customers</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.tabButton, selectedOption === 'recent' && styles.selectedTab]}
          onPress={() => setSelectedOption('recent')}
        >
          <Text style={styles.tabText}>Recent Projects</Text>
        </Pressable>

        <Pressable
          style={[styles.tabButton, selectedOption === 'all' && styles.selectedTab]}
          onPress={() => setSelectedOption('all')}
        >
          <Text style={styles.tabText}>View History</Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 30 }} />
      ) : customers.length === 0 ? (
        <Text style={styles.noData}>No customers found.</Text>
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={renderCustomer}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 25,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    backgroundColor: '#02be09ff',
    paddingVertical: 18,
    marginHorizontal: 8,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedTab: {
    backgroundColor: '#78ba7bff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    paddingVertical: 20,
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  noData: {
    fontSize: 16,
    color: '#888',
    marginTop: 30,
    alignSelf: 'center',
  },
});
