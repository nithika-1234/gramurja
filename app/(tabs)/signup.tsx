import { useLocalSearchParams, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState ,useEffect} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../firebase/config';

export default function SignupForm() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
  // Clear form values on mount
  setEmail('');
  setPassword('');
}, []);

  const handleSignup = async () => {
    console.log('Signup function called with:', email, password, role);

    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Store user info in Firestore
      await setDoc(doc(db, 'users', userId), {
        email,
        role,
      });

      Alert.alert('Signup Successful', 'You can now log in');
      router.replace(`/login/LoginForm?role=${role}`);
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
           
      <View style={styles.formContainer}>

        <Text style={styles.title}>Sign Up</Text>
       <TextInput
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  style={styles.input}
  autoCapitalize="none"
  autoCorrect={false}
  autoComplete="off"
  textContentType="none"
  importantForAutofill="no"
/>

<TextInput
  placeholder="Password"
  value={password}
  onChangeText={setPassword}
  style={styles.input}
  secureTextEntry
  autoCapitalize="none"
  autoCorrect={false}
  autoComplete="off"
  textContentType="none"
  importantForAutofill="no"
/>


         <TouchableOpacity style={styles.button} onPress={handleSignup}> 
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={() => router.replace(`/login/LoginForm?role=${role}`)}>
            Log in
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center',     backgroundColor: '#E6F4EA'
, padding: 20 },
  formContainer: { width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 16,
    width:'100%',
  },
  button: {
    backgroundColor: '#16A34A',
    padding: 19,
    width:'100%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  
  
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  signupText: { textAlign: 'center', fontSize: 14 },
  linkText: { color: '#10B981', fontWeight: '500' },
});
