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
// import { FontAwesome } from '@expo/vector-icons';

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

// // Sample authenticated user (mock)
// const currentCustomer = {
//   id: 'abc123',
//   email: 'customer@example.com',
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
//  const openWhatsApp = (phone?: string) => {
//     if (!phone) return;
//     const formatted = phone.replace(/\D/g, '');
//     const url = `https://wa.me/${formatted}`;
//     Linking.openURL(url).catch(() => {
//       Alert.alert('Error', 'Unable to open WhatsApp');
//     });
//   };
// //   const handleCall = (phone?: string) => {
// //     if (phone) Linking.openURL(`tel:${phone}`);
// //     else Alert.alert('No phone number available');
// //   };

//   const handleBook = async (technician: Technician) => {
//     try {
//       await addDoc(collection(db, 'bookingRequests'), {
//         technicianId: technician.id,
//         technicianName: technician.name,
//         customerId: currentCustomer.id,
//         customerEmail: currentCustomer.email,
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
//       <Text style={styles.info}>Currently Working: {item.currentlyWorking ??0}</Text>

//       <View style={styles.buttonRow}>
//         {/* <TouchableOpacity style={styles.callBtn} onPress={() => handleCall(item.phone)}>
//           <Phone size={18} color="white" />
//           <Text style={styles.btnText}>WhatsApp</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity onPress={() => openWhatsApp(item.phone)} style={styles.iconBtn}>
            
//           <FontAwesome name="whatsapp" size={24} color="#25D366" />

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
//     backgroundColor: '#ffffffff',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//    iconBtn: {
//     backgroundColor: '#ffffffff',
//     padding: 10,
//     borderRadius: 8,
//   },
//   card: {
//     backgroundColor: '#e4fea6ff',
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












import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/config';

type Technician = {
  id: string;
  name: string;
  phone?: string;
  area: string;
  email?: string;
  rating?: number;
  projectsCompleted?: number;
  currentlyWorking?: boolean;
};

export default function TechniciansByArea() {
  const { area } = useLocalSearchParams<{ area: string }>();
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const q = query(collection(db, 'technicians'), where('area', '==', area));
        const querySnapshot = await getDocs(q);
        const techs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Technician[];
        setTechnicians(techs);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    fetchTechnicians();
  }, [area]);

  const openWhatsApp = (phone?: string) => {
    if (!phone) return;
    const formatted = phone.replace(/\D/g, '');
    const url = `https://wa.me/${formatted}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open WhatsApp');
    });
  };

  const handleBook = async (technician: Technician) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Login Required', 'Please login to book a technician.');
      return;
    }

    try {
      await addDoc(collection(db, 'bookingRequests'), {
        technicianId: technician.id,
        technicianName: technician.name,
        customerId: currentUser.uid, // ✅ Real Firebase UID
        customerEmail: currentUser.email,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      Alert.alert('Booking Requested', 'Waiting for technician approval');
    } catch (error) {
      Alert.alert('Error', 'Failed to send booking request.');
      console.error('Booking error:', error);
    }
  };

  const renderItem = ({ item }: { item: Technician }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name || 'Unnamed Technician'}</Text>
      <Text style={styles.info}>Rating: {item.rating ?? 'Not Rated'}</Text>
      <Text style={styles.info}>Completed Projects: {item.projectsCompleted ?? 0}</Text>
      <Text style={styles.info}>Currently Working: {item.currentlyWorking ? 'Yes' : 'No'}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => openWhatsApp(item.phone)} style={styles.iconBtn}>
          <FontAwesome name="whatsapp" size={24} color="#25D366" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookBtn} onPress={() => handleBook(item)}>
          <Text style={styles.btnText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Technicians in {area}</Text>
      <FlatList
        data={technicians}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No technicians found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  iconBtn: {
    backgroundColor: '#ffffffff',
    padding: 10,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#e4fea6ff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  bookBtn: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
  },
});
