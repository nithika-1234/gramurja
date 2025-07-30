import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
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
const questions = [
"Have you checked the area, shape, type, and strength of the roof to confirm it's suitable for installation",
"Did the technician check the direction and angle of the roof to make sure it gets the most sunlight (optimal tilt for this location)?",
"Did the technician check if the roof is safe to work on, has proper waterproofing, and an adequate slope for water drainage?"
];
export default function Step1() {
const { id } = useLocalSearchParams();
const router = useRouter();
const [answers, setAnswers] = useState({});
const [loading, setLoading] = useState(true);
useEffect(() => {
const loadData = async () => {
try {
const ref = doc(db, 'installationStatus', id);
const snap = await getDoc(ref);
if (snap.exists()) {

const data = snap.data();
setAnswers(data?.step1?.answers || {});
} else {
// Load from AsyncStorage if exists
const local = await AsyncStorage.getItem(`step1_${id}`);
if (local) {
const parsed = JSON.parse(local);
setAnswers(parsed.answers || {});
}
}
} catch (err) {
console.error("Load error:", err);
} finally {
setLoading(false);
}
};
if (id) loadData();
}, [id]);
const handleAnswer = (index, value) => {
setAnswers(prev => ({ ...prev, [index]: value }));
};
const handleSubmit = async () => {
const allAnswered = questions.every((_, idx) => answers[idx] !==
undefined);
if (!allAnswered) return Alert.alert("Please answer all questions");
const allYes = Object.values(answers).every(ans => ans === 'yes');
const status = allYes ? 'green' : 'red';
const data = { answers, status };
try {
const net = await NetInfo.fetch();
if (net.isConnected) {
const ref = doc(db, 'installationStatus', id);
await setDoc(ref, { step1: data }, { merge: true });
}
} catch (err) {
console.warn("Firestore write failed (offline mode)", err);
}

// Always save locally
await AsyncStorage.setItem(`step1_${id}`, JSON.stringify(data));
Alert.alert('Saved', `Step 1 marked as ${status.toUpperCase()}`);
router.replace(`/technician/update/${id}`);
};
return (
<ScrollView contentContainerStyle={styles.container}>
<Text style={styles.title}>Step 1: Roof Suitability</Text>
{questions.map((q, idx) => (
<View key={idx} style={styles.card}>
<Text style={styles.question}>{q}</Text>
<View style={styles.buttonRow}>
<TouchableOpacity
style={[styles.option, answers[idx] === 'yes' &&
styles.selectedYes]}
onPress={() => handleAnswer(idx, 'yes')}
>
<Text style={styles.optionText}>Yes</Text>
</TouchableOpacity>
<TouchableOpacity
style={[styles.option, answers[idx] === 'no' &&
styles.selectedNo]}
onPress={() => handleAnswer(idx, 'no')}
>
<Text style={styles.optionText}>No</Text>
</TouchableOpacity>
</View>
</View>
))}
<TouchableOpacity onPress={handleSubmit} style={styles.submit}>
<Text style={styles.submitText}>Submit</Text>
</TouchableOpacity>
<TouchableOpacity
style={[styles.submit, { backgroundColor: '#777', marginTop: 10 }]}
onPress={async () => {
try {
const data = await AsyncStorage.getItem(`step1_${id}`);
if (data) {
console.log("Stored data:", JSON.parse(data));
Alert.alert("Check your console", "Local data has been logged.");

} else {
console.log("No local data found for:", `step1_${id}`);
Alert.alert("No data", `Nothing found for key step1_${id}`);
}
} catch (error) {
console.error("Error reading local data", error);
Alert.alert("Error", "Failed to read local data.");
}
}}
>
<Text style={styles.submitText}>Log Stored Data</Text>
</TouchableOpacity>
</ScrollView>
);
}
const styles = StyleSheet.create({
container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
card: { marginBottom: 20, backgroundColor: '#F0F0F0', padding: 15,
borderRadius: 10 },
question: { fontSize: 16, marginBottom: 10 },
buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
option: { flex: 1, marginHorizontal: 5, backgroundColor: '#ccc',
padding: 12, alignItems: 'center', borderRadius: 8 },
selectedYes: { backgroundColor: '#4CAF50' },
selectedNo: { backgroundColor: '#F44336' },
optionText: { color: '#fff', fontWeight: 'bold' },
submit: { backgroundColor: '#3F51B5', padding: 15, borderRadius: 10,
alignItems: 'center' },
submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});