// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../App'; // adjust if needed
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// type Item = {
//   id: string;
//   name: string;
//   unit: string;
//   quantity: number;
//   price: number;
//   option: boolean;
// };

// type RouteProps = RouteProp<RootStackParamList, 'OptionSelectedScreen'>;
// type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'OptionSelectedScreen'>;

// const OptionSelectedScreen = () => {
//   const route = useRoute<RouteProps>();
//   const navigation = useNavigation<NavigationProps>();
//   const [items, setItems] = useState<Item[]>(route.params.selectedItems);

//   const handleQuantityChange = (id: string, delta: number) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(0, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   const goToHistory = () => {
//     navigation.navigate('InventoryHistory'); // update if your route is named differently
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Selected Items</Text>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {items.map((item) => (
//           <View key={item.id} style={styles.itemCard}>
//             <Text style={styles.itemName}>{item.name}</Text>
//             <Text style={styles.itemDetails}>
//               Quantity: {item.quantity} {item.unit}
//             </Text>
//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 onPress={() => handleQuantityChange(item.id, -1)}
//                 style={styles.button}
//               >
//                 <Text style={styles.buttonText}>-</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleQuantityChange(item.id, 1)}
//                 style={styles.button}
//               >
//                 <Text style={styles.buttonText}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       <TouchableOpacity style={styles.historyButton} onPress={goToHistory}>
//         <Text style={styles.historyButtonText}>View History</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default OptionSelectedScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2fef5',
//     padding: 16,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#2e7d32',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   scrollContainer: {
//     paddingBottom: 100,
//   },
//   itemCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#c8e6c9',
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2e7d32',
//   },
//   itemDetails: {
//     fontSize: 14,
//     color: '#666',
//     marginVertical: 4,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: 12,
//     marginTop: 8,
//   },
//   button: {
//     backgroundColor: '#4caf50',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   historyButton: {
//     backgroundColor: '#2e7d32',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 20,
//     left: 16,
//     right: 16,
//   },
//   historyButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });









import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type OptionSelectedScreenRouteProp = RouteProp<
  RootStackParamList,
  'OptionSelectedScreen'
>;
type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  option: boolean;
};


export default function OptionSelectedScreen() {
  const route = useRoute<OptionSelectedScreenRouteProp>();
  const navigation = useNavigation();
const {selectedItems}=  route.params;

  const [quantities, setQuantities] = useState(
    selectedItems.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleAdd = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleRemove = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1), // Min 1
    }));
  };

  const renderItem = ({ item }: { item: typeof selectedItems[0] }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => handleRemove(item.id)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>➖</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantities[item.id]}</Text>

        <TouchableOpacity
          onPress={() => handleAdd(item.id)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>➕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('InventoryHistory' as never)}
      >
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9F1',
    padding: 16,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#e0f2f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
  },
  historyButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
