import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
const router = useRouter();
const TechnicianDashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Technician Dashboard</Text>
      {/* <Button title="Add Customer" onPress={() => navigation.navigate('AddCustomer')} />
      <Button title="Upload Work Log" onPress={() => navigation.navigate('UploadWorkLog')} />
      <Button title="Inventory Management" onPress={() => navigation.navigate('Inventory')} /> */}
      

<Button title="Add Customer" onPress={() => router.push('Addcustomer')} />
<Button title="Upload Work Log" onPress={() => router.push('/upload-work-log')} />
<Button title="Inventory Management" onPress={() => router.push('/inventory')} />

    </View>
  );
};

export default TechnicianDashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 20, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }
});
