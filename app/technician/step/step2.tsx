import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import {
    ActivityIndicator, Alert, ScrollView, StyleSheet, Text,
    TouchableOpacity, View
} from 'react-native';
import { db } from '../../../firebase/config';
const questions = [
"Did the technician check if the distribution board has enough capacity and confirm the location and distance of the meter box?",
"Is there suitable space for the inverter",
"are the distances from the panels to inverter and inverter to distribution board within acceptable limits?"
];
export default function Step2() {
const { id } = useLocalSearchParams();
const router = useRouter();
const [answers, setAnswers] = useState({});
const [loading, setLoading] = useState(true);
useEffect(() => {
const loadData = async () => {
if (!id) return;
const localKey = `step2-${id}`;
try {
const ref = doc(db, 'installationStatus', id);
const snap = await getDoc(ref);
if (snap.exists()) {
const data = snap.data();
setAnswers(data?.step2?.answers || {});
} else {
// Load from local cache
const cached = await AsyncStorage.getItem(localKey);
if (cached) {
setAnswers(JSON.parse(cached));
}
}
} catch (err) {
console.error('Error loading data:', err);
} finally {
setLoading(false);
}
};

loadData();
}, [id]);
const handleAnswer = (index, value) => {
const updated = { ...answers, [index]: value };
setAnswers(updated);
if (id) {
AsyncStorage.setItem(`step2-${id}`, JSON.stringify(updated));
}
};
const handleSubmit = async () => {
if (!id) return Alert.alert('Error', 'Missing installation ID');
const allAnswered = questions.every((_, idx) => answers[idx] !==
undefined);
if (!allAnswered) return Alert.alert("Please answer all questions");
const allYes = Object.values(answers).every(ans => ans === 'yes');
const status = allYes ? 'green' : 'red';
const step2Data = { answers, status };
const ref = doc(db, 'installationStatus', id);
const { isConnected } = await NetInfo.fetch();
if (isConnected) {
try {
await setDoc(ref, { step2: step2Data }, { merge: true });
await AsyncStorage.removeItem(`step2-${id}`);
Alert.alert('Saved', `Step 2 marked as
${status.toUpperCase()}`);
} catch (err) {
Alert.alert('Error', 'Failed to sync with Firestore');
}
} else {
await AsyncStorage.setItem(`offline-step2-${id}`,
JSON.stringify(step2Data));
Alert.alert('Offline', 'Data saved locally. Will sync when back online.');
}

router.replace(`/technician/update/${id}`);
};
if (loading) {
return (
<View style={styles.loading}>
<ActivityIndicator size="large" color="#0000ff" />
</View>
);
}
return (
<ScrollView contentContainerStyle={styles.container}>
<Text style={styles.title}>Step 2: Electrical Installation</Text>
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
submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
loading: { flex: 1, justifyContent: 'center', alignItems: 'center',
backgroundColor: '#fff' }
});