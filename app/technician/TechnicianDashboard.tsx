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
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TechnicianDashboard() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path as any); // 👈 force push if TS is annoying
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WELCOME, RAVI</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigateTo('/technician/AddCustomer')}>
        <Text style={styles.buttonText}>Add Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigateTo('/technician/InstallationForm')}>
        <Text style={styles.buttonText}>View Installation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigateTo('/technician/Inventory')}>
        <Text style={styles.buttonText}>Inventory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  button: {
    backgroundColor: '#5C6BC0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});