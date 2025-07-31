// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { db } from '../../firebase/config';

// type Customer = {
//   id: string;
//   name: string;
//   address: string;
//   systemSize: string;
//   technicianId: string;
//   technicianName: string;
//   createdAt: any; // Firebase Timestamp
// };

// export default function ViewCustomers() {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<'recent' | 'all'>('recent');

//   const fetchCustomers = async (recentOnly: boolean) => {
//     setLoading(true);
//     const technicianId = getAuth().currentUser?.uid;

//     let q;
//     if (recentOnly) {
//       const tenDaysAgo = Timestamp.fromDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));
//       q = query(
//         collection(db, 'customers'),
//         where('technicianId', '==', technicianId),
//         where('createdAt', '>=', tenDaysAgo)
//       );
//     } else {
//       q = query(
//         collection(db, 'customers'),
//         where('technicianId', '==', technicianId)
//       );
//     }

//     try {
//       const snapshot = await getDocs(q);
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Customer[];

//       setCustomers(data);
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCustomers(selectedOption === 'recent');
//   }, [selectedOption]);

//   const renderCustomer = ({ item }: { item: Customer }) => (
//     <View style={styles.card}>
//       <Text style={styles.name}>👤 {item.name}</Text>
//       <Text>📍 <Text style={{ fontWeight: '600' }}>Address:</Text> {item.address}</Text>
//       <Text>🔋 <Text style={{ fontWeight: '600' }}>System Size:</Text> {item.systemSize}</Text>
//       <Text>📅 <Text style={{ fontWeight: '600' }}>Date:</Text> {item.createdAt?.toDate().toLocaleDateString()}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>View Customers</Text>

//       <View style={styles.buttonContainer}>
//         <Pressable
//           style={[styles.tabButton, selectedOption === 'recent' && styles.selectedTab]}
//           onPress={() => setSelectedOption('recent')}
//         >
//           <Text style={styles.tabText}>Recent Projects</Text>
//         </Pressable>

//         <Pressable
//           style={[styles.tabButton, selectedOption === 'all' && styles.selectedTab]}
//           onPress={() => setSelectedOption('all')}
//         >
//           <Text style={styles.tabText}>View History</Text>
//         </Pressable>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 30 }} />
//       ) : customers.length === 0 ? (
//         <Text style={styles.noData}>No customers found.</Text>
//       ) : (
//         <FlatList
//           data={customers}
//           keyExtractor={(item) => item.id}
//           renderItem={renderCustomer}
//           contentContainerStyle={styles.list}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8F5E9',
//     padding: 20,
//     paddingTop: 50,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#065F46',
//     marginBottom: 25,
//     alignSelf: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   tabButton: {
//     flex: 1,
//     backgroundColor: '#02be09ff',
//     paddingVertical: 18,
//     marginHorizontal: 8,
//     borderRadius: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   selectedTab: {
//     backgroundColor: '#78ba7bff',
//   },
//   tabText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   list: {
//     paddingVertical: 20,
//     width: '100%',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 15,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//     borderWidth: 1,
//     borderColor: '#C8E6C9',
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2E7D32',
//     marginBottom: 8,
//   },
//   noData: {
//     fontSize: 16,
//     color: '#888',
//     marginTop: 30,
//     alignSelf: 'center',
//   },
// });













import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../../firebase/config';

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'recent' | 'history'>('recent');
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const customersRef = collection(db, 'customers');
        const bookingRef = collection(db, 'bookingRequests');
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

        const customerSnapshot = await getDocs(q);
        const customersList = customerSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const bookingSnapshot = await getDocs(
          query(bookingRef, where('technicianId', '==', currentUser.uid))
        );

        const bookingCustomerIds = bookingSnapshot.docs.map(doc => doc.data().customerId);

        const phoneMap = {};
        for (const id of bookingCustomerIds) {
          try {
            const customerDocRef = doc(db, 'customers', id);
            const customerSnap = await getDoc(customerDocRef);
            if (customerSnap.exists()) {
              const customerData = customerSnap.data();
              if (customerData.phone) {
                phoneMap[id] = customerData.phone;
              }
            }
          } catch (err) {
            console.error(`Error fetching phone for ${id}:`, err);
          }
        }

        const uidToDocIdMap = {};
        bookingSnapshot.docs.forEach(bookingDoc => {
          const data = bookingDoc.data();
          if (data.customerId && data.customerEmail) {
            const matched = customersList.find(c => c.email === data.customerEmail);
            if (matched) {
              uidToDocIdMap[data.customerId] = matched.id;
            }
          }
        });
        
        
        const feedbackSnapshot = await getDocs(
          query(
            collection(db, 'feedbacks'),
            where('technicianId', '==', currentUser.uid)
          )
        );

        const feedbackMap = {};
        feedbackSnapshot.forEach(doc => {
          const data = doc.data();
          const customerDocId = uidToDocIdMap[data.customerId];
          if (customerDocId) {
            feedbackMap[customerDocId] = {
              rating: data.rating,
              comment: data.comment,
            };
          }
        });

        const merged = customersList.map(customer => ({
          ...customer,
          phone: phoneMap[customer.id] || 'N/A',
          feedback: feedbackMap[customer.id] || null,
          showFeedback: false, // for toggling feedback
        }));

        setCustomers(merged);
      } catch (error) {
        console.error('Error fetching customers with phone and feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [filter]);

  const toggleFeedback = (id: string) => {
    setCustomers(prev =>
      prev.map(c =>
        c.id === id ? { ...c, showFeedback: !c.showFeedback } : c
      )
    );
  };





  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>👤 {item.name}</Text>
      <Text>📍 {item.address}</Text>
      <Text>⚡ System Size: {item.systemSize} kW</Text>
      <Text>📞 Contact: {item.phone}</Text>

      {item.feedback ? (
        <>
          <TouchableOpacity
            onPress={() => toggleFeedback(item.id)}
            style={styles.viewFeedbackBtn}
          >
            <Text style={styles.buttonText}>
              {item.showFeedback ? 'Hide Feedback' : 'View Feedback'}
            </Text>
          </TouchableOpacity>

          {item.showFeedback && (
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackTitle}>⭐ Feedback</Text>
              <Text>Rating: {item.feedback.rating} / 5</Text>
              <Text>Comment: {item.feedback.comment || 'No comment provided'}</Text>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.noFeedback}>No Feedback Yet</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => router.push(`/technician/update/success`)}
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
    <View style={{ flex: 1 }}>
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

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#283593" />
          <Text>Loading Customers...</Text>
        </View>
      ) : (
        <FlatList
          data={customers}
          keyExtractor={item => item.id}
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
  viewFeedbackBtn: {
    backgroundColor: '#FFC107',
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  feedbackContainer: {
    backgroundColor: '#FFF8E1',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  feedbackTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noFeedback: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#888',
  },
});