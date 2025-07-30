import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Inventory from './technician/Inventory'; // ✅ adjust path if needed
import InventoryHistory from './technician/InventoryHistory'; // ✅ adjust path if needed


export type RootStackParamList = {
  Inventory: undefined;
  InventoryHistory: undefined; // ✅ NO PARAM
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inventory">
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name="InventoryHistory" component={InventoryHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



