// import * as ImagePicker from 'expo-image-picker';
// import { useLocalSearchParams } from 'expo-router';
// import { doc, updateDoc } from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { useState } from 'react';
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { db, storage } from '../../../firebase/config';

// const installedItemOptions = [
//   '1 Panel',
//   '2 Panels',
//   '3 Panels',
//   'Inverter',
//   'Battery',
//   'Mounting Kit',
// ];

// export default function UpdateProgress() {
//   const { id } = useLocalSearchParams();
//   const [selectedItem, setSelectedItem] = useState('');
//   const [status, setStatus] = useState('');
//   const [imageUri, setImageUri] = useState('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   // STEP 1: Open camera
//   const openCamera = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Camera permission is required!');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   // STEP 2: Upload image to Firebase Storage
//   const handlePhotoUpload = async () => {
//     if (!imageUri) return null;

//     const response = await fetch(imageUri);
//     const blob = await response.blob();

//     const filename = `installations/${id}-${Date.now()}.jpg`;
//     const storageRef = ref(storage, filename);
//     await uploadBytes(storageRef, blob);

//     const downloadUrl = await getDownloadURL(storageRef);
//     return downloadUrl;
//   };

//   // STEP 3: Save to Firestore on OK
//   const handleConfirm = async () => {
//     try {
//       const imageUrl = await handlePhotoUpload();

//       await updateDoc(doc(db, 'customers', id), {
//         installedItems: selectedItem,
//         installStatus: status,
//         workCompleted: true,
//         imageUrl: imageUrl || null,
//       });

//       setShowConfirmModal(false);
//       Alert.alert('✅ Update Stored', 'Technician work has been recorded successfully.');
//     } catch (error) {
//       Alert.alert('❌ Error', error.message);
//     }
//   };

//   // STEP 4: Validate fields before confirming
//   const handleSubmit = () => {
//     if (!selectedItem || !status) {
//       Alert.alert('⚠️ Please select installed items and enter a status note.');
//       return;
//     }

//     if (!imageUri) {
//       Alert.alert('📸 Please capture a photo before proceeding.');
//       return;
//     }

//     setShowConfirmModal(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Update Installation</Text>

//       <Text style={styles.label}>Installed Items</Text>
//       {installedItemOptions.map((item) => (
//         <TouchableOpacity
//           key={item}
//           style={[styles.option, selectedItem === item && styles.selectedOption]}
//           onPress={() => setSelectedItem(item)}
//         >
//           <Text style={[styles.optionText, selectedItem === item && { color: '#fff' }]}>{item}</Text>
//         </TouchableOpacity>
//       ))}

//       <Text style={styles.label}>Installation Status</Text>
//       <TextInput
//         placeholder="e.g., Tested, Working Fine"
//         value={status}
//         onChangeText={setStatus}
//         style={styles.input}
//         multiline
//       />

//       <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
//         <Text style={styles.cameraButtonText}>
//           {imageUri ? '📸 Retake Photo' : '📷 Take Photo'}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
//         <Text style={styles.submitText}>✅ Mark Work Completed</Text>
//       </TouchableOpacity>

//       {/* Confirmation Modal */}
//       <Modal
//         visible={showConfirmModal}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowConfirmModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalText}>Do you want to save this update?</Text>
//             <TouchableOpacity style={styles.okButton} onPress={handleConfirm}>
//               <Text style={styles.okText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 20 },
//   heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
//   label: { marginTop: 15, fontWeight: '600', marginBottom: 5 },
//   input: {
//     borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
//     padding: 10, height: 80, textAlignVertical: 'top',
//   },
//   option: {
//     backgroundColor: '#eee',
//     padding: 10,
//     borderRadius: 8,
//     marginVertical: 4,
//   },
//   selectedOption: {
//     backgroundColor: '#283593',
//   },
//   optionText: {
//     color: '#333',
//   },
//   cameraButton: {
//     backgroundColor: '#0288D1',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   cameraButtonText: { color: '#fff', fontWeight: '600' },
//   submitButton: {
//     backgroundColor: '#388E3C',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   submitText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1, justifyContent: 'center', alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   modalBox: {
//     backgroundColor: '#fff',
//     padding: 25,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '80%',
//   },
//   modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
//   okButton: {
//     backgroundColor: '#2196F3',
//     paddingHorizontal: 25,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   okText: { color: '#fff', fontWeight: '600' },
// });