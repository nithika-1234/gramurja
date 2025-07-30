    import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function GenerateBill() {
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [billItems, setBillItems] = useState([]);

  const handleAddItem = () => {
    if (!selectedItem || !quantity || !price) return;

    setBillItems(prev => [...prev, {
      item: selectedItem,
      quantity,
      price,
      total: parseFloat(quantity) * parseFloat(price),
    }]);

    setSelectedItem('');
    setQuantity('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Bill for Work</Text>

      {/* Item dropdown / input */}
      <TextInput
        placeholder="Enter Item Name"
        value={selectedItem}
        onChangeText={setSelectedItem}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />

      <Button title="Add Item" onPress={handleAddItem} />

      <FlatList
        data={billItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.item} - {item.quantity} x ₹{item.price} = ₹{item.total}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5 },
});
