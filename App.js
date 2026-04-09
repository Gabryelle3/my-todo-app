import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Exercise data array
const exercises = [
  { key: '1', name: 'Push Ups', type: 'reps', suggested: 'Plank' },
  { key: '2', name: 'Sit Ups', type: 'reps', suggested: 'Push Ups' },
  { key: '3', name: 'Plank', type: 'duration', suggested: 'Sit Ups' },
];

// Home screen
function Home({ navigation }) {
  // Notes state (kept exactly like your original code)
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Do homework', completed: false },
    { key: '2', description: 'Study React Native', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  // Toggle task completion
  const toggleTask = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { key: Date.now().toString(), description: newTask, completed: false }
    ]);
    setNewTask('');
  };

  // Render each note
  const renderTask = ({ item }) => (
    <TouchableOpacity onPress={() => toggleTask(item.key)} style={styles.taskRow}>
      <Text style={{
        fontSize: 18,
        textDecorationLine: item.completed ? 'line-through' : 'none'
      }}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  // Render each exercise
  const renderExercise = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.push(
          item.type === 'reps' ? 'Repetition' : 'Duration',
          { exercise: item, allExercises: exercises }
        )
      }
      style={styles.exerciseRow}
    >
      <Text style={styles.taskText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* Notes section */}
      <Text style={styles.title}>My Notes</Text>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.key}
        style={styles.list}
      />

      <TextInput
        placeholder="Enter new task"
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />

      <TouchableOpacity onPress={addTask} style={styles.button}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Exercises section */}
      <Text style={styles.title}>Exercises</Text>

      <View style={styles.exerciseContainer}>
        <FlatList
          data={exercises}
          renderItem={renderExercise}
          keyExtractor={item => item.key}
        />
      </View>

    </View>
  );
}

// Repetition exercise screen
function RepetitionExercise({ route, navigation }) {
  const { exercise, allExercises } = route.params;
  const [count, setCount] = useState(0);

  // Go to suggested exercise
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

      <Button title="Add rep" onPress={() => setCount(count + 1)} buttonStyle={styles.button}/>
      <Button title="Reset" onPress={() => setCount(0)} buttonStyle={styles.button}/>

      <Button title="Suggested exercise" onPress={goToSuggested} buttonStyle={styles.button}/>
      <Button title="Home" onPress={() => navigation.navigate('Home')} buttonStyle={styles.button}/>
    </View>
  );
}

// Duration exercise screen
function DurationExercise({ route, navigation }) {
  const { exercise, allExercises } = route.params;
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  // Go to suggested exercise
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

      <Button title="Suggested exercise" onPress={goToSuggested} buttonStyle={styles.button}/>
      <Button title="Home" onPress={() => navigation.navigate('Home')} buttonStyle={styles.button}/>
    </View>
  );
}

// Main app with navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Repetition" component={RepetitionExercise} />
        <Stack.Screen name="Duration" component={DurationExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  list: {
    marginBottom: 20,
  },
  taskRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  exerciseRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center', // centers text in narrower container
  },
  taskText: {
    fontSize: 18,
  },
  exerciseContainer: {
    alignSelf: 'center',
    width: '70%', // makes exercise list narrower and centered
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e91e63',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});