import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TagSelector({ tags, selectedTags, onSelectTag }) {
  return (
    <View style={styles.container}>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <TouchableOpacity
            key={tag}
            style={[styles.tag, isSelected && styles.selected]}
            onPress={() => onSelectTag(tag)}
          >
            <Text style={isSelected ? styles.selectedText : styles.text}>{tag}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  selected: {
    backgroundColor: '#34c759',
  },
  text: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
