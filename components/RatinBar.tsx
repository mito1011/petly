import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RatingBarProps {
  ratingBreakdown: { [key: number]: number }; // z. B. { 5: 90, 4: 7, ... }
}

export default function RatingBar({ ratingBreakdown }: RatingBarProps) {
  const maxValue = Math.max(...Object.values(ratingBreakdown));

  return (
    <View style={styles.container}>
      {[5, 4, 3, 2, 1].map((star) => (
        <View key={star} style={styles.row}>
          <Text style={styles.label}>{star}</Text>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  width: `${ratingBreakdown[star] || 0}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.percent}>{(ratingBreakdown[star] || 0)}%</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    width: 14,
    fontSize: 12,
    fontWeight: 'bold',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    marginHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: 8,
    backgroundColor: '#34c759',
  },
  percent: {
    width: 40,
    fontSize: 12,
    color: '#333',
  },
});
