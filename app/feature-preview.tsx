// app/feature-preview.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FeaturePreviewScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E5128" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feature Preview</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroIcon}>
          <Ionicons name="location" size={48} color="#FF6B6B" />
        </View>
        <Text style={styles.heroTitle}>Live Pet Tracking</Text>
        <Text style={styles.heroSubtitle}>
          Know exactly where your furry friend is, anytime, anywhere
        </Text>
      </View>

      {/* Release Date */}
      <View style={styles.releaseBanner}>
        <Ionicons name="calendar" size={20} color="#FF8F00" />
        <Text style={styles.releaseText}>Coming October 1st, 2025</Text>
      </View>

      {/* Features List */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>What's Coming</Text>
        
        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Ionicons name="location-outline" size={20} color="#1E5128" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Real-Time GPS Tracking</Text>
            <Text style={styles.featureDescription}>
              See your pet's exact location on a live map during walks and playtime
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Ionicons name="footsteps-outline" size={20} color="#1E5128" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Walk Statistics</Text>
            <Text style={styles.featureDescription}>
              Track distance, duration, speed, and calories burned during walks
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Ionicons name="map-outline" size={20} color="#1E5128" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Route History</Text>
            <Text style={styles.featureDescription}>
              View complete walking routes and favorite spots your pet loves
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Ionicons name="notifications-outline" size={20} color="#1E5128" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Smart Alerts</Text>
            <Text style={styles.featureDescription}>
              Get notified when walks start, end, or if your pet leaves safe zones
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#1E5128" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Safe Zones</Text>
            <Text style={styles.featureDescription}>
              Set up safe areas and get alerts if your pet wanders too far
            </Text>
          </View>
        </View>
      </View>

      {/* How it Works */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepText}>
            Attach the lightweight GPS tracker to your pet's collar
          </Text>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepText}>
            Start a walk session with your sitter through the app
          </Text>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepText}>
            Watch live updates and get peace of mind knowing where your pet is
          </Text>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Be the First to Know</Text>
        <Text style={styles.ctaSubtitle}>
          We'll notify you as soon as live tracking is available!
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Ionicons name="mail" size={20} color="#fff" />
          <Text style={styles.ctaButtonText}>Notify Me</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E5128',
  },
  heroSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f8f9fa',
  },
  heroIcon: {
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E5128',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  releaseBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  releaseText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8F00',
  },
  featuresSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E5128',
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  featureIcon: {
    backgroundColor: '#E8F5E8',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E5128',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  howItWorksSection: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    padding: 32,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E5128',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
