    import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { db } from '../../../firebase/config';

export default function CustomerBill() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [billData, setBillData] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const docRef = doc(db, 'customers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.billGenerated && data.finalBill) {
            setBillData(data.finalBill);
          } else {
            setBillData(null); // No bill uploaded yet
          }
        }
      } catch (error) {
        console.error('Error fetching bill:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBill();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading Bill...</Text>
      </View>
    );
  }

  if (!billData) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>❌ Bill not uploaded yet.</Text>
      </View>
    );
  }

  const { customerName, items, totalAmount, billGeneratedAt } = billData;

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>

      <View style={styles.billPaper}>
        <Text style={styles.header}>⚡ Solar Panel Installation Bill</Text>
        <Text style={styles.subHeader}>Customer: {customerName}</Text>
        <Text style={styles.subHeader}>Date: {new Date(billGeneratedAt.seconds * 1000).toLocaleDateString()}</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.cell, { flex: 2 }]}>Item</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Qty</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Rate (₹)</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Total (₹)</Text>
        </View>

        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 2 }]}>{item.item}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.quantity}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>₹{item.price}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Grand Total: ₹{totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, alignItems: 'center', backgroundColor: '#f2f2f2',
  },
  billPaper: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10,
  },
  subHeader: {
    fontSize: 14, textAlign: 'center', marginBottom: 5, color: '#333',
  },
  tableHeader: {
    flexDirection: 'row', borderBottomWidth: 1, borderStyle: 'dashed',
    borderBottomColor: '#000', paddingVertical: 8, marginTop: 15,
  },
  tableRow: {
    flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1,
    borderBottomColor: '#ccc', borderStyle: 'dashed',
  },
  cell: {
    fontSize: 14, color: '#000',
  },
  totalRow: {
    marginTop: 20, alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 16, fontWeight: 'bold',
  },
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  notFound: {
    fontSize: 16, color: 'red', fontWeight: 'bold',
  },
});
