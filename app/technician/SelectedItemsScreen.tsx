import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { db } from "../../firebase/config";
import { RootStackParamList } from "../App";

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  option: boolean;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SelectedItemsScreen"
>;

const SelectedItemsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "inventory_items"));
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as InventoryItem;
      });
      setItems(data);
      setSelected(new Set()); // nothing selected initially
    } catch (error) {
      console.error("Error fetching inventory:", error);
      Alert.alert("Error", "Failed to load inventory items");
    } finally {
      setLoading(false);
    }
  };

  fetchInventory();
}, []);


  const updateOptionInFirebase = async (id: string, value: boolean) => {
    try {
      const itemRef = doc(db, "inventory_items", id);
      await updateDoc(itemRef, { option: value });
    } catch (error) {
      console.error("Failed to update option for item ${id}:", error);
    }
  };

  const toggleSelect = (id: string) => {
  setSelected((prev) => {
    const copy = new Set(prev);
    if (copy.has(id)) {
      copy.delete(id);
    } else {
      copy.add(id);
    }
    return copy;
  });
};


  const handleNext = async () => {
  if (selected.size === 0) {
    Alert.alert("No Items Selected", "Please select at least one item to continue.");
    return;
  }
    const filtered = items.filter((item) => selected.has(item.id));

  navigation.navigate('OptionSelectedScreen', {
    selectedItems: filtered, // ✅ selectedItems should be defined and not empty
  });
};

const selectAll = () => {
  const allIds = items.map((item) => item.id);
  if (selected.size === items.length) {
    setSelected(new Set());
  } else {
    setSelected(new Set(allIds));
  }
};

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.loadingText}>Loading inventory...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Inventory Items</Text>

      {items.length > 0 && (
        <View style={styles.selectAllContainer}>
          <TouchableOpacity onPress={selectAll} style={styles.selectAllButton}>
            <Text style={styles.selectAllText}>
              {selected.size === items.length ? "Deselect All" : "Select All"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectedCount}>
            {selected.size} of {items.length} selected
          </Text>
        </View>
      )}

      {items.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No inventory items found</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                selected.has(item.id) && styles.cardSelected,
              ]}
              onPress={() => toggleSelect(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <Checkbox
                  status={selected.has(item.id) ? "checked" : "unchecked"}
                  onPress={() => toggleSelect(item.id)}
                  color="#2e7d32"
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            selected.size === 0 && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={selected.size === 0}
        >
          <Text
            style={[
              styles.nextButtonText,
              selected.size === 0 && styles.nextButtonTextDisabled,
            ]}
          >
            Next ({selected.size})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectedItemsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2fef5",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2e7d32",
    paddingHorizontal: 16,
  },
  loadingText: {
    marginTop: 10,
    color: "#2e7d32",
    fontSize: 16,
  },
  selectAllContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  selectAllButton: {
    padding: 8,
  },
  selectAllText: {
    color: "#2e7d32",
    fontWeight: "600",
    fontSize: 16,
  },
  selectedCount: {
    color: "#666",
    fontSize: 14,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  cardSelected: {
    borderColor: "#4caf50",
    borderWidth: 2,
    backgroundColor: "#e8f5e9",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  nextButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButtonTextDisabled: {
    color: "#999",
  },
});


// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { collection, getDocs } from "firebase/firestore";
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
// import { Checkbox } from "react-native-paper";
// import { db } from "../../firebase/config";
// import { RootStackParamList } from "../App";
// import { updateDoc, doc } from "firebase/firestore";


// type InventoryItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   price: number;
// };

// // type NavigationProp = NativeStackNavigationProp<
// //   RootStackParamList,
// //   "SelectedItems"
// // >;

// const SelectedItemsScreen = () => {
//   // const navigation = useNavigation<NavigationProp>();
//   const [items, setItems] = useState<InventoryItem[]>([]);
//   const [selected, setSelected] = useState<Set<string>>(new Set());
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         setLoading(true);
//         const snapshot = await getDocs(collection(db, "inventory_items"));
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as InventoryItem[];
//         setItems(data);
//       } catch (error) {
//         console.error("Error fetching inventory:", error);
//        console.log("Error", "Failed to load inventory items");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventory();
//   }, []);

//   // const toggleSelect = (id: string) => {
//   //   setSelected((prev) => {
//   //     const copy = new Set(prev);
//   //     if (copy.has(id)) {
//   //       copy.delete(id);
//   //     } else {
//   //       copy.add(id);
//   //     }
//   //     return copy;
//   //   });
//   // };
//   const toggleSelect = async (id: string) => {
//   setSelected((prev) => {
//     const copy = new Set(prev);
//     if (copy.has(id)) {
//       copy.delete(id);
//       updateOptionInFirebase(id, false); // unselect
//     } else {
//       copy.add(id);
//       updateOptionInFirebase(id, true); // select
//     }
//     return copy;
//   });
// };
// const updateOptionInFirebase = async (id: string, value: boolean) => {
//   try {
//     const itemRef = doc(db, "inventory_items", id);
//     await updateDoc(itemRef, {
//       option: value,
//     });
//   } catch (error) {
//     console.error(`Failed to update option for item ${id}:`, error);
//   }
// };


//   const handleNext = () => {
//     if (selected.size === 0) {
//       Alert.alert("No Items Selected", "Please select at least one item to continue.");
//       return;
//     }
    

//     const selectedItems = items.filter((item) => selected.has(item.id));
    
//     // navigation.navigate("ManageQuantities", {selectedItems });
//   };

//   const selectAll = () => {
//     if (selected.size === items.length) {
//       setSelected(new Set());
//     } else {
//       setSelected(new Set(items.map(item => item.id)));
//     }
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centered]}>
//         <ActivityIndicator size="large" color="#2e7d32" />
//         <Text style={styles.loadingText}>Loading inventory...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Select Inventory Items</Text>
      
//       {items.length > 0 && (
//         <View style={styles.selectAllContainer}>
//           <TouchableOpacity onPress={selectAll} style={styles.selectAllButton}>
//             <Text style={styles.selectAllText}>
//               {selected.size === items.length ? "Deselect All" : "Select All"}
//             </Text>
//           </TouchableOpacity>
//           <Text style={styles.selectedCount}>
//             {selected.size} of {items.length} selected
//           </Text>
//         </View>
//       )}

//       {items.length === 0 ? (
//         <View style={styles.centered}>
//           <Text style={styles.emptyText}>No inventory items found</Text>
//         </View>
//       ) : (
//         <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
//           {items.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               style={[
//                 styles.card,
//                 selected.has(item.id) && styles.cardSelected,
//               ]}
//               onPress={() => toggleSelect(item.id)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.cardContent}>
//                 <View style={styles.itemInfo}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   {/* <Text style={styles.itemDetails}>
//                     Available: {item.quantity} {item.unit}
//                   </Text>
//                   <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text> */}
//                 </View>
//                 <Checkbox
//                   status={selected.has(item.id) ? "checked" : "unchecked"}
//                   onPress={() => toggleSelect(item.id)}
//                   color="#2e7d32"
//                 />
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}

//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={[
//             styles.nextButton,
//             selected.size === 0 && styles.nextButtonDisabled
//           ]}
//           onPress={handleNext}
//           disabled={selected.size === 0}
//         >
//           <Text style={[
//             styles.nextButtonText,
//             selected.size === 0 && styles.nextButtonTextDisabled
//           ]}>
//             Next ({selected.size})
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default SelectedItemsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f2fef5",
//   },
//   centered: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 20,
//     color: "#2e7d32",
//     paddingHorizontal: 16,
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#2e7d32",
//     fontSize: 16,
//   },
//   selectAllContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     marginBottom: 10,
//   },
//   selectAllButton: {
//     padding: 8,
//   },
//   selectAllText: {
//     color: "#2e7d32",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   selectedCount: {
//     color: "#666",
//     fontSize: 14,
//   },
//   scrollArea: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     borderWidth: 1,
//     borderColor: "#e0e0e0",
//   },
//   cardSelected: {
//     borderColor: "#4caf50",
//     borderWidth: 2,
//     backgroundColor: "#e8f5e9",
//   },
//   cardContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   itemInfo: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#2e7d32",
//     marginBottom: 4,
//   },
//   itemDetails: {
//     color: "#666",
//     fontSize: 14,
//     marginBottom: 2,
//   },
//   itemPrice: {
//     color: "#4caf50",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   footer: {
//     padding: 16,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderTopColor: "#e0e0e0",
//   },
//   nextButton: {
//     backgroundColor: "#2e7d32",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   nextButtonDisabled: {
//     backgroundColor: "#cccccc",
//   },
//   nextButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   nextButtonTextDisabled: {
//     color: "#999",
//   },
// });









// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { Checkbox } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../App";

// type InventoryItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   price: number;
// };

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "SelectedItems"
// >;

// const SelectedItemsScreen = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const [items, setItems] = useState<InventoryItem[]>([]);
//   const [selected, setSelected] = useState<Set<string>>(new Set());

//   useEffect(() => {
//     const fetchInventory = async () => {
//       const snapshot = await getDocs(collection(db, "inventory_items"));
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as InventoryItem[];
//       setItems(data);
//     };

//     fetchInventory();
//   }, []);

//   const toggleSelect = (id: string) => {
//     setSelected((prev) => {
//       const copy = new Set(prev);
//       copy.has(id) ? copy.delete(id) : copy.add(id);
//       return copy;
//     });
//   };

//   const handleSubmit = () => {
//     const selectedItems = items.filter((item) => selected.has(item.id));
//     navigation.navigate("ManageQuantities", { selectedItems });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Select Inventory Items</Text>

//       <ScrollView style={styles.scrollArea}>
//         {items.map((item) => (
//           <TouchableOpacity
//             key={item.id}
//             style={[
//               styles.card,
//               selected.has(item.id) && styles.cardSelected,
//             ]}
//             onPress={() => toggleSelect(item.id)}
//           >
//             <View style={styles.cardContent}>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 {/* <Text style={styles.itemDetails}>
//                   Qty: {item.quantity} {item.unit}
//                 </Text>
//                 <Text style={styles.itemPrice}>₹{item.price}</Text> */}
//               </View>
//               <Checkbox
//                 status={selected.has(item.id) ? "checked" : "unchecked"}
//                 onPress={() => toggleSelect(item.id)}
//                 color="#2e7d32" // green
//               />
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <View style={styles.footer}>
//         <Button
//           title="Next"
//           onPress={handleSubmit}
//           disabled={selected.size === 0}
//           color="#2e7d32" // green
//         />
//       </View>
//     </View>
//   );
// };

// export default SelectedItemsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f2fef5",
//     paddingTop: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 12,
//     color: "#2e7d32", // green
//   },
//   scrollArea: {
//     paddingHorizontal: 16,
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   cardSelected: {
//     borderColor: "#4caf50", // green
//     borderWidth: 2,
//     backgroundColor: "#e8f5e9",
//   },
//   cardContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#2e7d32", // green
//     borderRadius: 8,    
//   },
// //   itemDetails: {
// //     color: "#555",
// //     marginTop: 4,
// //   },
 
//   footer: {
//     padding: 16,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 50,
//   },
// });