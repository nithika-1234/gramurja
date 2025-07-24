// // import React, { useState } from "react";
// // import { View, Text, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from "react-native";
// // import { updateDoc, doc } from "firebase/firestore";
// // import { db } from "../../firebase/config";
// // import { RouteProp, useRoute } from "@react-navigation/native";
// // import { Ionicons } from "@expo/vector-icons";

// // type InventoryItem = {
// //   id: string;
// //   name: string;
// //   quantity: number;
// //   unit: string;
// //   price: number;
// // };

// // type RouteParams = {
// //   selectedItems: InventoryItem[];
// // };

// // const ManageQuantitiesScreen = () => {
// //   const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
// //   const [items, setItems] = useState<InventoryItem[]>(route.params.selectedItems);

// //   const updateQuantity = async (item: InventoryItem, action: "add" | "remove") => {
// //     const newQty = action === "add" ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
// //     try {
// //       const itemRef = doc(db, "inventory_items", item.id);
// //       await updateDoc(itemRef, { quantity: newQty });
// //       setItems((prev) =>
// //         prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
// //       );
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to update quantity.");
// //     }
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.header}>Manage Selected Items</Text>
// //       {items.map((item) => (
// //         <View key={item.id} style={styles.card}>
// //           <View style={styles.rowSpace}>
// //             <Text style={styles.name}>{item.name}</Text>
// //             <Text style={styles.price}>₹{item.price}</Text>
// //           </View>
// //           <Text style={styles.unit}>Quantity: {item.quantity} {item.unit}</Text>
// //           <View style={styles.buttonRow}>
// //             <TouchableOpacity
// //               style={styles.button}
// //               onPress={() => updateQuantity(item, "add")}
// //             >
// //               <Ionicons name="add-circle-outline" size={24} color="white" />
// //               <Text style={styles.buttonText}>Add</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               style={[styles.button, styles.removeButton]}
// //               onPress={() => updateQuantity(item, "remove")}
// //             >
// //               <Ionicons name="remove-circle-outline" size={24} color="white" />
// //               <Text style={styles.buttonText}>Remove</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       ))}
// //     </ScrollView>
// //   );
// // };

// // export default ManageQuantitiesScreen;

// // const styles = StyleSheet.create({
// //   container: { padding: 16, backgroundColor: "#f5fff5", flex: 1 },
// //   header: { fontSize: 24, fontWeight: "bold", color: "#2e7d32", marginBottom: 16, textAlign: "center" },
// //   card: {
// //     backgroundColor: "#e8f5e9",
// //     padding: 16,
// //     borderRadius: 12,
// //     marginBottom: 16,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 3,
// //     elevation: 3,
// //   },
// //   rowSpace: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginBottom: 6,
// //   },
// //   name: { fontSize: 18, fontWeight: "600", color: "#1b5e20" },
// //   price: { fontSize: 16, color: "#4caf50", fontWeight: "bold" },
// //   unit: { color: "#555", marginBottom: 10 },
// //   buttonRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //   },
// //   button: {
// //     backgroundColor: "#2e7d32",
// //     paddingVertical: 8,
// //     paddingHorizontal: 20,
// //     borderRadius: 8,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 6,
// //   },
// //   removeButton: {
// //     backgroundColor: "#c62828",
// //   },
// //   buttonText: {
// //     color: "#fff",
// //     fontWeight: "600",
// //   },
// // });



// // import { Ionicons } from "@expo/vector-icons";
// // import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// // import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// // import { doc, updateDoc } from "firebase/firestore";
// // import React, { useState } from "react";
// // import {
// //     ActivityIndicator,
// //     Alert,
// //     ScrollView,
// //     StyleSheet,
// //     Text,
// //     TouchableOpacity,
// //     View,
// // } from "react-native";
// // import { db } from "../../firebase/config";
// // import { RootStackParamList } from "../App";

// // type InventoryItem = {
// //   id: string;
// //   name: string;
// //   quantity: number;
// //   unit: string;
// //   price: number;
// // };

// // type RouteParams = {
// //   ManageQuantities: {
// //     selectedItems: InventoryItem[];
// //   };
// // };

// // type NavigationProp = NativeStackNavigationProp<
// //   RootStackParamList,
// //   "ManageQuantities"
// // >;

// // const ManageQuantitiesScreen = () => {
// //   const route = useRoute<RouteProp<RouteParams, "ManageQuantities">>();
// //   const navigation = useNavigation<NavigationProp>();
// //   const [items, setItems] = useState<InventoryItem[]>(route.params.selectedItems);
// //   const [updating, setUpdating] = useState<string | null>(null);

// //   const updateQuantity = async (item: InventoryItem, action: "add" | "remove") => {
// //     const newQty = action === "add" ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
    
// //     setUpdating(item.id);
    
// //     try {
// //       const itemRef = doc(db, "inventory_items", item.id);
// //       await updateDoc(itemRef, { quantity: newQty });
      
// //       setItems((prev) =>
// //         prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
// //       );
      
// //       // Show success feedback
// //       if (action === "add") {
// //         // Optional: You can add a toast or brief success message here
// //       }
// //     } catch (error) {
// //       console.error("Error updating quantity:", error);
// //       Alert.alert("Error", "Failed to update quantity. Please try again.");
// //     } finally {
// //       setUpdating(null);
// //     }
// //   };

// //   const handleBulkUpdate = (action: "add" | "remove") => {
// //     Alert.alert(
// //       `${action === "add" ? "Add" : "Remove"} Quantity`,
// //       `${action === "add" ? "Add 1 to" : "Remove 1 from"} all selected items?`,
// //       [
// //         { text: "Cancel", style: "cancel" },
// //         {
// //           text: "Confirm",
// //           onPress: () => {
// //             items.forEach((item) => {
// //               updateQuantity(item, action);
// //             });
// //           },
// //         },
// //       ]
// //     );
// //   };

// //   const getTotalValue = () => {
// //     return items.reduce((total, item) => total + (item.quantity * item.price), 0);
// //   };

// //   const goBack = () => {
// //     navigation.goBack();
// //   };

// //   if (!route.params?.selectedItems || route.params.selectedItems.length === 0) {
// //     return (
// //       <View style={[styles.container, styles.centered]}>
// //         <Text style={styles.emptyText}>No items selected</Text>
// //         <TouchableOpacity style={styles.backButton} onPress={goBack}>
// //           <Text style={styles.backButtonText}>Go Back</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.headerContainer}>
// //         <TouchableOpacity onPress={goBack} style={styles.backIcon}>
// //           <Ionicons name="arrow-back" size={24} color="#2e7d32" />
// //         </TouchableOpacity>
// //         <Text style={styles.header}>Manage Selected Items</Text>
// //         <View style={styles.placeholder} />
// //       </View>

// //       <View style={styles.summaryContainer}>
// //         <Text style={styles.summaryText}>
// //           {items.length} items selected • Total Value: ₹{getTotalValue().toFixed(2)}
// //         </Text>
// //       </View>

// //       <View style={styles.bulkActionsContainer}>
// //         <TouchableOpacity
// //           style={[styles.bulkButton, styles.addAllButton]}
// //           onPress={() => handleBulkUpdate("add")}
// //         >
// //           <Ionicons name="add-circle-outline" size={20} color="white" />
// //           <Text style={styles.bulkButtonText}>Add All</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={[styles.bulkButton, styles.removeAllButton]}
// //           onPress={() => handleBulkUpdate("remove")}
// //         >
// //           <Ionicons name="remove-circle-outline" size={20} color="white" />
// //           <Text style={styles.bulkButtonText}>Remove All</Text>
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
// //         {items.map((item) => (
// //           <View key={item.id} style={styles.card}>
// //             <View style={styles.itemHeader}>
// //               <View style={styles.itemInfo}>
// //                 <Text style={styles.name}>{item.name}</Text>
// //                 <Text style={styles.price}>₹{item.price.toFixed(2)} per {item.unit}</Text>
// //               </View>
// //               <Text style={styles.totalValue}>
// //                 ₹{(item.quantity * item.price).toFixed(2)}
// //               </Text>
// //             </View>
            
// //             <Text style={styles.unit}>
// //               Current Quantity: {item.quantity} {item.unit}
// //             </Text>
            
// //             <View style={styles.buttonRow}>
// //               <TouchableOpacity
// //                 style={[
// //                   styles.button,
// //                   updating === item.id && styles.buttonDisabled
// //                 ]}
// //                 onPress={() => updateQuantity(item, "add")}
// //                 disabled={updating === item.id}
// //               >
// //                 {updating === item.id ? (
// //                   <ActivityIndicator size={20} color="white" />
// //                 ) : (
// //                   <Ionicons name="add-circle-outline" size={24} color="white" />
// //                 )}
// //                 <Text style={styles.buttonText}>Add</Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity
// //                 style={[
// //                   styles.button,
// //                   styles.removeButton,
// //                   (updating === item.id || item.quantity === 0) && styles.buttonDisabled
// //                 ]}
// //                 onPress={() => updateQuantity(item, "remove")}
// //                 disabled={updating === item.id || item.quantity === 0}
// //               >
// //                 {updating === item.id ? (
// //                   <ActivityIndicator size={20} color="white" />
// //                 ) : (
// //                   <Ionicons name="remove-circle-outline" size={24} color="white" />
// //                 )}
// //                 <Text style={styles.buttonText}>Remove</Text>
// //               </TouchableOpacity>
// //             </View>
            
// //             {item.quantity === 0 && (
// //               <Text style={styles.outOfStockText}>Out of Stock</Text>
// //             )}
// //           </View>
// //         ))}
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default ManageQuantitiesScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#f5fff5",
// //   },
// //   centered: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   headerContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     backgroundColor: "#fff",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#e0e0e0",
// //   },
// //   backIcon: {
// //     padding: 4,
// //   },
// //   header: {
// //     flex: 1,
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     color: "#2e7d32",
// //     textAlign: "center",
// //   },
// //   placeholder: {
// //     width: 32,
// //   },
// //   summaryContainer: {
// //     backgroundColor: "#e8f5e9",
// //     padding: 12,
// //     margin: 16,
// //     borderRadius: 8,
// //   },
// //   summaryText: {
// //     textAlign: "center",
// //     color: "#2e7d32",
// //     fontWeight: "600",
// //     fontSize: 16,
// //   },
// //   bulkActionsContainer: {
// //     flexDirection: "row",
// //     paddingHorizontal: 16,
// //     marginBottom: 10,
// //     gap: 10,
// //   },
// //   bulkButton: {
// //     flex: 1,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: 10,
// //     borderRadius: 8,
// //     gap: 6,
// //   },
// //   addAllButton: {
// //     backgroundColor: "#2e7d32",
// //   },
// //   removeAllButton: {
// //     backgroundColor: "#c62828",
// //   },
// //   bulkButtonText: {
// //     color: "#fff",
// //     fontWeight: "600",
// //     fontSize: 14,
// //   },
// //   scrollArea: {
// //     flex: 1,
// //     paddingHorizontal: 16,
// //   },
// //   card: {
// //     backgroundColor: "#e8f5e9",
// //     padding: 16,
// //     borderRadius: 12,
// //     marginBottom: 16,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 3,
// //     elevation: 3,
// //     borderWidth: 1,
// //     borderColor: "#c8e6c9",
// //   },
// //   itemHeader: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "flex-start",
// //     marginBottom: 8,
// //   },
// //   itemInfo: {
// //     flex: 1,
// //   },
// //   name: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //     color: "#1b5e20",
// //     marginBottom: 4,
// //   },
// //   price: {
// //     fontSize: 14,
// //     color: "#4caf50",
// //     fontWeight: "500",
// //   },
// //   totalValue: {
// //     fontSize: 16,
// //     color: "#2e7d32",
// //     fontWeight: "bold",
// //   },
// //   unit: {
// //     color: "#555",
// //     marginBottom: 12,
// //     fontSize: 14,
// //   },
// //   buttonRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     gap: 10,
// //   },
// //   button: {
// //     backgroundColor: "#2e7d32",
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     borderRadius: 8,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 6,
// //     flex: 1,
// //     justifyContent: "center",
// //   },
// //   removeButton: {
// //     backgroundColor: "#c62828",
// //   },
// //   buttonDisabled: {
// //     backgroundColor: "#cccccc",
// //   },
// //   buttonText: {
// //     color: "#fff",
// //     fontWeight: "600",
// //     fontSize: 14,
// //   },
// //   outOfStockText: {
// //     textAlign: "center",
// //     color: "#c62828",
// //     fontWeight: "600",
// //     marginTop: 8,
// //     fontSize: 14,
// //   },
// //   emptyText: {
// //     fontSize: 18,
// //     color: "#666",
// //     marginBottom: 20,
// //   },
// //   backButton: {
// //     backgroundColor: "#2e7d32",
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //     borderRadius: 8,
// //   },
// //   backButtonText: {
// //     color: "#fff",
// //     fontWeight: "600",
// //   },
// // });











// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { updateDoc, doc } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";

// type InventoryItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   price: number;
// };

// const ManageQuantitiesScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const [items, setItems] = useState<InventoryItem[]>([]);
//   const [updating, setUpdating] = useState<string | null>(null);

//   useEffect(() => {
//     // Get the selected items from route params
//     console.log("Route params:", route.params); // Debug log
    
//     if (route.params && (route.params as any)?.selectedItems) {
//       const selectedItems = (route.params as any).selectedItems;
//       console.log("Selected items received:", selectedItems); // Debug log
//       setItems(selectedItems);
//     } else {
//       console.log("No route params or selectedItems found"); // Debug log
//       // Don't show alert immediately, wait a bit for params to load
//       setTimeout(() => {
//         if (!route.params || !(route.params as any)?.selectedItems) {
//           Alert.alert("Error", "No items selected", [
//             { text: "OK", onPress: () => navigation.goBack() }
//           ]);
//         }
//       }, 1000);
//     }
//   }, [route.params, navigation]);

//   const updateQuantity = async (item: InventoryItem, action: "add" | "remove") => {
//     const newQty = action === "add" ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
    
//     setUpdating(item.id);
    
//     try {
//       const itemRef = doc(db, "inventory_items", item.id);
//       await updateDoc(itemRef, { quantity: newQty });
      
//       setItems((prev) =>
//         prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
//       );
      
//       // Show success feedback
//       if (action === "add") {
//         // Optional: You can add a toast or brief success message here
//       }
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       Alert.alert("Error", "Failed to update quantity. Please try again.");
//     } finally {
//       setUpdating(null);
//     }
//   };

//   const handleBulkUpdate = (action: "add" | "remove") => {
//     Alert.alert(
//       `${action === "add" ? "Add" : "Remove"} Quantity`,
//       `${action === "add" ? "Add 1 to" : "Remove 1 from"} all selected items?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Confirm",
//           onPress: () => {
//             items.forEach((item) => {
//               updateQuantity(item, action);
//             });
//           },
//         },
//       ]
//     );
//   };

//   const getTotalValue = () => {
//     return items.reduce((total, item) => total + (item.quantity * item.price), 0);
//   };

//   const goBack = () => {
//     navigation.goBack();
//   };

//   if (items.length === 0) {
//     return (
//       <View style={[styles.container, styles.centered]}>
//         <ActivityIndicator size="large" color="#2e7d32" />
//         <Text style={styles.loadingText}>Loading selected items...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={goBack} style={styles.backIcon}>
//           <Ionicons name="arrow-back" size={24} color="#2e7d32" />
//         </TouchableOpacity>
//         <Text style={styles.header}>Manage Selected Items</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <View style={styles.summaryContainer}>
//         <Text style={styles.summaryText}>
//           {items.length} items selected • Total Value: ₹{getTotalValue().toFixed(2)}
//         </Text>
//       </View>

//       <View style={styles.bulkActionsContainer}>
//         <TouchableOpacity
//           style={[styles.bulkButton, styles.addAllButton]}
//           onPress={() => handleBulkUpdate("add")}
//         >
//           <Ionicons name="add-circle-outline" size={20} color="white" />
//           <Text style={styles.bulkButtonText}>Add All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.bulkButton, styles.removeAllButton]}
//           onPress={() => handleBulkUpdate("remove")}
//         >
//           <Ionicons name="remove-circle-outline" size={20} color="white" />
//           <Text style={styles.bulkButtonText}>Remove All</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
//         {items.map((item) => (
//           <View key={item.id} style={styles.card}>
//             <View style={styles.itemHeader}>
//               <View style={styles.itemInfo}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.price}>₹{item.price.toFixed(2)} per {item.unit}</Text>
//               </View>
//               <Text style={styles.totalValue}>
//                 ₹{(item.quantity * item.price).toFixed(2)}
//               </Text>
//             </View>
            
//             <Text style={styles.unit}>
//               Current Quantity: {item.quantity} {item.unit}
//             </Text>
            
//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 style={[
//                   styles.button,
//                   updating === item.id && styles.buttonDisabled
//                 ]}
//                 onPress={() => updateQuantity(item, "add")}
//                 disabled={updating === item.id}
//               >
//                 {updating === item.id ? (
//                   <ActivityIndicator size={20} color="white" />
//                 ) : (
//                   <Ionicons name="add-circle-outline" size={24} color="white" />
//                 )}
//                 <Text style={styles.buttonText}>Add</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 style={[
//                   styles.button,
//                   styles.removeButton,
//                   (updating === item.id || item.quantity === 0) && styles.buttonDisabled
//                 ]}
//                 onPress={() => updateQuantity(item, "remove")}
//                 disabled={updating === item.id || item.quantity === 0}
//               >
//                 {updating === item.id ? (
//                   <ActivityIndicator size={20} color="white" />
//                 ) : (
//                   <Ionicons name="remove-circle-outline" size={24} color="white" />
//                 )}
//                 <Text style={styles.buttonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
            
//             {item.quantity === 0 && (
//               <Text style={styles.outOfStockText}>Out of Stock</Text>
//             )}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default ManageQuantitiesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5fff5",
//   },
//   centered: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//   },
//   backIcon: {
//     padding: 4,
//   },
//   header: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#2e7d32",
//     textAlign: "center",
//   },
//   placeholder: {
//     width: 32,
//   },
//   summaryContainer: {
//     backgroundColor: "#e8f5e9",
//     padding: 12,
//     margin: 16,
//     borderRadius: 8,
//   },
//   summaryText: {
//     textAlign: "center",
//     color: "#2e7d32",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   bulkActionsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 16,
//     marginBottom: 10,
//     gap: 10,
//   },
//   bulkButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 10,
//     borderRadius: 8,
//     gap: 6,
//   },
//   addAllButton: {
//     backgroundColor: "#2e7d32",
//   },
//   removeAllButton: {
//     backgroundColor: "#c62828",
//   },
//   bulkButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   scrollArea: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   card: {
//     backgroundColor: "#e8f5e9",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: "#c8e6c9",
//   },
//   itemHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 8,
//   },
//   itemInfo: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1b5e20",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 14,
//     color: "#4caf50",
//     fontWeight: "500",
//   },
//   totalValue: {
//     fontSize: 16,
//     color: "#2e7d32",
//     fontWeight: "bold",
//   },
//   unit: {
//     color: "#555",
//     marginBottom: 12,
//     fontSize: 14,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     gap: 10,
//   },
//   button: {
//     backgroundColor: "#2e7d32",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     flex: 1,
//     justifyContent: "center",
//   },
//   removeButton: {
//     backgroundColor: "#c62828",
//   },
//   buttonDisabled: {
//     backgroundColor: "#cccccc",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   outOfStockText: {
//     textAlign: "center",
//     color: "#c62828",
//     fontWeight: "600",
//     marginTop: 8,
//     fontSize: 14,
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#2e7d32",
//     fontSize: 16,
//   },
// });












// import { Ionicons } from "@expo/vector-icons";
// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { doc, updateDoc } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import {
//     ActivityIndicator,
//     Alert,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { db } from "../../firebase/config";
// import { InventoryItem, RootStackParamList } from "../App";

// type ManageQuantitiesRouteProp = RouteProp<RootStackParamList, 'ManageQuantities'>;
// type ManageQuantitiesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ManageQuantities'>;

// const ManageQuantitiesScreen = () => {
//   const route = useRoute<ManageQuantitiesRouteProp>();
//   const navigation = useNavigation<ManageQuantitiesNavigationProp>();
//   const [items, setItems] = useState<InventoryItem[]>([]);
//   const [updating, setUpdating] = useState<string | null>(null);

//   useEffect(() => {
//     // Get the selected items from route params
//     console.log("Route params:", route.params); // Debug log
    
//     if (route.params?.selectedItems) {
//       const selectedItems = route.params.selectedItems;
//       console.log("Selected items received:", selectedItems); // Debug log
//       setItems(selectedItems);
//     } else {
//       console.log("No selectedItems found in route params"); // Debug log
//       Alert.alert("Error", "No items selected", [
//         { text: "OK", onPress: () => navigation.goBack() }
//       ]);
//     }
//   }, [route.params, navigation]);

//   const updateQuantity = async (item: InventoryItem, action: "add" | "remove") => {
//     const newQty = action === "add" ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
    
//     setUpdating(item.id);
    
//     try {
//       const itemRef = doc(db, "inventory_items", item.id);
//       await updateDoc(itemRef, { quantity: newQty });
      
//       setItems((prev) =>
//         prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
//       );
      
//       console.log(`Updated ${item.name} quantity to ${newQty}`); // Debug log
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       Alert.alert("Error", "Failed to update quantity. Please try again.");
//     } finally {
//       setUpdating(null);
//     }
//   };

//   const handleBulkUpdate = (action: "add" | "remove") => {
//     Alert.alert(
//       `${action === "add" ? "Add" : "Remove"} Quantity`,
//       `${action === "add" ? "Add 1 to" : "Remove 1 from"} all selected items?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Confirm",
//           onPress: async () => {
//             for (const item of items) {
//               await updateQuantity(item, action);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const getTotalValue = () => {
//     return items.reduce((total, item) => total + (item.quantity * item.price), 0);
//   };

//   const goBack = () => {
//     navigation.goBack();
//   };

//   if (items.length === 0) {
//     return (
//       <View style={[styles.container, styles.centered]}>
//         <ActivityIndicator size="large" color="#2e7d32" />
//         <Text style={styles.loadingText}>Loading selected items...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={goBack} style={styles.backIcon}>
//           <Ionicons name="arrow-back" size={24} color="#2e7d32" />
//         </TouchableOpacity>
//         <Text style={styles.header}>Manage Selected Items</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <View style={styles.summaryContainer}>
//         <Text style={styles.summaryText}>
//           {items.length} items selected • Total Value: ₹{getTotalValue().toFixed(2)}
//         </Text>
//       </View>

//       <View style={styles.bulkActionsContainer}>
//         <TouchableOpacity
//           style={[styles.bulkButton, styles.addAllButton]}
//           onPress={() => handleBulkUpdate("add")}
//         >
//           <Ionicons name="add-circle-outline" size={20} color="white" />
//           <Text style={styles.bulkButtonText}>Add All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.bulkButton, styles.removeAllButton]}
//           onPress={() => handleBulkUpdate("remove")}
//         >
//           <Ionicons name="remove-circle-outline" size={20} color="white" />
//           <Text style={styles.bulkButtonText}>Remove All</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
//         {items.map((item) => (
//           <View key={item.id} style={styles.card}>
//             <View style={styles.itemHeader}>
//               <View style={styles.itemInfo}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.price}>₹{item.price.toFixed(2)} per {item.unit}</Text>
//               </View>
//               <Text style={styles.totalValue}>
//                 ₹{(item.quantity * item.price).toFixed(2)}
//               </Text>
//             </View>
            
//             <Text style={styles.unit}>
//               Current Quantity: {item.quantity} {item.unit}
//             </Text>
            
//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 style={[
//                   styles.button,
//                   updating === item.id && styles.buttonDisabled
//                 ]}
//                 onPress={() => updateQuantity(item, "add")}
//                 disabled={updating === item.id}
//               >
//                 {updating === item.id ? (
//                   <ActivityIndicator size={20} color="white" />
//                 ) : (
//                   <Ionicons name="add-circle-outline" size={24} color="white" />
//                 )}
//                 <Text style={styles.buttonText}>Add</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 style={[
//                   styles.button,
//                   styles.removeButton,
//                   (updating === item.id || item.quantity === 0) && styles.buttonDisabled
//                 ]}
//                 onPress={() => updateQuantity(item, "remove")}
//                 disabled={updating === item.id || item.quantity === 0}
//               >
//                 {updating === item.id ? (
//                   <ActivityIndicator size={20} color="white" />
//                 ) : (
//                   <Ionicons name="remove-circle-outline" size={24} color="white" />
//                 )}
//                 <Text style={styles.buttonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
            
//             {item.quantity === 0 && (
//               <Text style={styles.outOfStockText}>Out of Stock</Text>
//             )}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default ManageQuantitiesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5fff5",
//   },
//   centered: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//   },
//   backIcon: {
//     padding: 4,
//   },
//   header: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#2e7d32",
//     textAlign: "center",
//   },
//   placeholder: {
//     width: 32,
//   },
//   summaryContainer: {
//     backgroundColor: "#e8f5e9",
//     padding: 12,
//     margin: 16,
//     borderRadius: 8,
//   },
//   summaryText: {
//     textAlign: "center",
//     color: "#2e7d32",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   bulkActionsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 16,
//     marginBottom: 10,
//     gap: 10,
//   },
//   bulkButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 10,
//     borderRadius: 8,
//     gap: 6,
//   },
//   addAllButton: {
//     backgroundColor: "#2e7d32",
//   },
//   removeAllButton: {
//     backgroundColor: "#c62828",
//   },
//   bulkButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   scrollArea: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   card: {
//     backgroundColor: "#e8f5e9",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: "#c8e6c9",
//   },
//   itemHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 8,
//   },
//   itemInfo: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1b5e20",
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 14,
//     color: "#4caf50",
//     fontWeight: "500",
//   },
//   totalValue: {
//     fontSize: 16,
//     color: "#2e7d32",
//     fontWeight: "bold",
//   },
//   unit: {
//     color: "#555",
//     marginBottom: 12,
//     fontSize: 14,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     gap: 10,
//   },
//   button: {
//     backgroundColor: "#2e7d32",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     flex: 1,
//     justifyContent: "center",
//   },
//   removeButton: {
//     backgroundColor: "#c62828",
//   },
//   buttonDisabled: {
//     backgroundColor: "#cccccc",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   outOfStockText: {
//     textAlign: "center",
//     color: "#c62828",
//     fontWeight: "600",
//     marginTop: 8,
//     fontSize: 14,
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#2e7d32",
//     fontSize: 16,
//   },
// });











// import { RouteProp, useRoute } from "@react-navigation/native";
// import React, { useState } from "react";
// import {
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { RootStackParamList } from "../App";

// type ManageQuantitiesRouteProp = RouteProp<
//   RootStackParamList,
//   "ManageQuantities"
// >;

// const ManageQuantitiesScreen = () => {
//   const route = useRoute<ManageQuantitiesRouteProp>();
//   const { selectedItems } = route.params;

//   const [quantities, setQuantities] = useState<Record<string, number>>(
//     Object.fromEntries(selectedItems.map((item) => [item.id, 1]))
//   );

//   const increase = (id: string) => {
//     setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
//   };

//   const decrease = (id: string) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, prev[id] - 1),
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Selected Items</Text>
//       <FlatList
//         data={selectedItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.itemName}>{item.name}</Text>
//             <View style={styles.controls}>
//               <TouchableOpacity
//                 onPress={() => decrease(item.id)}
//                 style={styles.button}
//               >
//                 <Text style={styles.buttonText}>-</Text>
//               </TouchableOpacity>
//               <Text style={styles.quantity}>{quantities[item.id]}</Text>
//               <TouchableOpacity
//                 onPress={() => increase(item.id)}
//                 style={styles.button}
//               >
//                 <Text style={styles.buttonText}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default ManageQuantitiesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f2fef5",
//     padding: 16,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#2e7d32",
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//     borderColor: "#c8e6c9",
//     borderWidth: 1,
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#2e7d32",
//   },
//   controls: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   button: {
//     backgroundColor: "#2e7d32",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginHorizontal: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   quantity: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#333",
//   },
// });
