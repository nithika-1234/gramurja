// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { useRouter } from 'expo-router';
// const router = useRouter();
// const TechnicianDashboardScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Technician Dashboard</Text>
//       {/* <Button title="Add Customer" onPress={() => navigation.navigate('AddCustomer')} />
//       <Button title="Upload Work Log" onPress={() => navigation.navigate('UploadWorkLog')} />
//       <Button title="Inventory Management" onPress={() => navigation.navigate('Inventory')} /> */}
      

// <Button title="Add Customer" onPress={() => router.push('Addcustomer')} />
// <Button title="Upload Work Log" onPress={() => router.push('/upload-work-log')} />
// <Button title="Inventory Management" onPress={() => router.push('/inventory')} />

//     </View>
//   );
// };

// export default TechnicianDashboardScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', gap: 20, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }
// });
// import { useRouter } from 'expo-router';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   SafeAreaView,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import { useState } from 'react';

// export default function TechnicianDashboard() {
//   const router = useRouter();

//   const navigateTo = (path: string) => {
//     router.push(path as any);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#D1FAE5" />
//       <View style={styles.container}>
//         <Text style={styles.welcomeText}> Welcome</Text>

//         <View style={styles.card}>
//           <CustomButton label="➕ Add Customer" onPress={() => navigateTo('/technician/AddCustomer')} />
//           <CustomButton label="🔧 View Installation" onPress={() => navigateTo('/technician/InstallationForm')} />
//           <CustomButton label="📦 Inventory" onPress={() => navigateTo('/technician/Inventory')} />
//           <CustomButton label="View Customers" onPress={()=>navigateTo('/technician/ViewCustomers')} /> 
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// // ✅ Custom reusable button with press effect
// function CustomButton({ label, onPress }: { label: string; onPress: () => void }) {
//   const [isPressed, setIsPressed] = useState(false);

//   return (
//     <Pressable
//       onPressIn={() => setIsPressed(true)}
//       onPressOut={() => setIsPressed(false)}
//       onPress={onPress}
//       style={[
//         styles.button,
//         { backgroundColor: isPressed ? '#02511fff' : '#22C55E' }, // darken on press
//       ]}
//     >
//       <Text style={styles.buttonText}>{label}</Text>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#D1FAE5',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//      backgroundColor: '#E6F4EA',
//   },
//   welcomeText: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 32,
//     color: '#065F46',
//     textAlign: 'center',
//   },
//   card: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//  button: {
//   paddingVertical: 16,
//   borderRadius: 12,
//   marginBottom: 18,
//   alignItems: 'center',
// },

//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '600',
//   },
// });





import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config'; // 🔁 Adjust path if needed
import { Bold } from 'lucide-react-native';

export default function TechnicianDashboard() {
  const router = useRouter();
  const [lowStockItems, setLowStockItems] = useState<string[]>([]);

  const navigateTo = (path: string) => {
    router.push(path as any);
  };

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'inventory_items'));
        const lowItems: string[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.quantity !== undefined && data.quantity <= 5) {
            lowItems.push(data.name || doc.id);
          }
        });
        setLowStockItems(lowItems);
      } catch (error) {
        console.error('Error fetching low stock:', error);
      }
    };

    fetchLowStock();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#D1FAE5" />
      <View style={styles.container}>
        {lowStockItems.length > 0 && (
          <View style={styles.alertBox}>
            <Text style={styles.alertText} >
              ⚠️ Limited Stock: {lowStockItems.join(', ')}
            </Text>
          </View>
        )}

        <Text style={styles.welcomeText}> Welcome</Text>

        <View style={styles.card}>
          <CustomButton label="➕ Add Customer" onPress={() => navigateTo('/technician/AddCustomer')} />
          <CustomButton label="🔧 View Installation" onPress={() => navigateTo('/technician/InstallationForm')} />
          <CustomButton label="📦 Inventory" onPress={() => navigateTo('/technician/Inventory')} />
          <CustomButton label="View Customers" onPress={() => navigateTo('/technician/ViewCustomers')} />
        </View>
        
      </View>
    </SafeAreaView>
  );
}

// ✅ Custom reusable button with press effect
function CustomButton({ label, onPress }: { label: string; onPress: () => void }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: isPressed ? '#02511fff' : '#22C55E' },
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
    
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D1FAE5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 6,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#065F46',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  alertBox: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
    borderColor: '#FFEEBA',
    borderWidth: 1,

      marginHorizontal: 20,
      marginTop: 10,
      borderLeftWidth: 6,
        borderLeftColor: '#F59E0B', 



  },
  alertText: {
    color: '#856404',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',


  },
});
