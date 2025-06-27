// screens/SaveScreen.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SaveScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Save/Post screen. You can implement the form for creating a new listing here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default SaveScreen;