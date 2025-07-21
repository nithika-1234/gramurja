    // app/technician/InstallationForm.tsx
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InstallationForm() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Installation Records</Text>
      <Text style={styles.text}>You can show records from Firebase or local DB here.</Text>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  text: { textAlign: 'center', fontSize: 16, color: '#555' },
  back: { marginTop: 20, textAlign: 'center', color: '#555' },
});