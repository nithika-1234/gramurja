



import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config'; // 🔁 Adjust path if needed
// import { Bold } from 'lucide-react-native';

export default function TechnicianDashboard() {
  const router = useRouter();
  const [lowStockItems, setLowStockItems] = useState<string[]>([]);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#D1FAE5" />
      <View style={styles.container}>
        {lowStockItems.length > 0 && (
          <View style={styles.alertBox}>
            <Text style={styles.alertText} >
              ⚠️ Limited Stock: {lowStockItems.join(', ')}
            </Text>
          </View>
        )}

        <Text style={styles.welcomeText}> Welcome</Text>

        <View style={styles.card}>
          <CustomButton label="➕ Add Customer" onPress={() => navigateTo('/technician/AddCustomer')} />
          <CustomButton label="🔧 View Installation" onPress={() => navigateTo('/technician/InstallationForm')} />
          <CustomButton label="📦 Inventory" onPress={() => navigateTo('/technician/Inventory')} />
          <CustomButton label="View Customers" onPress={() => navigateTo('/technician/ViewCustomers')} />
        </View>
        
      </View>
    </SafeAreaView>
  );
}

// ✅ Custom reusable button with press effect
function CustomButton({ label, onPress }: { label: string; onPress: () => void }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: isPressed ? '#02511fff' : '#22C55E' },
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
    
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D1FAE5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 6,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#065F46',
    textAlign: 'center',
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










// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Linking,
//   Alert,
// } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   addDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { db } from '../../firebase/config';
// import { Phone } from 'lucide-react-native';

// // Use authenticated customer context
// const currentCustomer = () => {
//   const { user } = useAuth();
//   return {
//     id: user?.uid,
//     email: user?.email,
//   };
// };

// type Technician = {
//   id: string;
//   name: string;
//   phone?: string;
//   area: string;
//   email?: string;
//   rating?: number;
//   projectsCompleted?: number;
//   currentlyWorking?: boolean;
// };

// export default function TechniciansByArea() {
//   const { area } = useLocalSearchParams<{ area: string }>();
//   const [technicians, setTechnicians] = useState<Technician[]>([]);
//   const customer = currentCustomer();

//   useEffect(() => {
//     const fetchTechnicians = async () => {
//       try {
//         const q = query(collection(db, 'technicians'), where('area', '==', area));
//         const querySnapshot = await getDocs(q);
//         const techs = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Technician[];
//         setTechnicians(techs);
//       } catch (error) {
//         console.error('Error fetching technicians:', error);
//       }
//     };

//     fetchTechnicians();
//   }, [area]);

//   const handleCall = (phone?: string) => {
//     if (phone) Linking.openURL(`tel:${phone}`);
//     else Alert.alert('No phone number available');
//   };

//   const handleBook = async (technician: Technician) => {
//     try {
//       await addDoc(collection(db, 'bookingRequests'), {
//         technicianId: technician.id,
//         technicianName: technician.name,
//         customerId: customer.id,
//         customerEmail: customer.email,
//         status: 'pending',
//         createdAt: serverTimestamp(),
//       });
//       Alert.alert('Booking Requested', 'Waiting for technician approval');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to send booking request.');
//     }
//   };

//   const renderItem = ({ item }: { item: Technician }) => (
//     <View style={styles.card}>
//       <Text style={styles.name}>{item.name || 'Unnamed Technician'}</Text>
//       <Text style={styles.info}>Rating: {item.rating ?? 'Not Rated'}</Text>
//       <Text style={styles.info}>Completed Projects: {item.projectsCompleted ?? 0}</Text>
//       <Text style={styles.info}>Currently Working: {item.currentlyWorking ? 'Yes' : 'No'}</Text>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.callBtn} onPress={() => handleCall(item.phone)}>
//           <Phone size={18} color="white" />
//           <Text style={styles.btnText}>Call</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.bookBtn} onPress={() => handleBook(item)}>
//           <Text style={styles.btnText}>Book</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Technicians in {area}</Text>
//       <FlatList
//         data={technicians}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         ListEmptyComponent={<Text>No technicians found.</Text>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#F9FAFB',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     padding: 18,
//     borderRadius: 12,
//     marginBottom: 14,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   info: {
//     fontSize: 14,
//     marginBottom: 2,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     marginTop: 10,
//     justifyContent: 'space-between',
//   },
//   callBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#10B981',
//     padding: 10,
//     borderRadius: 8,
//   },
//   bookBtn: {
//     backgroundColor: '#3B82F6',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   btnText: {
//     color: 'white',
//     fontWeight: '600',
//     marginLeft: 6,
//   },
// });

//continue