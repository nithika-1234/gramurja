// import { FontAwesome } from '@expo/vector-icons';
// import { useLocalSearchParams } from 'expo-router';
// import { getAuth } from 'firebase/auth';
// import {
//   addDoc,
//   collection,
//   getDocs,
//   query,
//   serverTimestamp,
//   where,
// } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Button,
//   FlatList,
//   Linking,
//   Modal,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { db } from '../../firebase/config';


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
//   const [bookingStatuses, setBookingStatuses] = useState<{ [technicianId: string]: string }>({});


//   const { area } = useLocalSearchParams<{ area: string }>();
//   const [technicians, setTechnicians] = useState<Technician[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
//   const [phoneNumber, setPhoneNumber] = useState('');


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
//     const fetchBookingStatuses = async () => {
//   const auth = getAuth();
//   const currentUser = auth.currentUser;
//   if (!currentUser) return;


//   const q = query(
//     collection(db, 'bookingRequests'),
//     where('customerId', '==', currentUser.uid)
//   );
//   const snapshot = await getDocs(q);
//   const statuses: { [technicianId: string]: string } = {};
//   snapshot.forEach((doc) => {
//     const data = doc.data();
//     statuses[data.technicianId] = data.status;
//   });
//   setBookingStatuses(statuses);
// };


// fetchBookingStatuses();


//   }, [area]);


//   const openWhatsApp = (phone?: string) => {
//     if (!phone) return;
//     const formatted = phone.replace(/\D/g, '');
//     const url = `https://wa.me/${formatted}`;
//     Linking.openURL(url).catch(() => {
//       Alert.alert('Error', 'Unable to open WhatsApp');
//     });
//   };


//   const handleConfirmBooking = async () => {
//     const auth = getAuth();
//     const currentUser = auth.currentUser;


//     if (!currentUser || !selectedTechnician) return;


//     if (!phoneNumber.trim()) {
//       Alert.alert('Missing Info', 'Please enter your phone number.');
//       return;
//     }


//     try {
//       await addDoc(collection(db, 'bookingRequests'), {
//         technicianId: selectedTechnician.id,
//         technicianName: selectedTechnician.name,
//         customerId: currentUser.uid,
//         customerEmail: currentUser.email,
//         customerPhone: phoneNumber,
//         status: 'pending',
//         createdAt: serverTimestamp(),
//       });


//       Alert.alert('Booking Requested', 'Waiting for technician approval');
//       setModalVisible(false);
//       setPhoneNumber('');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to send booking request.');
//       console.error('Booking error:', error);
//     }
//   };


//   const handleBook = (technician: Technician) => {
//     setSelectedTechnician(technician);
//     setModalVisible(true);
//   };


//   const renderItem = ({ item }: { item: Technician }) => (
//     <View style={styles.card}>
//       <Text style={styles.name}>{item.name || 'Unnamed Technician'}</Text>
//       <Text style={styles.info}>Rating: {item.rating ?? 'Not Rated'}</Text>
//       <Text style={styles.info}>Completed Projects: {item.projectsCompleted ?? 0}</Text>
//       <Text style={styles.info}>Currently Working: {item.currentlyWorking ?? 0}</Text>


//       <View style={styles.buttonRow}>
//         <TouchableOpacity onPress={() => openWhatsApp(item.phone)} style={styles.iconBtn}>
//           <FontAwesome name="whatsapp" size={24} color="#25D366" />
//         </TouchableOpacity>


//         {/* <TouchableOpacity style={styles.bookBtn} onPress={() => handleBook(item)}>
//           <Text style={styles.btnText}>Book</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity
//   style={[
//     styles.bookBtn,
//     bookingStatuses[item.id] ? { backgroundColor: '#ccc' } : {},
//   ]}
//   onPress={() => handleBook(item)}
//   disabled={!!bookingStatuses[item.id]}
// >
//   <Text style={styles.btnText}>
//     {bookingStatuses[item.id]
//       ? `Status: ${bookingStatuses[item.id]}`
//       : 'Book'}
//   </Text>
// </TouchableOpacity>


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


//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={{ fontSize: 16, marginBottom: 10 }}>Enter your phone number:</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Phone Number"
//               value={phoneNumber}
//               keyboardType="phone-pad"
//               onChangeText={setPhoneNumber}
//             />
//             <Button title="Confirm Booking" onPress={handleConfirmBooking} />
//             <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
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
//   iconBtn: {
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
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     elevation: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
// });



//modified code



import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [bookingStatuses, setBookingStatuses] = useState<{ [technicianId: string]: string }>({});
  const { area } = useLocalSearchParams<{ area: string }>();
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

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

    const fetchBookingStatuses = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const q = query(
        collection(db, 'bookingRequests'),
        where('customerId', '==', currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const statuses: { [technicianId: string]: string } = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        statuses[data.technicianId] = data.status;
      });
      setBookingStatuses(statuses);
    };

    fetchTechnicians();
    fetchBookingStatuses();
  }, [area]);

  const openWhatsApp = (phone?: string) => {
    if (!phone) return;
    const formatted = phone.replace(/\D/g, '');
    const url = `https://wa.me/${formatted}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open WhatsApp');
    });
  };

  const handleConfirmBooking = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser || !selectedTechnician) return;

    if (!phoneNumber.trim()) {
      Alert.alert('Missing Info', 'Please enter your phone number.');
      return;
    }

    try {
      // Save booking request
      await addDoc(collection(db, 'bookingRequests'), {
        technicianId: selectedTechnician.id,
        technicianName: selectedTechnician.name,
        customerId: currentUser.uid,
        customerEmail: currentUser.email,
        customerPhone: phoneNumber,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // Save phone number to 'customers' collection
      await setDoc(
        doc(db, 'customers', currentUser.uid),
        {
          name: currentUser.displayName || '',
          email: currentUser.email || '',
          phone: phoneNumber,
        },
        { merge: true }
      );

      Alert.alert('Booking Requested', 'Waiting for technician approval');
      setModalVisible(false);
      setPhoneNumber('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send booking request.');
      console.error('Booking error:', error);
    }
  };

  const handleBook = (technician: Technician) => {
    setSelectedTechnician(technician);
    setModalVisible(true);
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

        <TouchableOpacity
          style={[
            styles.bookBtn,
            bookingStatuses[item.id] ? { backgroundColor: '#ccc' } : {},
          ]}
          onPress={() => handleBook(item)}
          disabled={!!bookingStatuses[item.id]}
        >
          <Text style={styles.btnText}>
            {bookingStatuses[item.id]
              ? `Status: ${bookingStatuses[item.id]}`
              : 'Book'}
          </Text>
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

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Enter your phone number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
            />
            <Button title="Confirm Booking" onPress={handleConfirmBooking} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#d3dfabff',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(248, 241, 241, 0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
