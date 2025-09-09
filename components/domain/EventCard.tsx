import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from '../../constants/Colors'; // ✅ correct relative path
import { Event } from '../../types/event'; // ✅ correct relative path
import { formatDate } from '../../utils/formatDate'; // ✅ correct relative path

type Props = { event: Event };

export default function EventCard({ event }: Props) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>{event.title}</Text>
      <Text style={{ color: theme.secondaryText }}>
        {formatDate(event.date)} @ {event.location}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
});
