
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Loading, RequestForm } from '../../components';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import { useRole } from '../../hooks/useRole';
import { addRequest, getRequests } from '../../services/requestService';
import { Request } from '../../types/request';
import { formatDate } from '../../utils/formatDate';

export default function RequestsScreen() {
  useAuthGuard(); 

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSuperAdmin, isBoardMember, isCommunityMember } = useRole();

  useEffect(() => {
    const loadRequests = async () => {
      const data = await getRequests();
      setRequests(data);
      setLoading(false);
    };
    loadRequests();
  }, []);

  const handleAddRequest = async (message: string) => {
    const req = await addRequest(message, 'Test User');
    setRequests((prev) => [...prev, req]);
  };

  if (loading) return <Loading message="Loading requests..." />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Requests</Text>

      {isCommunityMember && <RequestForm onSubmit={handleAddRequest} />}

      {(isSuperAdmin || isBoardMember) && (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.meta}>
                Submitted by {item.submittedBy} on {formatDate(item.createdAt)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  message: { fontSize: 16, fontWeight: '500' },
  meta: { fontSize: 12, color: 'gray', marginTop: 4 },
});
