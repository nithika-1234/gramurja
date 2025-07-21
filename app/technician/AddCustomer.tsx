    // app/technician/AddCustomer.tsx
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddCustomer() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Installation</Text>

      <TextInput placeholder="Customer Name" style={styles.input} />
      <TextInput placeholder="Address" style={styles.input} />
      <TextInput placeholder="System Size (kW)" keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Status (e.g., Installed, Pending)" style={styles.input} />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#F0F0F0', padding: 12, borderRadius: 8,
    marginBottom: 16, fontSize: 16, borderColor: '#ccc', borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#283593', padding: 15, borderRadius: 10,
    alignItems: 'center', marginTop: 10,
  },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  back: { marginTop: 20, textAlign: 'center', color: '#555' },
});
