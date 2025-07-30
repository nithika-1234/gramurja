import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../../firebase/config';
const questions = [
"Is the net meter installed, tested, and properly configured?",
"Are inverter parameters (voltage, frequency, generation) setcorrectly and is data visible?",
"Is the monitoring system online?"
];
export default function Step3() {
const { id } = useLocalSearchParams();
const router = useRouter();
const [answers, setAnswers] = useState({});
const [loading, setLoading] = useState(true);
useEffect(() => {

const loadData = async () => {
try {
// First try AsyncStorage (offline)
const local = await AsyncStorage.getItem(`step3_${id}`);
if (local) {
const parsed = JSON.parse(local);
setAnswers(parsed.answers || {});
} else {
// If no local data, try Firestore
const ref = doc(db, 'installationStatus', id);
const snap = await getDoc(ref);
if (snap.exists()) {
const data = snap.data();
setAnswers(data?.step3?.answers || {});
}
}
} catch (err) {
console.error('Load error:', err);
}
setLoading(false);
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
const stepData = {
answers,
status
};
try {

// ✅ Save to Firestore
const ref = doc(db, 'installationStatus', id);
await setDoc(ref, { step3: stepData }, { merge: true });
// ✅ Also save to AsyncStorage
await AsyncStorage.setItem(`step3_${id}`,
JSON.stringify(stepData));
Alert.alert('Saved', `Step 3 marked as ${status.toUpperCase()}`);
router.replace(`/technician/update/${id}`);
} catch (err) {
console.error('Submit error:', err);
Alert.alert('Error', 'Could not save your response.');
}
};
return (
<ScrollView contentContainerStyle={styles.container}>
<Text style={styles.title}>Step 3: Configuration</Text>
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