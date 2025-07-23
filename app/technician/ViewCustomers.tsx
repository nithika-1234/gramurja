import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase/config'; // adjust path if needed

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'customers'));
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomers(list);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>👤 {item.name}</Text>
      <Text>📍 {item.address}</Text>
      <Text>⚡ System Size: {item.systemSize} kW</Text>
      <Text>📞 Contact: {item.phone || 'N/A'}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => router.push(`/technician/update/${item.id}`)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push(`/technician/status/${item.id}`)}
          style={[styles.button, { backgroundColor: '#00796B' }]}
        >
          <Text style={styles.buttonText}>Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return loading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#283593" />
      <Text>Loading Customers...</Text>
    </View>
  ) : (
    <FlatList
      data={customers}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#3F51B5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonText: { 
    color: '#fff',
    fontWeight: '600',
  },
});
