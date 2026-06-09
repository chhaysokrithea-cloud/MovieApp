import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function AutoCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // This is the main part we are learning
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCount((prevCount) => {
        const next = (prevCount + 1) % 11; // second from 0 to 9
        return next;
      });
    }, 1000); // Change every 1 second

    return () => clearInterval(interval);
  }, [isRunning]); // Run again when isRunning changes

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Current Number: {count}</Text>
      
      <Text style={styles.smallText}>
        This number changes automatically every 1 second
      </Text>

      <View style={{ marginTop: 30 }}>
        <Button
          title={isRunning ? "Pause" : "Start"}
          onPress={() => setIsRunning(!isRunning)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"white"
  },
  smallText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});