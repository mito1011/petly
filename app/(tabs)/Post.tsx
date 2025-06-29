import React, { useState } from 'react';
import { Picker, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const imageMap = {
  Dogs: 'https://placedog.net/400/400?id=10',
  Cats: 'https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg',
  Other: 'https://images.pexels.com/photos/52570/rabbit-pet-easter-animal-52570.jpeg',
};

const animalTypeOptions = ['Dogs', 'Cats', 'Other'];

export default function PostScreen() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: [],
    animalTypes: 'Dogs',
    about: '',
    breed: '',
    age: '',
    size: '',
    exercise: '',
    feeding: '',
    medication: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const getImageForAnimal = () => imageMap[form.animalTypes];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Listing</Text>

      <Input label="Title" value={form.title} onChangeText={(val) => handleChange('title', val)} />
      <Input label="Description" value={form.description} onChangeText={(val) => handleChange('description', val)} />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Animal Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.animalTypes}
            onValueChange={(itemValue) => handleChange('animalTypes', itemValue)}
            style={Platform.OS === 'ios' ? styles.pickerIOS : undefined}
          >
            {animalTypeOptions.map((type) => (
              <Picker.Item label={type} value={type} key={type} />
            ))}
          </Picker>
        </View>
      </View>

      <Input
        label="Tags (comma separated)"
        value={form.tags.join(', ')}
        onChangeText={(val) =>
          handleChange('tags', val.split(',').map((tag) => tag.trim()))
        }
      />
      <Input label="About" multiline value={form.about} onChangeText={(val) => handleChange('about', val)} />
      <Input label="Breed" value={form.breed} onChangeText={(val) => handleChange('breed', val)} />
      <Input label="Age" value={form.age} onChangeText={(val) => handleChange('age', val)} />
      <Input label="Size (Small, Medium, Large)" value={form.size} onChangeText={(val) => handleChange('size', val)} />
      <Input label="Exercise" value={form.exercise} onChangeText={(val) => handleChange('exercise', val)} />
      <Input label="Feeding" value={form.feeding} onChangeText={(val) => handleChange('feeding', val)} />
      <Input label="Medication" value={form.medication} onChangeText={(val) => handleChange('medication', val)} />

      <Text style={styles.imagePreviewNote}>📸 Image Preview for {form.animalTypes}:</Text>
      <Text style={styles.imageURL}>{getImageForAnimal()}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Input({ label, value, onChangeText, multiline = false }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  pickerIOS: {
    height: 120,
  },
  imagePreviewNote: {
    fontStyle: 'italic',
    marginVertical: 8,
    fontSize: 13,
    color: '#333',
  },
  imageURL: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E5128',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
