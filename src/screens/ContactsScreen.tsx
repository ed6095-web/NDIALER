import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Haptics from 'expo-haptics';
import { colors, typography, spacing } from '../theme';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName,
        });

        if (data.length > 0) {
          setContacts(data);
        }
      } else {
        setPermissionGranted(false);
      }
      setLoading(false);
    })();
  }, []);

  const handleCall = (phoneNumber: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const cleanNumber = phoneNumber.replace(/[\s-()]/g, '');
    const url = `tel:${cleanNumber}`;
    Linking.openURL(url).catch((err) => {
      console.error('An error occurred', err);
      Alert.alert('Error', 'Calling is not supported on this device.');
    });
  };

  const renderItem = ({ item }: { item: Contacts.Contact }) => {
    // Only show contacts with names and phone numbers
    if (!item.name || !item.phoneNumbers || item.phoneNumbers.length === 0) return null;

    const phoneNumber = item.phoneNumbers[0].number;

    return (
      <TouchableOpacity 
        style={styles.contactItem} 
        onPress={() => handleCall(phoneNumber || '')}
        activeOpacity={0.7}
      >
        <Text style={styles.contactName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.contactNumber}>{phoneNumber}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Contacts permission is required.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => (item as any).id?.toString() || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: spacing.md,
  },
  contactItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background, // pure black
  },
  contactName: {
    color: colors.text,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.xs,
  },
  contactNumber: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.secondarySurface,
    marginLeft: spacing.lg,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: typography.size.md,
  },
});
