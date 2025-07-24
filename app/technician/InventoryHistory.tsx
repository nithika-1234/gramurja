// import { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { db } from '../../firebase/config';

// export default function InventoryHistory() {
//   const [history, setHistory] = useState<any[]>([]);

//   const fetchHistory = async () => {
//     try {
//       const q = query(collection(db, 'inventory-history'), orderBy('timestamp', 'desc'));
//       const snapshot = await getDocs(q);
//       const list: any[] = [];

//       snapshot.forEach((doc) => {
//         list.push({ id: doc.id, ...doc.data() });
//       });

//       setHistory(list);
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>📦 Inventory History</Text>

//       {history.map((entry, index) => (
//         <View key={index} style={styles.card}>
//           <Text style={styles.user}>{entry.user}</Text>
//           <Text style={entry.action === 'add' ? styles.actionAdd : styles.actionRemove}>
//             {entry.action === 'add' ? '➕' : '➖'}
//           </Text>
//           <Text style={styles.item}>{entry.item}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//     padding: 20,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginBottom: 24,
//     color: '#333',
//   },

//   card: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#F3F4F6',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 14,
//     marginBottom: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 2,
//   },

//   user: {
//     flex: 4,
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#374151',
//   },

//   actionAdd: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#16a34a', // green
//     textAlign: 'center',
//   },

//   actionRemove: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#dc2626', // red
//     textAlign: 'center',
//   },

//   item: {
//     flex: 3,
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'right',
//     color: '#1f2937',
//   },
// });
// Your imports remain the same


// import { MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { RootStackParamList } from '../../app/App';
// import { db } from '../../firebase/config';

// type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'InventoryHistory'>;

// export default function InventoryHistory() {
//   const [technicians, setTechnicians] = useState<string[]>([]);
//   const [selectedTech, setSelectedTech] = useState<string | null>(null);
//   const [history, setHistory] = useState<any[]>([]);
//   const navigation = useNavigation<NavigationProp>();

//   const extractNameFromEmail = (email: string): string => {
//     const [rawName] = email.split('@');
//     const parts = rawName.split(/[._]/);
//     return parts.map(part =>
//       part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
//     ).join(' ');
//   };

//   useEffect(() => {
//     const fetchTechnicians = async () => {
//       const snapshot = await getDocs(collection(db, 'inventory-history'));
//       const users = new Set<string>();
//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         if (data.user && typeof data.user === 'string') {
//           users.add(data.user.trim().toLowerCase());
//         }
//       });
//       setTechnicians(Array.from(users));
//     };
//     fetchTechnicians();
//   }, []);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       if (!selectedTech) return;
//       const q = query(
//         collection(db, 'inventory-history'),
//         where('user', '==', selectedTech)
//       );
//       const snapshot = await getDocs(q);
//       const logs: any[] = [];
//       snapshot.forEach((doc) => logs.push(doc.data()));
//       setHistory(logs);
//     };
//     fetchHistory();
//   }, [selectedTech]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>📦 Inventory History</Text>
//       <Text style={styles.subheading}>👨‍🔧 Select Technician</Text>

//       <FlatList
//         data={technicians}
//         keyExtractor={(item) => item}
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.techBox,
//               selectedTech === item && styles.selectedBox,
//             ]}
//             onPress={() => setSelectedTech(item)}
//           >
//             <MaterialIcons name="person" size={30} color="#444" />
//             <Text style={styles.techEmail}>{extractNameFromEmail(item)}</Text>
//           </TouchableOpacity>
//         )}
//         ListEmptyComponent={<Text style={styles.noTech}>No technicians found.</Text>}
//       />

//       {selectedTech && (
//         <>
//           <Text style={styles.selectedInfo}>
//             📋 Showing history for: {extractNameFromEmail(selectedTech)}
//           </Text>

//           <FlatList
//             data={history}
//             keyExtractor={(_, index) => index.toString()}
//             renderItem={({ item }) => (
//               <View
//                 style={[
//                   styles.historyCard,
//                   item.action === 'add'
//                     ? styles.addedCard
//                     : styles.removedCard,
//                 ]}
//               >
//                 <Text style={styles.historyItem}>
//                   {item.action === 'add' ? '➕ Added' : '➖ Removed'}{' '}
//                   <Text style={styles.itemName}>{item.item}</Text>
//                 </Text>
//                 <Text style={styles.timestamp}>
// {item.timestamp?.toDate().toLocaleDateString() || 'No date'}
//                 </Text>
//               </View>
//             )}
//             ListEmptyComponent={
//               <Text style={styles.noTech}>
//                 No history found for this technician.
//               </Text>
//             }
//           />
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f6f9ff',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#2a2a2a',
//   },
//   subheading: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1A237E',
//     marginBottom: 10,
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#E3F2FD',
//     borderRadius: 12,
//     textAlign: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.5,
//   },
//   techBox: {
//     backgroundColor: '#fff',
//     width: '48%',
//     marginBottom: 15,
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   selectedBox: {
//     backgroundColor: '#d0e9ff',
//     borderColor: '#57aaff',
//     borderWidth: 1,
//   },
//   techEmail: {
//     marginTop: 8,
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '500',
//   },
//   noTech: {
//     color: 'gray',
//     textAlign: 'center',
//     marginTop: 20,
//     fontStyle: 'italic',
//   },
//   selectedInfo: {
//     marginTop: 20,
//     fontSize: 15,
//     color: '#444',
//     fontStyle: 'italic',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   historyCard: {
//     padding: 12,
//     marginVertical: 6,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   addedCard: {
//     backgroundColor: '#e6ffed', // light green
//   },
//   removedCard: {
//     backgroundColor: '#ffe6e6', // light red
//   },
//   historyItem: {
//     fontSize: 15,
//     color: '#333',
//   },
//   itemName: {
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
//   timestamp: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 4,
//   },
// });








import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { db,auth } from "../../firebase/config";
import { RootStackParamList } from "../App";

type HistoryItem = {
  id: string;
  itemName: string;
  action: "added" | "removed";
  previousQuantity: number;
  newQuantity: number;
  date: string;
  timestamp: any;
  technicianId?: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const InventoryHistory = () => {
  const navigation = useNavigation<NavigationProp>();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
  try {
    setLoading(true);
    const technicianId = auth.currentUser?.uid;

    const q = query(
      collection(db, "inventory_history"),
      where("technicianId", "==", technicianId),
      orderBy("timestamp", "desc")
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as HistoryItem[];
    setHistory(data);
  } catch (error) {
    console.error("Error fetching history:", error);
    Alert.alert("Error", "Failed to load history");
  } finally {
    setLoading(false);
  }
};

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getActionColor = (action: string) => {
    return action === "added" ? "#4caf50" : "#f44336";
  };

  const getActionIcon = (action: string) => {
    return action === "added" ? "+" : "-";
  };

  const getQuantityChange = (item: HistoryItem) => {
    const change = item.newQuantity - item.previousQuantity;
    return change > 0 ? `+${change}` : `${change}`;
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={styles.loadingText}>Loading history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Technician Activity History</Text>
      
      {history.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No activity history found</Text>
          <Text style={styles.emptySubText}>Start adding or removing items to see history</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.itemNameContainer}>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  <View style={[
                    styles.actionBadge,
                    { backgroundColor: getActionColor(item.action) }
                  ]}>
                    <Text style={styles.actionIcon}>
                      {getActionIcon(item.action)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.dateText}>
                  {formatDate(item.date)}
                </Text>
              </View>
              
              <View style={styles.activityInfo}>
                <View style={styles.quantityRow}>
                  <Text style={styles.quantityLabel}>Previous:</Text>
                  <Text style={styles.quantityValue}>{item.previousQuantity}</Text>
                </View>
                <View style={styles.quantityRow}>
                  <Text style={styles.quantityLabel}>Current:</Text>
                  <Text style={styles.quantityValue}>{item.newQuantity}</Text>
                </View>
                <View style={styles.quantityRow}>
                  <Text style={styles.quantityLabel}>Change:</Text>
                  <Text style={[
                    styles.changeValue,
                    { color: getActionColor(item.action) }
                  ]}>
                    {getQuantityChange(item)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.actionContainer}>
                <Text style={[
                  styles.actionText,
                  { color: getActionColor(item.action) }
                ]}>
                  {item.action === "added" ? "ITEM ADDED" : "ITEM REMOVED"} BY TECHNICIAN
                </Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to Inventory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InventoryHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#2196f3",
    fontSize: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardHeader: {
    marginBottom: 12,
  },
  itemNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  actionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
  },
  activityInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  quantityLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  quantityValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  changeValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 8,
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
  backButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});