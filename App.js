import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Do homework', completed: false },
    { key: '2', description: 'Study React Native', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  // Toggle a task's completed status
  const toggleTask = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  // Add a new task
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { key: Date.now().toString(), description: newTask, completed: false }]);
    setNewTask('');
  };

  // Render each task
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleTask(item.key)} style={styles.taskRow}>
      <Text style={{ 
        fontSize: 18, 
        textDecorationLine: item.completed ? 'line-through' : 'none' 
      }}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My TODO List</Text>

      <FlatList
        data={tasks}
        renderItem={renderItem}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // plain white background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000', // black text
  },
  list: {
    marginBottom: 20,
  },
  taskRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e91e63', // pink button
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});