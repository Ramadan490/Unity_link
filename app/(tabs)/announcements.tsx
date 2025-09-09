
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { AnnouncementCard, Loading } from '../../components';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import { useRole } from '../../hooks/useRole';
import { getAnnouncements } from '../../services/announcementService';
import { Announcement } from '../../types/announcement';

export default function AnnouncementsScreen() {
  useAuthGuard(); 

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSuperAdmin, isBoardMember } = useRole();

  useEffect(() => {
    const loadAnnouncements = async () => {
      const data = await getAnnouncements();
      setAnnouncements(data);
      setLoading(false);
    };
    loadAnnouncements();
  }, []);

  if (loading) return <Loading message="Loading announcements..." />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📢 Announcements</Text>

      {(isSuperAdmin || isBoardMember) && (
        <Button title="➕ Add Announcement" onPress={() => alert('TODO: Create form')} />
      )}

      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementCard announcement={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
