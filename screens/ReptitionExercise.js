import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default function RepetitionExercise({ route, navigation }) {
  const { exercise, allExercises } = route.params;
  const [count, setCount] = useState(0);

  const goToSuggested = () => {
    const next = allExercises.find(e => e.name === exercise.suggested);
    navigation.push(
      next.type === 'reps' ? 'Repetition' : 'Duration',
      { exercise: next, allExercises }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.count}>Count: {count}</Text>

      <Button title="Add Rep" onPress={() => setCount(count + 1)} buttonStyle={styles.button}/>
      <Button title="Reset" onPress={() => setCount(0)} buttonStyle={styles.button}/>

      <Button title="Suggested Exercise" onPress={goToSuggested} buttonStyle={styles.button}/>
      <Button title="Home" onPress={() => navigation.navigate('Home')} buttonStyle={styles.button}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  count: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: '#e91e63', marginBottom: 10 },
});