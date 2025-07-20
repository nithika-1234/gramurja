    import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to GramUrja</Text>
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 }
});
