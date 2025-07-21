



import { useLocalSearchParams } from 'expo-router';

import React from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginForm() {
  const { role } = useLocalSearchParams<{ role?: string }>();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/gramurja-logo.png')} style={styles.logo} />
        <Text style={styles.title}>GramUrja</Text>
        <Text style={styles.roleText}>Logging in as: {role === 'technician' ? 'Technician' : 'Customer'}</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput placeholder="Username or Email" style={styles.input} placeholderTextColor="#999" />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#999" />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.linkText}>Sign up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  roleText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
  },
  linkText: {
    color: '#10B981',
    fontWeight: '500',
  },
});
