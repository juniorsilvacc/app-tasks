import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  TouchableOpacity, 
  FlatList
 } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import TeskList from './src/components/TeskList';

export default function App() {

  const [task, setTask] = useState([
    {key: 1, task: 'Ir para o Jiu-jitsu'},
    {key: 2, task: 'Assistir Flash'},
    {key: 3, task: 'Estudar React Native'},
    {key: 4, task: 'Ir ao mercado'},
    {key: 5, task: 'Limpar o quarto'},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor= '#121214' barStyle='light-content' />

     <View style={styles.content}>
      <Text style={styles.title}>Minhas Tarefas</Text>
     </View>

     <FlatList 
     showsHorizontalScrollIndicator={false}
     data={task}
     keyExtractor={(item) => String(item.key)}
     renderItem={({item}) => <TeskList data={item} /> }
     />

     <TouchableOpacity style={styles.fab}>
      <Ionicons name="ios-add" size={35} color="#FFF" />
     </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
  },
  title:{
    fontSize: 25,
    alignSelf: 'center',
    paddingBottom: 10,
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },
  fab:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#8257e6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    bottom: 25,
    right: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
  }
});
