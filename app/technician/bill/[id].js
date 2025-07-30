import { useLocalSearchParams } from 'expo-router';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { db } from '../../../firebase/config';

export default function GenerateBill() {
  const { id } = useLocalSearchParams();
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [billItems, setBillItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finalView, setFinalView] = useState(false);
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Solar Panel', value: 'Solar Panel' },
    { label: 'ACDB', value: 'ACDB' },
    { label: 'DCDB', value: 'DCDB' },
    { label: 'AJB', value: 'AJB' },
    { label: 'Earthing Kit', value: 'Earthing Kit' },
    { label: 'Solar Cable', value: 'Solar Cable' },
    { label: 'Lug', value: 'Lug' },
    { label: 'Conduit Pipe', value: 'Conduit Pipe' },
    { label: 'Numbering Stickers', value: 'Numbering Stickers' },
    { label: 'AC Cable', value: 'AC Cable' },
  ]);

  useEffect(() => {
    const fetchCustomerAndItems = async () => {
      try {
        const docRef = doc(db, 'customers', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCustomerName(docSnap.data().name || '');
        }

        const q = query(collection(db, 'customers', id, 'billItems'));
        const querySnapshot = await getDocs(q);
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        setBillItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching customer or bill items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerAndItems();
  }, [id]);

  const handleAddItem = async () => {
    if (!selectedItem || !quantity || !price) return;

    const newItem = {
      item: selectedItem,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      total: parseFloat(quantity) * parseFloat(price),
      timestamp: new Date(),
    };

    try {
      if (editingIndex !== null) {
        Alert.alert('Edit mode', 'Edits do not affect Firebase data. Only new items are added to Firestore.');
        const updatedItems = [...billItems];
        updatedItems[editingIndex] = { ...updatedItems[editingIndex], ...newItem };
        setBillItems(updatedItems);
        setEditingIndex(null);
      } else {
        const docRef = await addDoc(collection(db, 'customers', id, 'billItems'), newItem);
        setBillItems((prev) => [...prev, { id: docRef.id, ...newItem }]);
      }
      setSelectedItem('');
      setQuantity('');
      setPrice('');
    } catch (err) {
      console.error('Error adding item to Firestore:', err);
    }
  };

  const handleEditItem = (index) => {
    const item = billItems[index];
    setSelectedItem(item.item);
    setQuantity(item.quantity.toString());
    setPrice(item.price.toString());
    setEditingIndex(index);
  };

  const handleDeleteItem = async (index) => {
    const item = billItems[index];
    try {
      await deleteDoc(doc(db, 'customers', id, 'billItems', item.id));
      const updatedItems = [...billItems];
      updatedItems.splice(index, 1);
      setBillItems(updatedItems);
    } catch (err) {
      console.error('Error deleting item from Firestore:', err);
    }
  };

  const totalSum = billItems.reduce((sum, item) => sum + item.total, 0);

  // const confirmAndSendToCustomer = async () => {
  //   setSending(true);
  //   try {
  //     await updateDoc(doc(db, 'customers', id), {
  //       billGenerated: true,
  //       billGeneratedAt: serverTimestamp(),
  //       totalAmount: totalSum,
  //     });
  //     Alert.alert('Success', 'Bill confirmed and sent to customer.');
  //     setFinalView(false);
  //   } catch (err) {
  //     console.error('Error sending bill to customer:', err);
  //   } finally {
  //     setSending(false);
  //   }
  // };


const confirmAndSendToCustomer = async () => {
  setSending(true);
  try {
    const finalBill = {
      customerName,
      items: billItems,
      totalAmount: totalSum,
      billGeneratedAt: new Date(),
    };

    await updateDoc(doc(db, 'customers', id), {
      finalBill,
      billGenerated: true,
      billGeneratedAt: new Date(),
    });

    Alert.alert('Success', 'Bill confirmed and sent to customer.');
    setFinalView(false);
  } catch (err) {
    console.error('Error sending bill to customer:', err);
    Alert.alert('Error', 'Failed to send bill');
  } finally {
    setSending(false);
  }
};
























  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3949AB" />
        <Text style={{ marginTop: 10 }}>Loading Bill Items...</Text>
      </View>
    );
  }

  if (finalView) {
    return (
      <ScrollView contentContainerStyle={styles.paperBillBackground}>
        <Text style={styles.invoiceTitle}>Solar Panel Installation Invoice</Text>
        <Text style={styles.customerNameBill}>Customer Name: {customerName}</Text>

        <View style={styles.tableHeaderBill}>
          <Text style={[styles.tableCellBill, { flex: 2 }]}>Item</Text>
          <Text style={[styles.tableCellBill, { flex: 1 }]}>Qty</Text>
          <Text style={[styles.tableCellBill, { flex: 1 }]}>Rate</Text>
          <Text style={[styles.tableCellBill, { flex: 1 }]}>Amount</Text>
        </View>

        {billItems.map((item, index) => (
          <View key={index} style={styles.tableRowBill}>
            <Text style={[styles.tableCellBill, { flex: 2 }]}>{item.item}</Text>
            <Text style={[styles.tableCellBill, { flex: 1 }]}>{item.quantity}</Text>
            <Text style={[styles.tableCellBill, { flex: 1 }]}>₹{item.price}</Text>
            <Text style={[styles.tableCellBill, { flex: 1 }]}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}

        <Text style={styles.grandTotal}>Grand Total: ₹{totalSum.toFixed(2)}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: '#616161' }]} onPress={() => setFinalView(false)}>
            <Text style={styles.addButtonText}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={confirmAndSendToCustomer} disabled={sending}>
            <Text style={styles.addButtonText}>{sending ? 'Sending...' : 'Confirm & Send'}</Text>
          </TouchableOpacity>

              
















        </View>
      </ScrollView>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Form input and item list goes here */}
        <Text style={styles.invoiceTitle}>Add Items to Bill</Text>
        <DropDownPicker
          open={open}
          value={selectedItem}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedItem}
          setItems={setItems}
          placeholder="Select Item"
          style={{ marginBottom: 10 }}
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>{editingIndex !== null ? 'Save Edit' : 'Add Item'}</Text>
        </TouchableOpacity>

        <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Bill Items:</Text>
        {billItems.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text>{item.item} (x{item.quantity}) - ₹{item.total}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleEditItem(index)}>
                <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Total: ₹{totalSum.toFixed(2)}</Text>

        <TouchableOpacity style={styles.addButton} onPress={() => setFinalView(true)}>
          <Text style={styles.addButtonText}>Complete Bill</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  paperBillBackground: {
    padding: 20,
    backgroundColor: '#fffaf0',
    borderWidth: 1,
    borderColor: '#CCC',
    margin: 10,
    borderRadius: 12,
    flexGrow: 1,


  //    padding: 20,
  // backgroundColor: '#fffaf0', // Light paper cream
  // borderWidth: 1,
  // borderColor: '#ddd',
  // margin: 10,
  // borderRadius: 10,
  // flexGrow: 1,



  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
    textDecorationLine: 'underline',
  },
  customerNameBill: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'left',
  },
  tableHeaderBill: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'dashed',
    paddingVertical: 8,
    marginBottom: 4,
  },
  tableRowBill: {
    // flexDirection: 'row',
    // paddingVertical: 6,
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#ccc',



    flexDirection: 'row',
  paddingVertical: 6,
  borderBottomWidth: 1,
  borderColor: '#000', // Add border for rows
  borderTopWidth: 1,
 
  },
  tableCellBill: {
//  fontSize: 14,
//   color: '#000',
//   fontFamily: 'serif', // You can load a custom font if needed
//   borderRightWidth: 1,
//   borderColor: '#000',
//   textAlign: 'center',





  fontSize: 14,
  color: '#000',
  fontFamily: 'serif',
  borderRightWidth: 1,
  borderColor: '#000',
 // paddingHorizontal: 4,
  textAlign: 'center',



//borderStyle: 'dashed',
    




    
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'right',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#3949AB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
