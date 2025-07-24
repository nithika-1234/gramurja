// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { useEffect, useState } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../firebase/config';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RootStackParamList } from '../../app/App'; // adjust path if needed

// type RouteProps = RouteProp<RootStackParamList, 'TechnicianDetails'>;


// export default function TechnicianDetails() {
//   // const route = useRoute();
// //   const { techEmail } = route.params;
// const route = useRoute<RouteProps>();
// const { techEmail } = route.params;



//   const [history, setHistory] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const q = query(
//         collection(db, 'inventory-history'),
//         where('user', '==', techEmail)
//       );

//       const snapshot = await getDocs(q);
//       const logs: any[] = [];
//       snapshot.forEach((doc) => logs.push(doc.data()));
//       setHistory(logs);
//     };

//     fetchHistory();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>📋 History for: {techEmail}</Text>
//       <FlatList
//         data={history}
//         keyExtractor={(_, i) => i.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.action}>
//               {item.action === 'add' ? '➕ Added' : '➖ Removed'}{' '}
//               <Text style={styles.item}>{item.item}</Text>
//             </Text>
//             <Text style={styles.timestamp}>
//               {item.timestamp?.toDate().toLocaleString() || 'No time'}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#eef5ff',
//   },
//   heading: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
  
//   card: {
//     backgroundColor: '#fff',
//     padding: 14,
//     marginBottom: 10,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   action: {
//     fontSize: 16,
//   },
//   item: {
//     fontWeight: 'bold',
//     color: '#0066cc',
//   },
//   timestamp: {
//     marginTop: 4,
//     color: '#666',
//     fontSize: 12,
//   },
// });
