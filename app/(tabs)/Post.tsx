// app/(tabs)/post.tsx
import { useUserRole } from '@/context/UserRoleContext';
import React, { useState } from 'react';
import {
  Alert,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const BASE_URL = 'http://localhost:3000/api/v1';

const imageMap = {
  Dogs: 'https://placedog.net/400/400?id=10',
  Cats: 'https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg',
  Other:
    'https://www.shutterstock.com/image-photo/row-five-common-small-domestic-260nw-394830724.jpg',
};

const animalTypeOptions = ['Dogs', 'Cats', 'Other'];
const tagOptions = ['Walks', 'Daycare', 'Feeding', 'Training', 'Overnight'];
const sizeOptions = ['Small', 'Medium', 'Large'];

export default function PostScreen() {
  const { userInfo } = useUserRole();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: [],
    animalTypes: 'Dogs',
    about: '',
    breed: '',
    age: '',
    size: 'Medium',
    exercise: '',
    feeding: '',
    medication: '',
  });

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const getImageForAnimal = () => imageMap[form.animalTypes] || imageMap.Other;

  const handleSubmit = async () => {
    if (!userInfo) return Alert.alert('Error', 'User not found');

    const payload = {
      ...form,
      image: getImageForAnimal(),
      ownerId: userInfo.userId,
    };

    console.log('📤 Sende neues Listing:', payload);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen');
      }

      const created = await response.json();
      console.log('✅ Listing erstellt:', created);
      Alert.alert('Erfolg', 'Listing wurde erstellt!');
      setForm({
        title: '',
        description: '',
        tags: [],
        animalTypes: 'Dogs',
        about: '',
        breed: '',
        age: '',
        size: 'Medium',
        exercise: '',
        feeding: '',
        medication: '',
      });
    } catch (error) {
      console.error('❌ Fehler beim Speichern:', error);
      Alert.alert('Fehler', 'Konnte das Listing nicht speichern');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Listing</Text>

      <Input label="Title" value={form.title} onChangeText={(val) => handleChange('title', val)} />
      <Input label="Description" value={form.description} onChangeText={(val) => handleChange('description', val)} />

      <Dropdown
        label="Animal Type"
        selected={form.animalTypes}
        options={animalTypeOptions}
        onChange={(val) => handleChange('animalTypes', val)}
      />

      <Dropdown
        label="Size"
        selected={form.size}
        options={sizeOptions}
        onChange={(val) => handleChange('size', val)}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tags</Text>
        <View style={styles.tagContainer}>
          {tagOptions.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tag, form.tags.includes(tag) && styles.tagSelected]}
              onPress={() => toggleTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  form.tags.includes(tag) && styles.tagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Input label="About" multiline value={form.about} onChangeText={(val) => handleChange('about', val)} />
      <Input label="Breed" value={form.breed} onChangeText={(val) => handleChange('breed', val)} />
      <Input label="Age" value={form.age} onChangeText={(val) => handleChange('age', val)} />
      <Input label="Exercise" value={form.exercise} onChangeText={(val) => handleChange('exercise', val)} />
      <Input label="Feeding" value={form.feeding} onChangeText={(val) => handleChange('feeding', val)} />
      <Input label="Medication" value={form.medication} onChangeText={(val) => handleChange('medication', val)} />

      <Text style={styles.imagePreviewNote}>📸 Image Preview for {form.animalTypes}:</Text>
      <Text style={styles.imageURL}>{getImageForAnimal()}</Text>

      <TouchableOpacity
        style={[styles.button, isSubmitting && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>{isSubmitting ? 'Saving...' : 'Save Listing'}</Text>
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

function Dropdown({ label, selected, options, onChange }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => onChange(itemValue)}
          style={Platform.OS === 'ios' ? styles.pickerIOS : undefined}
        >
          {options.map((opt) => (
            <Picker.Item label={opt} value={opt} key={opt} />
          ))}
        </Picker>
      </View>
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagSelected: {
    backgroundColor: '#1E5128',
  },
  tagText: {
    fontSize: 13,
    color: '#333',
  },
  tagTextSelected: {
    color: '#fff',
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
