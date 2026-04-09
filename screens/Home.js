import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

const exercises = [
  { key: '1', name: 'Push Ups', type: 'reps', suggested: 'Plank' },
  { key: '2', name: 'Sit Ups', type: 'reps', suggested: 'Push Ups' },
  { key: '3', name: 'Plank', type: 'duration', suggested: 'Sit Ups' },
];

export default function Home({ navigation }) {

  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <Button
        title={item.name}
        onPress={() =>
          navigation.push(
            item.type === 'reps' ? 'Repetition' : 'Duration',
            { exercise: item, allExercises: exercises }
          )
        }
        buttonStyle={styles.button}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Tracker</Text>

      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 24, fontWeight: 'bold',
    marginBottom: 20, textAlign: 'center'
  },
  taskRow: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e91e63',
  },
});