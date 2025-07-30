// import { useRouter } from 'expo-router';
// import { collection, getDocs } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { db } from '../../firebase/config';

// export default function ViewCustomers() {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'customers'));
//         const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setCustomers(list);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.name}>👤 {item.name}</Text>
//       <Text>📍 {item.address}</Text>
//       <Text>⚡ System Size: {item.systemSize} kW</Text>
//       <Text>📞 Contact: {item.phone || 'N/A'}</Text>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity
//           onPress={() => router.push(`/technician/update/${item.id}`)}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>Update</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => router.push(`/technician/status/${item.id}`)}
//           style={[styles.button, { backgroundColor: '#00796B' }]}
//         >
//           <Text style={styles.buttonText}>Status</Text>
//         </TouchableOpacity>

//         {/* 👇 NEW Generate Bill Button */}
//         <TouchableOpacity
//           onPress={() => router.push(`/technician/bill/${item.id}`)}
//           style={[styles.button, { backgroundColor: '#FF7043' }]}
//         >
//           <Text style={styles.buttonText}>Generate Bill</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return loading ? (
//     <View style={styles.loaderContainer}>
//       <ActivityIndicator size="large" color="#283593" />
//       <Text>Loading Customers...</Text>
//     </View>
//   ) : (
//     <FlatList
//       data={customers}
//       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//       contentContainerStyle={{ padding: 20 }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   card: {
//     backgroundColor: '#F5F5F5',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginBottom: 6,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginTop: 12,
//   },
//   button: {
//     backgroundColor: '#3F51B5',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });




// newcode


import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { db } from '../../firebase/config';


export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'recent' | 'history'>('recent'); // ⬅️ Track selected view
  const router = useRouter();
  const auth = getAuth();


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;
        if (!currentUser) return;


        const customersRef = collection(db, 'customers');
        let q;


        if (filter === 'recent') {
          const tenDaysAgo = Timestamp.fromDate(
            new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
          );


          q = query(
            customersRef,
            where('technicianId', '==', currentUser.uid),
            where('createdAt', '>=', tenDaysAgo)
          );
        } else {
          q = query(customersRef, where('technicianId', '==', currentUser.uid));
        }


        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomers(list);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchCustomers();
  }, [filter]); // ⬅️ Run useEffect when filter changes
 
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


        <TouchableOpacity
          onPress={() => router.push(`/technician/bill/${item.id}`)}
          style={[styles.button, { backgroundColor: '#FF7043' }]}
        >
          <Text style={styles.buttonText}>Generate Bill</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={{ flex: 1,backgroundColor: '#fff' }}>
      {/* Buttons for filter */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'recent' && styles.selectedFilterButton,
          ]}
          onPress={() => setFilter('recent')}
        >
          <Text style={styles.filterText}>Recent Projects</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'history' && styles.selectedFilterButton,
          ]}
          onPress={() => setFilter('history')}
        >
          <Text style={styles.filterText}>View History</Text>
        </TouchableOpacity>
      </View>


      {/* Loader or customer list */}
      {loading ? (
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
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
     backgroundColor: '#E8EAF6'
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#E8EAF6',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#C5CAE9',
  },
  selectedFilterButton: {
    backgroundColor: '#3F51B5',
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
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
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  button: {
    backgroundColor: '#3F51B5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});


