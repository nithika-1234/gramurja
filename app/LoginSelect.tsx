// ✅ app/LoginSelect.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginSelect() {
  const router = useRouter();

  const handleLogin = (role: string) => {
    router.push(`/login/LoginForm?role=${role}`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/icon.png')} // ✅ No @ here
        style={styles.logo}
      />
      <Text style={styles.title}>Login as</Text>

      {/* <TouchableOpacity style={styles.buttonTech} onPress={() => handleLogin('technician')}> */}
      <TouchableOpacity style={styles.buttonTech} onPress={() => router.push('/login/LoginForm?role=technician')}>

        <Ionicons name="construct" size={24} color="#fff" />
        <Text style={styles.buttonText}>Technician Login</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.buttonCust} onPress={() => handleLogin('customer')}> */}
      <TouchableOpacity style={styles.buttonCust} onPress={() => router.push('/login/LoginForm?role=customer')}>

        <Ionicons name="person" size={24} color="#fff" />
        <Text style={styles.buttonText}>Customer Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2E7D32',
  },
  buttonTech: {
    flexDirection: 'row',
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonCust: {
    flexDirection: 'row',
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
});