    import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase/config';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});
