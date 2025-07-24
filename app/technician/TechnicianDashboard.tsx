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
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useState } from 'react';

export default function TechnicianDashboard() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#D1FAE5" />
      <View style={styles.container}>
        <Text style={styles.welcomeText}> Welcome</Text>

        <View style={styles.card}>
          <CustomButton label="➕ Add Customer" onPress={() => navigateTo('/technician/AddCustomer')} />
          <CustomButton label="🔧 View Installation" onPress={() => navigateTo('/technician/InstallationForm')} />
          <CustomButton label="📦 Inventory" onPress={() => navigateTo('/technician/SelectedItemsScreen')} />
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
        { backgroundColor: isPressed ? '#02511fff' : '#22C55E' }, // darken on press
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
});
