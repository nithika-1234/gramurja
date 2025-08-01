import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { db } from '../../../firebase/config';

const steps = [
{ key: 'step1', label: 'Roof' },
{ key: 'step2', label: 'Electrical' },
{ key: 'step3', label: 'Config' },
{ key: 'step4', label: 'HandOver' },
];

export default function TechnicianSteps() {
const { id } = useLocalSearchParams();
const router = useRouter();
const [stepData, setStepData] = useState({});
const [loading, setLoading] = useState(true);
const [customerName, setCustomerName] = useState('');
const fetchCustomerName = async () => {
try {
const customerRef = doc(db, 'customers', id); // Same `id` used as document ID
const customerSnap = await getDoc(customerRef);
if (customerSnap.exists()) {
const customerData = customerSnap.data();
if (customerData.name) {
setCustomerName(customerData.name);
}
} else {
console.warn('No customer data found for ID:', id);

}
} catch (error) {
console.error('Error fetching customer name:', error);
}
};
useEffect(() => {
if (id)
{fetchProgress();
fetchCustomerName(); }
}, [id]);
const fetchProgress = async () => {
try {
const refDoc = doc(db, 'installationStatus', id);
const snap = await getDoc(refDoc);

if (snap.exists()) {
const data = snap.data();
setStepData(data);

if (data.imageUrl) setImageUri(data.imageUrl);

const allGreen = steps.every((step) => data[step.key]?.status
=== 'green');
if (allGreen) {
Alert.alert('✅ Installation Complete', 'Congratulations!');
}
} else {
const init = {};
steps.forEach((s) => {
init[s.key] = { status: 'yellow', answers: {} };
});
setStepData(init);
await setDoc(refDoc, init);
}
} catch (err) {
console.error('Error loading data:', err);
} finally {
setLoading(false);
}

};

const getColor = (stepKey) => {
const status = stepData?.[stepKey]?.status || 'yellow';
return status;
};

const handleStepClick = (stepKey) => {
router.replace(`/technician/step/${stepKey}?id=${id}`);
};

return (
<ScrollView contentContainerStyle={styles.container}>
<Text style={styles.title}>Installation Progress</Text>
<Text style={styles.subtext}>Customer Name: {customerName}</Text>

<View style={styles.stepsColumn}>
{steps.map((step, index) => (
<TouchableOpacity
key={step.key}
onPress={() => handleStepClick(step.key)}
style={styles.stepContainer}
>
<View style={[styles.circle, { backgroundColor:
getColor(step.key) }]}>
<Text style={styles.circleText}>{index + 1}</Text>
</View>
<Text style={styles.label}>{step.label}</Text>
</TouchableOpacity>
))}
</View>
<TouchableOpacity
style={[styles.button, { backgroundColor: '#4CAF50' }]}
onPress={() =>
router.push(`/technician/update/FileUpload?customerUid=${id}`)}
>
<Text style={styles.buttonText}>📷 Upload Customer Photo</Text>
</TouchableOpacity>

</ScrollView>
);
}

const styles = StyleSheet.create({
container: { flexGrow: 1, padding: 20, alignItems: 'center',
backgroundColor: '#fff' },
title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 ,marginTop:40 },
subtext: { fontSize: 14, color: '#666', marginBottom: 20 },
stepsColumn: {
width: '100%',
alignItems: 'center',
gap: 20,
},
stepContainer: {
alignItems: 'center',

backgroundColor: '#F5F5F5',
paddingVertical: 15,
borderRadius: 12,
elevation: 3,

width: '100%',







},
circle: {
width: 60,
height: 60,
borderRadius: 30,
justifyContent: 'center',
alignItems: 'center',
marginBottom: 8,
},
circleText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
label: { fontSize: 16, fontWeight: '600' },
button: {
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 8,
marginTop: 10,
},
buttonText: {
color: '#fff',
fontSize: 16,
fontWeight: '600',

},
});