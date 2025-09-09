
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Loading, MemorialCard } from '../../components';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import { useRole } from '../../hooks/useRole';
import { addMemorial, getMemorials } from '../../services/memorialService';
import { Memorial } from '../../types/memorial';

export default function MemorialsScreen() {
  useAuthGuard(); 

  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { isSuperAdmin, isBoardMember, isCommunityMember } = useRole();

  useEffect(() => {
    const loadMemorials = async () => {
      const data = await getMemorials();
      setMemorials(data);
      setLoading(false);
    };
    loadMemorials();
  }, []);

  const handleAddMemorial = async () => {
    if (!name.trim() || !message.trim()) return;
    const newMemorial = await addMemorial(name, message);
    setMemorials((prev) => [...prev, newMemorial]);
    setName('');
    setMessage('');
  };

  if (loading) return <Loading message="Loading memorials..." />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Memorials</Text>

      {(isSuperAdmin || isBoardMember || isCommunityMember) && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Add Memorial" onPress={handleAddMemorial} />
        </View>
      )}

      <FlatList
        data={memorials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MemorialCard memorial={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
  },
});
