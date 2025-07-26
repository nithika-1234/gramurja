

// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import React, { useState } from 'react';

// import {
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { auth } from '../../firebase/config'; // adjust if your config file is elsewhere

// export default function LoginForm() {
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const router = useRouter();
//   const { role } = useLocalSearchParams<{ role?: string }>();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//       console.log('Login button pressed');

//     if (!email || !password) {
//       Alert.alert('Missing Fields', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert('Login Successful', `Welcome, ${role}!`);
//       if (role === 'technician') {
//         router.replace('/technician/TechnicianDashboard');
//       } else {
//         router.replace('/Home'); // Replace with customer dashboard if needed
//       }
//     } catch (error: any) {
//       Alert.alert('Login Failed', error.message);
//     }
//   };
//   const handleForgotPassword = () => {
//   router.push('/forgot-password'); // create a screen at /forgot-password
// };


//   const handleSignupRedirect = () => {
//     router.replace(`/signup?role=${role}`);
//   };

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image source={require('../../assets/images/image.png')} style={styles.logo} />
//         <Text style={styles.title}>GramUrja</Text>
//         <Text style={styles.roleText}>Logging in as: {role === 'technician' ? 'Technician' : 'Customer'}</Text>
//       </View>

//       <View style={styles.formContainer}>
//        <TextInput
//   placeholder="Email"
//   value={email}
//   onChangeText={setEmail}
//   style={styles.input}
//   autoCapitalize="none"
//   autoCorrect={false}
//   autoComplete="email"              // ENABLE for autofill
//   textContentType="username"        // iOS hint for login
//   importantForAutofill="yes"
// />

// <TextInput
//   placeholder="Password"
//   value={password}
//   onChangeText={setPassword}
//   style={styles.input}
//   secureTextEntry
//   autoCapitalize="none"
//   autoCorrect={false}
//   autoComplete="password"           // ENABLE autofill
//   textContentType="password"
//   importantForAutofill="yes"
// />


//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//   <Text style={styles.buttonText}>Login</Text>
// </TouchableOpacity>


//         <Text style={styles.signupText}>
//           Don't have an account?{' '}
//           <Text style={styles.linkText} onPress={handleSignupRedirect}>
//             Sign up
//           </Text>
//         </Text>
//         <TouchableOpacity onPress={handleForgotPassword}>
//   <Text style={styles.forgotText}>Forgot Password?</Text>
// </TouchableOpacity>

//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E6F4EA',
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   forgotText: {
//   textAlign: 'right',
//   fontSize: 13,
//   color: '#3B82F6',
//   marginBottom: 12,
// },

//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     resizeMode: 'contain',
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1E293B',
//   },
//   roleText: {
//     fontSize: 16,
//     color: '#6B7280',
//     marginTop: 4,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   input: {
//     backgroundColor: '#FFF',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     borderWidth: 4,
//     borderColor: '#E5E7EB',
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#16A34A',
//     paddingVertical: 19,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 12,
    
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
    
//   },
//   signupText: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   linkText: {
//     color: '#10B981',
//     fontWeight: '500',
//   },
// });

import { db } from '../../firebase/config';//new
import { doc, getDoc } from 'firebase/firestore';//new



import { useLocalSearchParams, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../../firebase/config';

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // 🔴 Error state
  const handleLogin = async () => {
  setLoginError('');

  if (!email || !password) {
    setLoginError('Please enter both email and password.');
    return;
  }

  if (!email.endsWith('@gmail.com')) {
    setLoginError('Please enter a valid Gmail address.');
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;

    if (role === 'technician') {
      const techRef = doc(db, 'technicians', user?.uid!);
      const techSnap = await getDoc(techRef);

      if (techSnap.exists()) {
        router.replace('/technician/TechnicianDashboard');
      } else {
        router.replace('/technician/CompleteProfile');
      }
    } else {
      router.replace('/customer/CustomerDashboard');
    }
  } catch (error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        setLoginError('User not registered.');
        break;
      case 'auth/wrong-password':
        setLoginError('Incorrect password.');
        break;
      case 'auth/invalid-email':
        setLoginError('Invalid email format.');
        break;
      default:
        setLoginError('Login failed. Please try again.');
    }
  }
};

//   const handleLogin = async () => {
//   setLoginError(''); // Reset previous error

//   // 🔴 Check email format
//   if (!email || !password) {
//     setLoginError('Please enter both email and password.');
//     return;
//   }

//   if (!email.endsWith('@gmail.com')) {
//     setLoginError('Please enter a valid Gmail address.');
//     return;
//   }

//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//     setLoginError(''); // ✅ Clear error on success
//     const userRef = doc(db, 'users', email); // Assumes document ID is email
     

//   Alert.alert(
//   'Login Successful',
//   `Welcome, ${role}!`,
//   [
//     {
//       text: 'OK',
//       onPress: () => {
//         if (role === 'technician') {//new
          
//           router.replace('/technician/TechnicianDashboard');
//         } else {
//           router.replace('/Home');
//         }
//       }
//     }
//   ],
//   { cancelable: false }
// );

//     if (role === 'technician') {
//       router.replace('/technician/TechnicianDashboard');
//     } else {
//       router.replace('/Home');
//     }
//   } catch (error: any) {
//     console.log(error.code);

//     // 🔴 Handle specific Firebase auth errors
//     switch (error.code) {
//       case 'auth/user-not-found':
//         setLoginError('User not registered.');
//         break;
//       case 'auth/wrong-password':
//         setLoginError('Incorrect password.');
//         break;
//       case 'auth/invalid-email':
//         setLoginError('Invalid email format.');
//         break;
//       default:
//         setLoginError('Login failed. Please try again.');
//     }
//   }
// };


  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleSignupRedirect = () => {
    router.replace(`/signup?role=${role}`);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/image.png')} style={styles.logo} />
        <Text style={styles.title}>GramUrja</Text>
        <Text style={styles.roleText}>Logging in as: {role === 'technician' ? 'Technician' : 'Customer'}</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="username"
          importantForAutofill="yes"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          textContentType="password"
          importantForAutofill="yes"
        />

        {/* 🔴 Show login error if exists */}
        {loginError !== '' && <Text style={styles.errorText}>{loginError}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.linkText} onPress={handleSignupRedirect}>
            Sign up
          </Text>
        </Text>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EA',
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
    borderWidth: 4,
    borderColor: '#E5E7EB',
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#16A34A',
    paddingVertical: 19,
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
  forgotText: {
    textAlign: 'right',
    fontSize: 13,
    color: '#3B82F6',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});


