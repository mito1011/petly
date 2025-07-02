// components/LiveTrackingCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LiveTrackingCard() {
  const [walkTime, setWalkTime] = useState(0);
  const [distance, setDistance] = useState(0.8);

  // Mock timer für Demo
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setWalkTime(prev => prev + 1);
    }, 1000);

    const distanceInterval = setInterval(() => {
      setDistance(prev => prev + 0.006); // Viel langsamer: nur 0.002km alle 3 Sekunden
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(distanceInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.statusIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.statusText}>LIVE</Text>
        </View>
        <Text style={styles.demoLabel}>DEMO</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.petInfo}>
          <Ionicons name="paw" size={20} color="#1E5128" />
          <Text style={styles.petName}>Max is on a walk</Text>
        </View>
        
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.statValue}>{formatTime(walkTime)}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          
          <View style={styles.stat}>
            <Ionicons name="footsteps" size={16} color="#666" />
            <Text style={styles.statValue}>{distance.toFixed(2)} km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          
          <View style={styles.stat}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.statValue}>Günther-Klotz-Anlage</Text>
            <Text style={styles.statLabel}>Location</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>🎉 Live tracking coming soon - stay tuned!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E8F5E8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
    marginRight: 6,
  },
  statusText: {
    color: '#FF4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  demoLabel: {
    backgroundColor: '#FFF3E0',
    color: '#FF8F00',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  petName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E5128',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
