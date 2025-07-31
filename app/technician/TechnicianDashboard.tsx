// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { useRouter } from 'expo-router';
// const router = useRouter();
// const TechnicianDashboardScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Technician Dashboard</Text>
//       {/* <Button title="Add Customer" onPress={() => navigation.navigate('AddCustomer')} />
//       <Button title="Upload Work Log" onPress={() => navigation.navigate('UploadWorkLog')} />
//       <Button title="Inventory Management" onPress={() => navigation.navigate('Inventory')} /> */}
      

// <Button title="Add Customer" onPress={() => router.push('Addcustomer')} />
// <Button title="Upload Work Log" onPress={() => router.push('/upload-work-log')} />
// <Button title="Inventory Management" onPress={() => router.push('/inventory')} />

//     </View>
//   );
// };

// export default TechnicianDashboardScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', gap: 20, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }
// });






//bluedashboard
// import { useRouter } from 'expo-router';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function TechnicianDashboard() {
//   const router = useRouter();

//   const navigateTo = (path: string) => {
//     router.push(path as any); // 👈 force push if TS is annoying
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>WELCOME</Text>

//       <TouchableOpacity style={styles.button} onPress={() => navigateTo('/technician/AddCustomer')}>
//         <Text style={styles.buttonText}>Add Customer</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={() => router.push('/technician/ViewCustomers')}>
//              <Text style={styles.buttonText}>View Customer</Text>
//       </TouchableOpacity>


//       <TouchableOpacity style={styles.button} onPress={() => navigateTo('/technician/Inventory')}>
//         <Text style={styles.buttonText}>Inventory</Text>
//       </TouchableOpacity>


// <TouchableOpacity style={styles.button} onPress={() => navigateTo('/technician/ViewCustomers')}>
//         <Text style={styles.buttonText}>Bill Generation</Text>
//       </TouchableOpacity>








      
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
//   heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
//   button: {
//     backgroundColor: '#5C6BC0',
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });






//greendashboard



import { useRouter } from 'expo-router';
import { Linking } from 'react-native';


import { getAuth } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../../firebase/config';


export default function TechnicianDashboard() {
  const router = useRouter();
  const [lowStockItems, setLowStockItems] = useState<string[]>([]);
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);
  const technicianId = getAuth().currentUser?.uid;


  const navigateTo = (path: string) => {
    router.push(path as any);
  };


  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'inventory_items'));
        const lowItems: string[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.quantity !== undefined && data.quantity <= 5) {
            lowItems.push(data.name || doc.id);
          }
        });
        setLowStockItems(lowItems);
      } catch (error) {
        console.error('Error fetching low stock:', error);
      }
    };


    fetchLowStock();
  }, []);


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(
          collection(db, 'bookingRequests'),
          where('technicianId', '==', technicianId),
          where('status', '==', 'pending')
        );
        const snapshot = await getDocs(q);
        const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookingRequests(requests);
      } catch (error) {
        console.error('Error fetching booking requests:', error);
      }
    };


    fetchRequests();
  }, []);


  const handleBookingResponse = async (requestId: string, response: 'accepted' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'bookingRequests', requestId), {
        status: response,
      });
      Alert.alert('Success', `Request ${response}`);
      setBookingRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#D1FAE5" />
      <View style={styles.container}>
        {lowStockItems.length > 0 && (
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>
              ⚠️ Limited Stock: {lowStockItems.join(', ')}
            </Text>
          </View>
        )}
        {bookingRequests.map((req) => (
  <View key={req.id} style={styles.requestCard}>
    <Text style={styles.requestEmail}>{req.customerEmail}</Text>


    <View style={styles.phoneRow}>
      <Text style={styles.phoneIcon}>📞</Text>
      <Text style={styles.phoneText}>{req.customerPhone}</Text>
    </View>


    <TouchableOpacity
      onPress={() => Linking.openURL(`https://wa.me/${req.customerPhone}`)}
      style={styles.whatsappButton}
    >
      <Text style={styles.whatsappButtonText}>💬 WhatsApp</Text>
    </TouchableOpacity>


    <View style={styles.responseRow}>
      <TouchableOpacity
        onPress={() => handleBookingResponse(req.id, 'accepted')}
        style={[styles.responseButton, { backgroundColor: '#10B981' }]}
      >
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => handleBookingResponse(req.id, 'rejected')}
        style={[styles.responseButton, { backgroundColor: '#EF4444' }]}
      >
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  </View>
))}


       
       




        <Text style={styles.welcomeText}>Welcome</Text>


        <View style={styles.card}>
          <CustomButton label="➕ Add Customer" onPress={() => navigateTo('/technician/AddCustomer')} />
         
          <CustomButton label="📦 Inventory" onPress={() => navigateTo('/technician/Inventory')} />
          <CustomButton label="View Customers" onPress={() => navigateTo('/technician/ViewCustomers')} />
<CustomButton label="Complaints" onPress={() => navigateTo('/technician/Complaint')} />

        </View>
      </View>
    </SafeAreaView>
  );
}


function CustomButton({ label, onPress }: { label: string; onPress: () => void }) {
  const [isPressed, setIsPressed] = useState(false);


  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: isPressed ? '#3473bbff' :'#4b5fd1ff' },
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2748d9ff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3efedff',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#1353caff',
    textAlign: 'center',
  },
  requestCard: {
  backgroundColor: '#ffffff',
  padding: 16,
  marginVertical: 10,
  borderRadius: 12,
  width: '100%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 4,
},


requestEmail: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 6,
  color: '#111827',
},


phoneRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},


phoneIcon: {
  fontSize: 18,
  color: '#EC4899',
  marginRight: 8,
},


phoneText: {
  fontSize: 16,
  color: '#374151',
},


whatsappButton: {
  backgroundColor: '#8fecb1ff',
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 12,
},


whatsappButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},


responseRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},


responseButton: {
  flex: 0.48,
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
},


  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  alertBox: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
    borderColor: '#FFEEBA',
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#F59E0B',
  },
  alertText: {
    color: '#856404',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
