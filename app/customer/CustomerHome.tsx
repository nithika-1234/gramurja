// import { useRouter } from 'expo-router';
// import { getAuth } from 'firebase/auth';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { db } from '../../firebase/config';

// export default function CustomerHome() {
//   const router = useRouter();
//   const [customerId, setCustomerId] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCustomerDoc = async () => {
//       try {
//         const currentUser = getAuth().currentUser;
//         if (!currentUser) {
//           Alert.alert('Error', 'Customer not logged in');
//           return;
//         }

//         // 🔍 Query Firestore to find the customer document using email
//         const q = query(
//           collection(db, 'customers'),
//           where('email', '==', currentUser.email)
//         );

//         const snapshot = await getDocs(q);

//         if (!snapshot.empty) {
//           const doc = snapshot.docs[0];
//           setCustomerId(doc.id);
//         } else {
//           Alert.alert('Not Found', 'Customer data not found');
//         }
//       } catch (error) {
//         console.error('Error fetching customer:', error);
//         Alert.alert('Error', 'Could not load customer data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomerDoc();
//   }, []);

//   const handleViewStatus = () => {
//     if (customerId) {
//       router.push(`/customer/status/${customerId}`);
//     } else {
//       Alert.alert('Error', 'Customer ID not found');
//     }
//   };

//   const handleFeedback = () => {
//     router.push('/customer/feedback'); // ✅ We'll build this screen in Step 2
//   };


//  const handleViewBill = () => {
//   if (customerId) {
//     router.push(`/customer/bill/${customerId}`);
//   } else {
//     Alert.alert('Error', 'Customer ID not found');
//   }
// };













//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#283593" />
//         <Text style={{ marginTop: 10 }}>Loading your information...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Welcome to GramUrja ⚡</Text>

//       <TouchableOpacity style={styles.button} onPress={handleViewStatus}>
//         <Text style={styles.buttonText}>📍 View Installation Status</Text>
//       </TouchableOpacity>
      

// <TouchableOpacity style={styles.billButton} onPress={handleViewBill}>
//   <Text style={styles.billText}>🧾 View Bill</Text>
// </TouchableOpacity>







//       <TouchableOpacity style={styles.feedbackButton} onPress={handleFeedback}>
//         <Text style={styles.feedbackText}>💬 Give Feedback</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, padding: 30, alignItems: 'center',
//     justifyContent: 'center', backgroundColor: '#F5F5F5',
//   },
//   heading: {
//     fontSize: 22, fontWeight: 'bold', marginBottom: 40, textAlign: 'center', color: '#333',
//   },
//   button: {
//     backgroundColor: '#283593',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     marginBottom: 20,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   feedbackButton: {
//     borderColor: '#525ca5ff',
//     borderWidth: 1.5,
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },

// billButton: {
//   backgroundColor: '#4c8cafff',
//   paddingVertical: 15,
//   paddingHorizontal: 30,
//   borderRadius: 10,
//   marginBottom: 20,
//   width: '80%',
//   alignItems: 'center',
// },
// billText: {
//   color: '#fff',
//   fontSize: 16,
//   fontWeight: 'bold',
// },




















//   feedbackText: { color: '#283593', fontSize: 15, fontWeight: 'bold' },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../../firebase/config';


export default function CustomerHome() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCustomerDoc = async () => {
      try {
        const currentUser = getAuth().currentUser;
        if (!currentUser) {
          Alert.alert('Error', 'Customer not logged in');
          return;
        }


        const q = query(
          collection(db, 'customers'),
          where('email', '==', currentUser.email)
        );


        const snapshot = await getDocs(q);


        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setCustomerId(doc.id);
        } else {
          Alert.alert('Not Found', 'Customer data not found');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
        Alert.alert('Error', 'Could not load customer data');
      } finally {
        setLoading(false);
      }
    };


    fetchCustomerDoc();
  }, []);


  const handleViewStatus = () => {
    if (customerId) {
      router.push(`/customer/status/${customerId}`);
    } else {
      Alert.alert('Error', 'Customer ID not found');
    }
  };


  const handleViewBill = () => {
    if (customerId) {
      router.push(`/customer/bill/${customerId}`);
    } else {
      Alert.alert('Error', 'Customer ID not found');
    }
  };


  const handleSelectTechnician = () => {
    router.push('/customer/AreaSelection');
  };


  const handleFeedback = () => {
   // router.push('/customer/feedback');
  };


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#283593" />
        <Text style={{ marginTop: 10 }}>Loading your information...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to GramUrja ⚡</Text>


      <TouchableOpacity style={styles.button} onPress={handleViewStatus}>
        <Text style={styles.buttonText}>📍 View Installation Status</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.billButton} onPress={handleViewBill}>
        <Text style={styles.billText}>🧾 View Bill</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.selectButton} onPress={handleSelectTechnician}>
        <Text style={styles.selectText}>👷 Select Technician</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.feedbackButton} onPress={handleFeedback}>
        <Text style={styles.feedbackText}>💬 Give Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#283593',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  billButton: {
    backgroundColor: '#4648bdff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  billText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#393febff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  selectText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  feedbackButton: {
    borderColor: '#283593',
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  feedbackText: {
    color: '#283593',
    fontSize: 15,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});






