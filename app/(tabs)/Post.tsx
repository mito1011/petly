// app/(tabs)/post.tsx
import { useUserRole } from '@/context/UserRoleContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Alert,
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
  Exotic: 'https://media.istockphoto.com/id/495292808/photo/colorful-cute-toucan-tropical-bird-brazilian-amazon-blurred-green-background.jpg?s=612x612&w=0&k=20&c=5B5wcwa35ciXxbZEOZ0_dJjqZFmnMMl2__4V2ud4sZY=',
};

const animalTypeOptions = [
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Bird', value: 'bird' },
  { label: 'Exotic', value: 'exotic' },
  { label: 'Other', value: 'other' },
];

const sizeOptions = ['Small', 'Medium', 'Large'];

const tagOptions = [
  { label: 'House Sitting', value: 'house-sitting' },
  { label: 'Walks', value: 'walks' },
  { label: 'Feeding', value: 'feeding' },
  { label: 'Overnight', value: 'overnight' },
  { label: 'Daycare', value: 'day-care' },
  { label: 'Drop-in Visit', value: 'drop-in-visit' },
];

export default function PostScreen() {
  const { userInfo } = useUserRole();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    species: 'dog',
    listingType: [],
    startDate: '',
    endDate: '',
    sitterVerified: false,
    price: '',
    breed: '',
    age: '',
    size: 'Medium',
    feeding: '',
    medication: '',
  });

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      listingType: prev.listingType.includes(tag)
        ? prev.listingType.filter((t) => t !== tag)
        : [...prev.listingType, tag],
    }));
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const getImageForAnimal = () => imageMap[form.animalTypes] || imageMap.Other;

  const handleSubmit = async () => {
    // Frontend-Validierung
    if (!form.title.trim()) {
      showAlert('Fehler', 'Title ist ein Pflichtfeld.');
      return;
    }
    if (!form.description.trim()) {
      showAlert('Fehler', 'Description ist ein Pflichtfeld.');
      return;
    }
    if (!form.species) {
      showAlert('Fehler', 'Animal Type ist ein Pflichtfeld.');
      return;
    }
    if (!form.listingType || form.listingType.length === 0) {
      showAlert('Fehler', 'Bitte mindestens einen Tag auswählen.');
      return;
    }
    if (!form.startDate) {
      showAlert('Fehler', 'Start Date ist ein Pflichtfeld.');
      return;
    }
    if (!form.endDate) {
      showAlert('Fehler', 'End Date ist ein Pflichtfeld.');
      return;
    }
    if (form.price === '' || isNaN(Number(form.price)) || Number(form.price) < 0) {
      showAlert('Fehler', 'Price muss eine Zahl größer oder gleich 0 sein.');
      return;
    }
    if (typeof form.sitterVerified !== 'boolean') {
      showAlert('Fehler', 'Sitter Verified ist ein Pflichtfeld.');
      return;
    }

    // Optional: Age validieren, falls ausgefüllt
    if (form.age !== '' && (isNaN(Number(form.age)) || Number(form.age) < 0)) {
      showAlert('Fehler', 'Age muss eine Zahl größer oder gleich 0 sein.');
      return;
    }

    if (!userInfo) return showAlert('Error', 'User not found');

    // Validierung: species muss Enum sein
    const allowedSpecies = ['dog', 'cat', 'bird', 'exotic', 'other'];
    if (!allowedSpecies.includes(form.species)) {
      showAlert('Fehler', 'Ungültige Tierart.');
      return;
    }

    // Validierung: Datum im ISO8601-Format
    const isISODate = (str) => /^\d{4}-\d{2}-\d{2}/.test(str);
    if (!isISODate(form.startDate) || !isISODate(form.endDate)) {
      showAlert('Fehler', 'Bitte gültige Start- und Enddaten im Format YYYY-MM-DD eingeben.');
      return;
    }

    const payload = {
      ownerId: userInfo.userId,
      title: form.title,
      description: form.description,
      species: form.species,
      listingType: form.listingType,
      startDate: form.startDate,
      endDate: form.endDate,
      sitterVerified: !!form.sitterVerified,
      price: Number(form.price),
      breed: form.breed || undefined,
      age: form.age ? Number(form.age) : undefined,
      size: form.size || undefined,
      feeding: form.feeding || undefined,
      medication: form.medication || undefined,
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
      showAlert('Erfolg', 'Listing wurde erstellt!');
      setForm({
        title: '',
        description: '',
        species: 'dog',
        listingType: [],
        startDate: '',
        endDate: '',
        sitterVerified: false,
        price: '',
        breed: '',
        age: '',
        size: 'Medium',
        feeding: '',
        medication: '',
      });
    } catch (error) {
      console.error('❌ Fehler beim Speichern:', error);
      showAlert('Fehler', 'Konnte das Listing nicht speichern');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hilfsfunktion für Formatierung
  const formatDate = (date) =>
    date ? new Date(date).toISOString().slice(0, 10) : '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Listing</Text>

      <Input label="Title *" value={form.title} onChangeText={(val) => handleChange('title', val)} />
      <Input label="Description *" value={form.description} onChangeText={(val) => handleChange('description', val)} />

      <Dropdown
        label="Animal Type *"
        selected={form.species}
        options={animalTypeOptions.map(opt => opt.value)}
        optionLabels={animalTypeOptions.map(opt => opt.label)}
        onChange={(val) => handleChange('species', val)}
      />

      <Dropdown
        label="Size"
        selected={form.size}
        options={sizeOptions}
        onChange={(val) => handleChange('size', val)}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tags *</Text>
        <View style={styles.tagContainer}>
          {tagOptions.map((tag) => (
            <TouchableOpacity
              key={tag.value}
              style={[styles.tag, form.listingType.includes(tag.value) && styles.tagSelected]}
              onPress={() => toggleTag(tag.value)}
            >
              <Text
                style={[
                  styles.tagText,
                  form.listingType.includes(tag.value) && styles.tagTextSelected,
                ]}
              >
                {tag.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Start Date *</Text>
        {Platform.OS === 'web' ? (
          <input
            style={{
              ...styles.input,
              width: '100%',
              boxSizing: 'border-box',
              fontSize: 14,
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              background: '#f9f9f9',
              marginBottom: 14,
            }}
            type="date"
            value={form.startDate}
            onChange={e => handleChange('startDate', e.target.value)}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowStartPicker(true)}
            >
              <Text>{form.startDate ? formatDate(form.startDate) : 'Datum wählen'}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={form.startDate ? new Date(form.startDate) : new Date()}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) {
                    handleChange('startDate', formatDate(selectedDate));
                  }
                }}
              />
            )}
          </>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>End Date *</Text>
        {Platform.OS === 'web' ? (
          <input
            style={{
              ...styles.input,
              width: '100%',
              boxSizing: 'border-box',
              fontSize: 14,
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              background: '#f9f9f9',
              marginBottom: 14,
            }}
            type="date"
            value={form.endDate}
            onChange={e => handleChange('endDate', e.target.value)}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowEndPicker(true)}
            >
              <Text>{form.endDate ? formatDate(form.endDate) : 'Datum wählen'}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={form.endDate ? new Date(form.endDate) : new Date()}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) {
                    handleChange('endDate', formatDate(selectedDate));
                  }
                }}
              />
            )}
          </>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sitter Verified *</Text>
        <TouchableOpacity
          style={[styles.tag, form.sitterVerified && styles.tagSelected]}
          onPress={() => handleChange('sitterVerified', !form.sitterVerified)}
        >
          <Text style={[styles.tagText, form.sitterVerified && styles.tagTextSelected]}>
            {form.sitterVerified ? 'Yes' : 'No'}
          </Text>
        </TouchableOpacity>
      </View>

      <Input label="Price (€) *" value={form.price} onChangeText={(val) => handleChange('price', val)} />
      <Input label="Breed" value={form.breed} onChangeText={(val) => handleChange('breed', val)} />
      <Input label="Age" value={form.age} onChangeText={(val) => handleChange('age', val)} />
      <Input label="Feeding" value={form.feeding} onChangeText={(val) => handleChange('feeding', val)} />
      <Input label="Medication" value={form.medication} onChangeText={(val) => handleChange('medication', val)} />

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

function Dropdown({ label, selected, options, optionLabels, onChange }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => onChange(itemValue)}
          style={Platform.OS === 'ios' ? styles.pickerIOS : undefined}
        >
          {options.map((opt, index) => (
            <Picker.Item
              label={optionLabels?.[index] ?? String(opt)}
              value={opt}
              key={opt}
            />
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


function showAlert(title, message) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}


