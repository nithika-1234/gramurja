import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const { width } = Dimensions.get('window');


export default function Welcome() {
  const router = useRouter();


  return (
    <View style={styles.container}>
     


      <View style={styles.circleContainer}>
        <Image
          source={require('../assets/images/gramurja-logo.png')}
          style={styles.logo}
        />
      </View>


      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.appName}>GramUrja</Text>


      <Text style={styles.subText}>Bridging the Rural Solar Gap</Text>


      {/* <Text style={styles.note}>
        By clicking on Get Started, you agree to GramUrja’s Terms and Conditions of Use.
      </Text> */}


      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/LoginSelect')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
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
    padding: 30,
  },
  topText: {
    position: 'absolute',
    top: 60,
    fontSize: 16,
    color: '#444',
  },
  circleContainer: {
    borderColor: '#000000ff',
    width: width* 0.2,
    height: width * 0.2,
    borderRadius: width * 0.275,
    backgroundColor: '#f9f8f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  logo: {
    width: width*0.1,
    height: width*0.1,
    resizeMode: 'contain',
    borderRadius: width * 0.52,
  },
  welcomeText: {
    fontSize: 22,
    color: '#0d1cc5ea',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0d1cc5ea',
    marginBottom: 10,
  },
  subText: {
    fontSize: 15,
    color: '#024da3ff',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,


  },
  button: {
    backgroundColor: '#0a7aeaff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
