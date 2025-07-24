// // App.tsx

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import InventoryHistory from './technician/InventoryHistory';
// import TechnicianDetails from './technician/TechnicianDetails';

// export type RootStackParamList = {
//   InventoryHistory: undefined;
//   TechnicianDetails: { techEmail: string };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="InventoryHistory">
//         <Stack.Screen name="InventoryHistory" component={InventoryHistory} />
//         <Stack.Screen name="TechnicianDetails" component={TechnicianDetails} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );


// }


// App.tsx

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import ManageQuantitiesScreen from './technician/ManageQuantitiesScreen';
// import SelectedItemsScreen from './technician/SelectedItemsScreen';

// export type InventoryItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   price: number;
// };

// export type RootStackParamList = {
  
//   SelectedItems: undefined;
//   ManageQuantities: { selectedItems: InventoryItem[] };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SelectedItems">
       
//         <Stack.Screen name="SelectedItems" component={SelectedItemsScreen} />
//         <Stack.Screen name="ManageQuantities" component={ManageQuantitiesScreen} />
       
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SelectedItemsScreen from './technician/SelectedItemsScreen';
import OptionSelectedScreen from './technician/OptionSelectedScreen';

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  option: boolean;
};

export type RootStackParamList = {
  SelectedItemsScreen: undefined;
  OptionSelectedScreen: { selectedItems: { id: string; name: string }[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectedItemsScreen">
        <Stack.Screen 
          name="SelectedItemsScreen" 
          component={SelectedItemsScreen}
          options={{ title: 'Inventory Management' }}
        />
        <Stack.Screen 
          name="OptionSelectedScreen" 
          component={OptionSelectedScreen}   
          options={{ title: 'Selected Items Summary' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
