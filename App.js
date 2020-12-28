import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor= '#121214' barStyle='light-content' />

     <View style={styles.content}>
      <Text style={styles.title}>Minhas Tarefas</Text>
     </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
  },
  title:{
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold'
  }
});
