
// import { addDoc, serverTimestamp } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'expo-router';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {
//   collection,
//   doc,
//   getDocs,
//   setDoc,
// } from 'firebase/firestore';
// import { ScrollView } from 'react-native'; // ✅ Add this

// import { auth, db } from '../../firebase/config';

// export default function Inventory() {
//   const router = useRouter();
//   const [items, setItems] = useState<{ name: string; count: number }[]>([]);

//   const fetchInventory = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, 'inventory_items'));
//       const list: { name: string; count: number }[] = [];

//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         list.push({ name: doc.id, count: data.count || 0 });
//       });

//       setItems(list);
//     } catch (error) {
//       console.error('Error fetching inventory:', error);
//     }
//   };

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const handleAdd = async (itemName: string) => {
//   const itemRef = doc(db, 'inventory_items', itemName);
//   const previousQuantity = items.find((i) => i.name === itemName)?.count || 0;
//   const newQuantity = previousQuantity + 1;

//   try {
//     await setDoc(itemRef, { count: newQuantity }, { merge: true });

//     const historyRef = collection(db, 'inventory-history');
//     await addDoc(historyRef, {
//       action: 'added',
//       date: new Date().toISOString(),
//       itemName,
//       previousQuantity,
//       newQuantity,
//       technicianId: auth.currentUser?.uid || 'unknown',
//       timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
//     });

//     fetchInventory();
//   } catch (err) {
//     console.error('Add error:', err);
//   }
// };

//   const handleRemove = async (itemName: string) => {
//   const itemRef = doc(db, 'inventory_items', itemName);
//   const previousQuantity = items.find((i) => i.name === itemName)?.count || 0;
//   const newQuantity = Math.max(previousQuantity - 1, 0);

//   try {
//     await setDoc(itemRef, { count: newQuantity }, { merge: true });

//     const historyRef = collection(db, 'inventory-history');
//     await addDoc(historyRef, {
//       action: 'removed',
//       date: new Date().toISOString(),
//       itemName,
//       previousQuantity,
//       newQuantity,
//       technicianId: auth.currentUser?.uid || 'unknown',
//       timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
//     });

//     fetchInventory();
//   } catch (err) {
//     console.error('Remove error:', err);
//   }
// };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Inventory Management</Text>
//           <ScrollView contentContainerStyle={styles.scrollContainer}>

//       {items.map((item, index) => (
       
//        <View key={index} style={styles.itemRow}>
//   <Text style={styles.itemName}>{item.name}</Text>

//   <Text style={styles.itemCount}>
//     {item.count} ✅
//   </Text>

//   <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item.name)}>
//     <Text style={styles.btnText}>Add</Text>
//   </TouchableOpacity>

//   <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.name)}>
//     <Text style={styles.btnText}>Remove</Text>
//   </TouchableOpacity>
  
// </View>


//       ))}

//       <TouchableOpacity style={styles.historyBtn} onPress={() => router.push('/technician/InventoryHistory')}>
//         <Text style={styles.historyText}>View History</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.back()}>
//         <Text style={styles.back}>⬅ Back</Text>
//       </TouchableOpacity>
//           </ScrollView>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },

//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },

//  itemRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   borderWidth: 1,
//   borderColor: '#ddd',
//   paddingVertical: 12,
//   paddingHorizontal: 10,
//   borderRadius: 10,
//   marginBottom: 10,
//   backgroundColor: '#fff',
//   gap: 8,
// },

// itemName: {
//   flex: 2,
//   fontSize: 16,
//   color: '#000',
//   fontWeight: '500',
// },

// itemCount: {
//   flex: 1.2,
//   fontSize: 15,
//   color: '#2e7d32',
//   textAlign: 'center',
// },

// addBtn: {
//   flex: 1,
//   backgroundColor: '#8E24AA',
//   paddingVertical: 10,
//   paddingHorizontal: 10,
//   borderRadius: 6,
//   alignItems: 'center',
//   width: '30%',
//   justifyContent: 'center',
// },

// removeBtn: {
//   flex: 1,
//   backgroundColor: '#F44336',
//   paddingVertical: 10,
//   paddingHorizontal: 10,
//   borderRadius: 6,
//   width: '30%',
//   alignItems: 'center',
//   justifyContent: 'center',
// },

// btnText: {
//   color: '#fff',
//   fontWeight: 'bold',
//   fontSize: 14,
// }
// ,

//   historyBtn: {
//     backgroundColor: '#1E88E5',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },

//   historyText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

//   back: {
//     marginTop: 20,
//     textAlign: 'center',
//     color: '#555',
//   },
// });









//Correct Output
import { addDoc, serverTimestamp, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { auth, db } from '../../firebase/config';

export default function Inventory() {
  const router = useRouter();
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]); // ✅ updated field name

  const fetchInventory = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'inventory_items'));
      const list: { name: string; quantity: number }[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({ name: doc.id, quantity: data.quantity || 0 }); // ✅ use quantity
      });

      setItems(list);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdd = async (itemName: string) => {
    const previousQuantity = items.find((i) => i.name === itemName)?.quantity || 0;
    const newQuantity = previousQuantity + 1;

    try {
      const itemRef = doc(db, 'inventory_items', itemName);
      await setDoc(itemRef, { quantity: newQuantity }, { merge: true });

      const historyRef = collection(db, 'inventory_history');
      await addDoc(historyRef, {
        action: 'added',
        itemName,
        previousQuantity,
        newQuantity,
        technicianId: auth.currentUser?.uid || 'unknown',
timestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
      });

      fetchInventory();
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const handleRemove = async (itemName: string) => {
    const previousQuantity = items.find((i) => i.name === itemName)?.quantity || 0;
    const newQuantity = Math.max(previousQuantity - 1, 0);

    try {
      const itemRef = doc(db, 'inventory_items', itemName);
      await setDoc(itemRef, { quantity: newQuantity }, { merge: true });

      const historyRef = collection(db, 'inventory_history');
      await addDoc(historyRef, {
        action: 'removed',
        itemName,
        previousQuantity,
        newQuantity,
        technicianId: auth.currentUser?.uid || 'unknown',
timestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
      });

      fetchInventory();
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inventory Management</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>

            <Text style={styles.itemCount}>
              {item.quantity} ✅
            </Text>

            <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item.name)}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.name)}>
              <Text style={styles.btnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.historyBtn} onPress={() => router.push('/technician/InventoryHistory')}>
          <Text style={styles.historyText}>View History</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>⬅ Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
scrollContainer: {
  paddingBottom: 100, // Adjust as needed
},
 itemRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: '#ddd',
  paddingVertical: 12,
  paddingHorizontal: 10,
  borderRadius: 10,
  marginBottom: 10,
  backgroundColor: '#fff',
  gap: 8,
},

itemName: {
  flex: 2,
  fontSize: 16,
  color: '#000',
  fontWeight: '500',
},

itemCount: {
  flex: 1.2,
  fontSize: 15,
  color: '#2e7d32',
  textAlign: 'center',
},

addBtn: {
  flex: 1,
  backgroundColor: '#8E24AA',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 6,
  alignItems: 'center',
  width: '30%',
  justifyContent: 'center',
},

removeBtn: {
  flex: 1,
  backgroundColor: '#F44336',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 6,
  width: '30%',
  alignItems: 'center',
  justifyContent: 'center',
},

btnText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
}
,

  historyBtn: {
    backgroundColor: '#1E88E5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  historyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  back: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
});

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView, Button, Alert } from "react-native";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import { db } from "../../firebase/config"; // adjust path accordingly

// type InventoryItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   price: number;
// };

// const InventoryScreen = () => {
//   const [items, setItems] = useState<InventoryItem[]>([]);
//   const [totalValue, setTotalValue] = useState<number>(0);

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, "inventory_items"));
//       const data: InventoryItem[] = snapshot.docs.map((docSnap) => ({
//         id: docSnap.id,
//         ...docSnap.data(),
//       })) as InventoryItem[];

//       const total = data.reduce((sum, item) => sum + item.quantity * item.price, 0);
//       setItems(data);
//       setTotalValue(total);
//     } catch (error) {
//       console.error("Error fetching inventory:", error);
//     }
//   };

//   const updateQuantity = async (item: InventoryItem, action: "add" | "remove") => {
//     const newQty = action === "add" ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
//     try {
//       const itemRef = doc(db, "inventory_items", item.id);
//       await updateDoc(itemRef, { quantity: newQty });
//       fetchInventory();
//     } catch (error) {
//       Alert.alert("Update Failed", "Could not update item quantity.");
//       console.error("Update error:", error);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Inventory Management</Text>
//       <Text style={styles.total}>Total Value: ₹{totalValue.toLocaleString()}</Text>

//       {items.map((item) => (
//         <View key={item.id} style={styles.card}>
//           <Text style={styles.name}>{item.name}</Text>
//           <Text>Qty: {item.quantity} {item.unit}</Text>
//           <Text>Price: ₹{item.price}</Text>

//           <View style={styles.row}>
//             <Button title="Add" onPress={() => updateQuantity(item, "add")} />
//             <Button title="Remove" onPress={() => updateQuantity(item, "remove")} />
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default InventoryScreen;

// const styles = StyleSheet.create({
//   container: { padding: 16, backgroundColor: "#fff", flex: 1 },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
//   total: { fontSize: 16, marginBottom: 20 },
//   card: {
//     backgroundColor: "#f2f2f2",
//     padding: 15,
//     marginBottom: 15,
//     borderRadius: 10,
//   },
//   name: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
//   row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
//});





// // import React, { useEffect, useState } from "react";
// // import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
// // import { Checkbox } from "react-native-paper"; // Install paper or use your checkbox
// // import { useNavigation } from "@react-navigation/native";
// // import { collection, getDocs } from "firebase/firestore";
// // import { db } from "../../firebase/config";
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../App'; // adjust path if needed

// // type InventoryItem = {
// //   id: string;
// //   name: string;
// //   quantity: number;
// //   unit: string;
// //   price: number;
// // };
// // type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SelectItems'>;
// // const navigation = useNavigation<NavigationProp>();


// // const SelectItemsScreen = () => {
// //   const [items, setItems] = useState<InventoryItem[]>([]);
// //   const [selected, setSelected] = useState<Set<string>>(new Set());

// //   const navigation = useNavigation();

// //   useEffect(() => {
// //     const fetchInventory = async () => {
// //       const snapshot = await getDocs(collection(db, "inventory_items"));
// //       const data = snapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       })) as InventoryItem[];
// //       setItems(data);
// //     };

// //     fetchInventory();
// //   }, []);

// //   const toggleSelect = (id: string) => {
// //     setSelected((prev) => {
// //       const copy = new Set(prev);
// //       copy.has(id) ? copy.delete(id) : copy.add(id);
// //       return copy;
// //     });
// //   };

// //   const handleSubmit = () => {
// //     const selectedItems = items.filter((item) => selected.has(item.id));
// //     // navigation.navigate("ManageQuantities" as never, { selectedItems } as never);
// //     navigation.navigate("ManageQuantities", { selectedItems });

// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.header}>Select Items</Text>
// //       {items.map((item) => (
// //         <View key={item.id} style={styles.card}>
// //           <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
// //             <Text>{item.name}</Text>
// //             <Checkbox
// //               status={selected.has(item.id) ? "checked" : "unchecked"}
// //               onPress={() => toggleSelect(item.id)}
// //             />
// //           </View>
// //         </View>
// //       ))}

// //       <Button title="Next → Manage Quantities" onPress={handleSubmit} disabled={selected.size === 0} />
// //     </ScrollView>
// //   );
// // };

// // export default SelectItemsScreen;

// // const styles = StyleSheet.create({
// //   container: { padding: 16, backgroundColor: "#fff" },
// //   header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
// //   card: {
// //     padding: 12,
// //     backgroundColor: "#eee",
// //     borderRadius: 8,
// //     marginBottom: 10,
// //   },
// // });





// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { auth, db } from "../../firebase/config"; // ✅ Import auth here
// import { RootStackParamList } from "../App";

// type InventoryItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   price: number;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const Inventory = () => {
// const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const [allItems, setAllItems] = useState<InventoryItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAllInventory();
//   }, []);

//   const fetchAllInventory = async () => {
//     try {
//       setLoading(true);
//       const snapshot = await getDocs(collection(db, "inventory_items"));
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as InventoryItem[];
//       setAllItems(data);
//     } catch (error) {
//       console.error("Error fetching inventory:", error);
//       Alert.alert("Error", "Failed to load inventory items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logHistory = async (
//     itemName: string,
//     action: "added" | "removed",
//     previousQty: number,
//     newQty: number
//   ) => {
//     try {
//       const technicianId = auth.currentUser?.uid; // ✅ Use Firebase UID

//       await addDoc(collection(db, "inventory_history"), {
//         itemName,
//         action,
//         previousQuantity: previousQty,
//         newQuantity: newQty,
//         timestamp: serverTimestamp(),
//         date: new Date().toISOString(),
//         technicianId: technicianId ?? "unknown", // fallback
//       });
//     } catch (error) {
//       console.error("Error logging history:", error);
//     }
//   };

//   const addQuantity = async (id: string) => {
//     const currentItem = allItems.find(item => item.id === id);
//     if (!currentItem) return;

//     try {
//       const newQuantity = currentItem.quantity + 1;

//       const updatedItems = allItems.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       );
//       setAllItems(updatedItems);

//       await updateDoc(doc(db, "inventory_items", id), {
//         quantity: newQuantity,
//       });

//       await logHistory(currentItem.name, "added", currentItem.quantity, newQuantity);

//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       Alert.alert("Error", "Failed to update quantity");
//       setAllItems(allItems.map(item =>
//         item.id === id ? { ...item, quantity: currentItem.quantity } : item
//       ));
//     }
//   };

//   const removeQuantity = async (id: string) => {
//     const currentItem = allItems.find(item => item.id === id);
//     if (!currentItem) return;

//     if (currentItem.quantity <= 0) {
//       Alert.alert("Cannot Remove", "Quantity cannot be less than 0");
//       return;
//     }

//     try {
//       const newQuantity = currentItem.quantity - 1;

//       const updatedItems = allItems.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       );
//       setAllItems(updatedItems);

//       await updateDoc(doc(db, "inventory_items", id), {
//         quantity: newQuantity,
//       });

//       await logHistory(currentItem.name, "removed", currentItem.quantity, newQuantity);

//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       Alert.alert("Error", "Failed to update quantity");
//       setAllItems(allItems.map(item =>
//         item.id === id ? { ...item, quantity: currentItem.quantity } : item
//       ));
//     }
//   };

//   const handleViewHistory = () => {
//   // const technicianId = auth.currentUser?.uid;
//   // if (technicianId) {
//   //   navigation.navigate('InventoryHistory');
//   // } else {
//   //   Alert.alert("Error", "Technician not logged in");
//   // }
//     navigation.navigate('InventoryHistory'); // ✅ No params needed

// };


//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centered]}>
//         <ActivityIndicator size="large" color="#2196f3" />
//         <Text style={styles.loadingText}>Loading inventory...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Inventory Management</Text>

//       <FlatList
//         data={allItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <View style={styles.itemInfo}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <View style={styles.quantityContainer}>
//                 <Text style={styles.quantity}>{item.quantity}</Text>
//                 <View style={styles.checkIcon}>
//                   <Text style={styles.checkText}>✓</Text>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 onPress={() => addQuantity(item.id)}
//                 style={[styles.button, styles.addButton]}
//               >
//                 <Text style={styles.buttonText}>Add</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => removeQuantity(item.id)}
//                 style={[styles.button, styles.removeButton]}
//               >
//                 <Text style={styles.buttonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />

//       <View style={styles.footer}>
//         <TouchableOpacity
//           onPress={handleViewHistory}
//           style={styles.historyButton}
//         >
//           <Text style={styles.historyButtonText}>View History</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Inventory;

// const styles = StyleSheet.create({
//   // keep your styles as-is
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 16,
//   },
//   centered: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#2196f3",
//     fontSize: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: "#e0e0e0",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   itemInfo: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#000",
//     flex: 1,
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 16,
//   },
//   quantity: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#000",
//     marginRight: 8,
//   },
//   checkIcon: {
//     backgroundColor: "#4caf50",
//     borderRadius: 12,
//     width: 24,
//     height: 24,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   checkText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 8,
//     minWidth: 70,
//     alignItems: "center",
//   },
//   addButton: {
//     backgroundColor: "#9c27b0",
//   },
//   removeButton: {
//     backgroundColor: "#f44336",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 20,
//     left: 16,
//     right: 16,
//   },
//   historyButton: {
//     backgroundColor: "#2196f3",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   historyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });



