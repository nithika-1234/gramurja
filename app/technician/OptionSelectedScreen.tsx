import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";

type OptionSelectedScreenRouteProp = RouteProp<RootStackParamList, "OptionSelectedScreen">;

const OptionSelectedScreen = () => {
  const route = useRoute<OptionSelectedScreenRouteProp>();
//   const selectedItems = route?.params?.selectedItems ?? []; // ✅ safe fallback
//   const { selectedItems } = route.params;
  const selectedItems = route.params?.selectedItems || [];


    //   const route = useRoute<OptionSelectedRouteProp>();

  if (selectedItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No items selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Items:</Text>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OptionSelectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2fef5",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#c8e6c9",
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#2e7d32",
  },
});
