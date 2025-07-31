import { FontAwesome } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { db } from '../../firebase/config';




export default function GiveFeedbackScreen() {
  const [bookedTechnicians, setBookedTechnicians] = useState<any[]>([]);
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;




  useEffect(() => {
    const fetchBookedTechnicians = async () => {
      if (!user) return;




      try {
        const bookingsSnapshot = await getDocs(
          query(
            collection(db, 'bookingRequests'),
            where('customerId', '==', user.uid),
            where('status', '==', 'accepted')
          )
        );




        const techIds = new Set<string>();
        bookingsSnapshot.forEach(doc => {
          techIds.add(doc.data().technicianId);
        });




        if (techIds.size === 0) {
          setBookedTechnicians([]);
          return;
        }




        const techSnapshot = await getDocs(collection(db, 'technicians'));
        const filteredTechs = techSnapshot.docs
          .filter(doc => techIds.has(doc.id))
          .map(doc => ({ id: doc.id, ...doc.data() }));




        setBookedTechnicians(filteredTechs);
      } catch (error) {
        console.error('Error fetching booked technicians:', error);
      }
    };




    fetchBookedTechnicians();
  }, []);




  const handleSubmit = async () => {
    if (!selectedTechnician || rating === 0 || comment.trim() === '') {
      Alert.alert('Please fill all fields');
      return;
    }




    try {
      // ✅ Check if feedback already exists for this technician by this user
      const feedbackQuery = await getDocs(
        query(
          collection(db, 'feedbacks'),
          where('technicianId', '==', selectedTechnician.id),
          where('customerId', '==', user?.uid)
        )
      );




      if (!feedbackQuery.empty) {
        Alert.alert('You have already given feedback to this technician.');
        return;
      }




      const techRef = doc(db, 'technicians', selectedTechnician.id);
      const prevRating = selectedTechnician.rating || 0;
      const totalRatings = selectedTechnician.totalRatings || 0;




      const newTotalRatings = totalRatings + 1;
      const newAvgRating = ((prevRating * totalRatings) + rating) / newTotalRatings;




      // ✅ Update technician document
      await updateDoc(techRef, {
        rating: parseFloat(newAvgRating.toFixed(1)),
        totalRatings: newTotalRatings
      });




      // ✅ Add feedback with customerId
      await addDoc(collection(db, 'feedbacks'), {
        technicianId: selectedTechnician.id,
        technicianName: selectedTechnician.name,
        customerId: user?.uid,
        rating,
        comment: comment.trim(),
        timestamp: serverTimestamp()
      });




      Alert.alert('✅ Feedback submitted!');
      setSelectedTechnician(null);
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      Alert.alert('❌ Failed to submit feedback');
    }
  };




  const renderStars = () => {
    return (
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <FontAwesome
              name={i <= rating ? 'star' : 'star-o'}
              size={30}
              color="#FFD700"
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };




  return (
    // <ScrollView contentContainerStyle={styles.container}>
    <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={styles.container}>

      <Text style={styles.title}>Give Feedback</Text>




      <Text style={styles.label}>Select Technician:</Text>
      {bookedTechnicians.length === 0 ? (
        <Text style={{ color: 'gray' }}>You have not booked any technician.</Text>
      ) : (
        bookedTechnicians.map(tech => (
          <TouchableOpacity
            key={tech.id}
            style={[
              styles.technicianCard,
              selectedTechnician?.id === tech.id && styles.selectedCard
            ]}
            onPress={() => setSelectedTechnician(tech)}
          >
            <Text style={styles.technicianText}>
              {tech.name} ({tech.area})
            </Text>
          </TouchableOpacity>
        ))
      )}




      <Text style={styles.label}>Rate Technician:</Text>
      {renderStars()}




      <Text style={styles.label}>Comments:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your feedback..."
        multiline
        value={comment}
        onChangeText={setComment}
      />




      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    marginTop: 16
  },
  technicianCard: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
    borderRadius: 8
  },
  selectedCard: {
    backgroundColor: '#add8e6'
  },
  technicianText: {
    fontSize: 16
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginTop: 8
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    marginTop: 24,
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});




