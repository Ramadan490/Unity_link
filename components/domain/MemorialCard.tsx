// components/MemorialCard.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Memorial } from '../types/memorial';
import { formatDate } from '../utils/formatDate';

type Props = { memorial: Memorial };

export default function MemorialCard({ memorial }: Props) {
  return (
    <View style={styles.card}>
      {memorial.image && <Image source={{ uri: memorial.image }} style={styles.image} />}
      <Text style={styles.name}>{memorial.name}</Text>
      <Text style={styles.message}>{memorial.message}</Text>
      <Text style={styles.meta}>Added on {formatDate(memorial.createdAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  message: { fontSize: 16, marginTop: 5 },
  meta: { fontSize: 12, color: 'gray', marginTop: 4 },
  image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
});
