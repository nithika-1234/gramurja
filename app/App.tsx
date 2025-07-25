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
import OptionSelectedScreen from './technician/OptionSelectedScreen';
import SelectedItemsScreen from './technician/SelectedItemsScreen';

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
  OptionSelectedScreen: {selectedItems: InventoryItem[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectedItemsScreen">
        <Stack.Screen 
          name="SelectedItemsScreen" 
          component={SelectedItemsScreen}
        />
        <Stack.Screen 
          name="OptionSelectedScreen" 
          component={OptionSelectedScreen}   
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Inventory from './technician/Inventory'; // Adjust path if needed
// import InventoryHistory from './technician/InventoryHistory'; // Adjust path if needed

// export type RootStackParamList = {
//   Inventory: undefined;
//   InventoryHistory: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Inventory">
//         <Stack.Screen
//           name="Inventory"
//           component={Inventory}
//           options={{ title: 'Inventory' }}
//         />
//         <Stack.Screen
//           name="InventoryHistory"
//           component={InventoryHistory}
//           options={{ title: 'Inventory History' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

