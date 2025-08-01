// // import { useRouter } from 'expo-router';
// // import React from 'react';
// // import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


// // const { width } = Dimensions.get('window');


// // export default function Welcome() {
// //   const router = useRouter();


// //   return (
// //     <View style={styles.container}>
     


// //       <View style={styles.circleContainer}>
// //         <Image
// //           source={require('../assets/images/gramurja-logo.png')}
// //           style={styles.logo}
// //         />
// //       </View>


// //       {/* <Text style={styles.welcomeText}>Welcome to</Text> */}
// //       <Text style={styles.appName}>GramUrja</Text>


// //       <Text style={styles.subText}>Bridging Rural SolarGap</Text>


// //       {/* <Text style={styles.note}>
// //         By clicking on Get Started, you agree to GramUrja’s Terms and Conditions of Use.
// //       </Text> */}


// //       <TouchableOpacity
// //         style={styles.button}
// //         onPress={() => router.push('/LoginSelect')}
// //       >
// //         <Text style={styles.buttonText}>Get Started</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }
// // const circleSize = width * 0.5;

// // const styles = StyleSheet.create({



// //   container: {
// //     flex: 1,
// //     backgroundColor: '#E6F4EA',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     padding: 30,
// //   },
// //   topText: {
// //     position: 'absolute',
// //     top: 60,
// //     fontSize: 16,
// //     color: '#444',
// //   },
  
// //   circleContainer: {
// //     // borderColor: '#000000ff',
// //     // width: width* 0.5,
// //     // height: width * 0.5,
// //     // borderRadius: width * 0.275,
// //     // backgroundColor: '#f9f8f7',
// //     // overflow: 'hidden', 
// //     // justifyContent: 'center',
// //     // alignItems: 'center',
// //     // marginBottom: 30,
// //     // elevation: 3,
// //     // shadowColor: '#000',
// //     // shadowOpacity: 0.1,
// //     // shadowOffset: { width: 0, height: 2 },


// // width: circleSize,
// //   height: circleSize,
// //   borderRadius: circleSize / 2,
// //   backgroundColor: '#f9f8f7',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   marginBottom: 30,
// //   overflow: 'hidden', // IMPORTANT
// //   elevation: 3,
// //   shadowColor: '#000',
// //   shadowOpacity: 0.1,
// //   shadowOffset: { width: 0, height: 2 },






// //   },
// //   logo: {
// //   //   // width: width*0.5,
// //   //   // height: width*0.5,
// //   //   resizeMode: 'contain',
// //   //   borderRadius: width * 0.52,
// //   //    width: '90%', // smaller size so it fits nicely
// //   // height: '90%',
 
// // // width: circleSize * 0.8,   // 80% of the circle container
// // //   height: circleSize * 0.8,
// // //   resizeMode: 'contain',
// //  width: '100%',
// //   height: '100%',
// //   resizeMode: 'contain',



// //   },
// //   welcomeText: {
// //     fontSize: 22,
// //     color: '#0d1cc5ea',
// //   },
// //   appName: {
// //     fontSize: 32,
// //     fontWeight: 'bold',
// //     color: '#0d1cc5ea',
// //     marginBottom: 10,
// //   },
// //   subText: {
// //     fontSize: 15,
// //     color: '#024da3ff',
// //     textAlign: 'center',
// //     marginBottom: 40,
// //     fontWeight: '600',
// //   },
// //   note: {
// //     fontSize: 12,
// //     color: '#666',
// //     textAlign: 'center',
// //     marginBottom: 50,


// //   },
// //   button: {
// //     backgroundColor: '#0a7aeaff',
// //     paddingVertical: 15,
// //     paddingHorizontal: 40,
// //     borderRadius: 30,
// //     width: '80%',
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });






// //modified code


// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const { width } = Dimensions.get('window');
// const circleSize = width * 0.5;

// export default function Welcome() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <View style={styles.circleContainer}>
//         <Image
//           source={require('../assets/images/gramurja-logo.png')}
//           style={styles.logo}
//         />
//       </View>

//       <Text style={styles.appName}>GramUrja</Text>
//       <Text style={styles.subText}>Bridging Rural SolarGap</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push('/LoginSelect')}
//       >
//         <Text style={styles.buttonText}>Get Started</Text>
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
//     padding: 30,
//   },
//   circleContainer: {
//     width: circleSize,
//     height: circleSize,
//     borderRadius: circleSize / 2,
//     backgroundColor: '#f9f8f7',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//     overflow: 'hidden', // keeps the image inside the circle
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   logo: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   appName: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#0d1cc5ea',
//     marginBottom: 10,
//   },
//   subText: {
//     fontSize: 15,
//     color: '#024da3ff',
//     textAlign: 'center',
//     marginBottom: 40,
//     fontWeight: '600',
//   },
//   button: {
//     backgroundColor: '#0a7aeaff',
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });




//modified 2


import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const circleSize = 180; // fixed size instead of dynamic screen-based size

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

      <Text style={styles.appName}>GramUrja</Text>
      <Text style={styles.subText}>Bridging Rural SolarGap</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/LoginSelect')}
      >
        <Text style={styles.buttonText}> Get Started</Text>
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
  circleContainer: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  logo: {
    width: circleSize,
    height: circleSize,
    resizeMode: 'cover', // ensures image fills the circle
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




