    import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Welcome to GramUrja 🚀</Text>
      <Button title="Back to Login" onPress={() => router.push('/Login')} />
    </View>
  );
}