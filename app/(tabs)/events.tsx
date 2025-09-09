
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { EventCard, Loading } from '../../components';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import { getEvents } from '../../services/eventService';
import { Event } from '../../types/event';

export default function EventsScreen() {
  useAuthGuard(); 

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  if (loading) return <Loading message="Loading events..." />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
