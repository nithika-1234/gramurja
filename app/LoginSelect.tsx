// // ✅ app/LoginSelect.tsx
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function LoginSelect() {
//   const router = useRouter();

//   const handleLogin = (role: string) => {
//     router.push(`/login/LoginForm?role=${role}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../assets/images/image.png')} 
//         style={styles.logo}
//       />
//       <Text style={styles.title}>Login as</Text>

//       {/* <TouchableOpacity style={styles.buttonTech} onPress={() => handleLogin('technician')}> */}
//       <TouchableOpacity style={styles.buttonTech} onPress={() => router.push('/login/LoginForm?role=technician')}>

//         <Ionicons name="construct" size={24} color="#fff" />
//         <Text style={styles.buttonText}>Technician </Text>
//       </TouchableOpacity>

//       {/* <TouchableOpacity style={styles.buttonCust} onPress={() => handleLogin('customer')}> */}
//       <TouchableOpacity style={styles.buttonCust} onPress={() => router.push('/login/LoginForm?role=customer')}>

//         <Ionicons name="person" size={24} color="#fff" />
//         <Text style={styles.buttonText}>Customer </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E6F4EA',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 110,
//     height: 110,
//     resizeMode: 'contain',
//     marginBottom: 30,
//     borderRadius: 50,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#2E7D32',
//   },
//   buttonTech: {
//     flexDirection: 'row',
//     backgroundColor: '#2b600bff',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 40,
//     justifyContent: 'center',
//   },
//   buttonCust: {
//     flexDirection: 'row',
//     backgroundColor: '#59d95dff',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '100%',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     marginLeft: 10,
//     fontWeight: '600',
//   },
// });











import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginSelect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/images/image.png')} style={styles.logo} />
        <Text style={styles.title}>Login as</Text>
        

        <TouchableOpacity
          style={[styles.button, styles.buttonTech]}
          onPress={() => router.push('/login/LoginForm?role=technician')}
        >
          <Ionicons name="construct" size={24} color="#fff" />
          <Text style={styles.buttonText}>Technician</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonCust]}
          onPress={() => router.push('/login/LoginForm?role=customer')}
        >
          <Ionicons name="person" size={24} color="#fff" />
          <Text style={styles.buttonText}>Customer</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
    elevation: 2,
  },
  buttonTech: {
    backgroundColor: '#2E7D32',
  },
  buttonCust: {
    backgroundColor: '#66BB6A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
});
