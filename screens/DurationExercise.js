import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default function DurationExercise({ route, navigation }) {
  const { exercise, allExercises } = route.params;
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

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
      <Text style={styles.count}>Time: {time}s</Text>

      <Button title="Start" onPress={() => setRunning(true)} buttonStyle={styles.button}/>
      <Button title="Stop" onPress={() => setRunning(false)} buttonStyle={styles.button}/>
      <Button title="Reset" onPress={() => setTime(0)} buttonStyle={styles.button}/>

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