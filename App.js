import React, {useState, useCallback, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  TouchableOpacity, 
  FlatList,
  Modal,
  TextInput,
  AsyncStorage
 } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import TeskList from './src/components/TeskList';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App() {

  const [task, setTask] = useState([]);

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState('');

// Buscando todas as tarefas ao iniciar o APP
  useEffect(() => {
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }
    loadTasks();
  }, [])

  // Salvando caso tenha alguma tarefa alterada
  useEffect(() => {
    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task))
    }

    saveTasks();
  }, [task])


  function handleAdd(){
    if(input === '') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');

  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor= '#121214' barStyle='light-content' />

     <View style={styles.content}>
      <Text style={styles.title}>Minhas Tarefas</Text>
     </View>

     <FlatList 
     marginHorizontal={10}
     showsHorizontalScrollIndicator={false}
     data={task}
     keyExtractor={(item) => String(item.key)}
     renderItem={({item}) => <TeskList data={item} handleDelete={handleDelete} /> }
     />

     <Modal animationType="slide" transparent={false} visible={open}>
      <SafeAreaView style={styles.modal}>

        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setOpen(false)}>
            <Ionicons style={{marginLeft: 5, marginRight: 5}} name="md-arrow-back" size={40} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Nova Tarefa</Text>
        </View>

        <Animatable.View 
        style={styles.modalBody}
        animation="fadeInUp"
        useNativeDriver
        >
          <TextInput  
          placeholder="O que precisa fazer hoje?"
          style={styles.input}
          multiline={true}
          placeholderTextColor="#747474"
          autoCorrect={false}

          value={input}
          onChangeText={(texto) => setInput(texto)}
          />

          <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
            <Text style={styles.handleAddText}>Cadastrar</Text>
          </TouchableOpacity>
        </Animatable.View>

      </SafeAreaView>
     </Modal>

     <AnimatedBtn 
     style={styles.fab}
     animation="bounceInUp"
     duration={1500}
     onPress={() => setOpen(true)}
     useNativeDriver
     >
      <Ionicons name="ios-add" size={35} color="#FFF" />
     </AnimatedBtn>

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
    color: '#e1e1e6',
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
  },
  modal:{
    flex: 1,
    backgroundColor: '#121214',
  },
  modalHeader:{
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle:{
    marginLeft: 15,
    fontSize: 23,
    color: '#e1e1e6',
    fontWeight: 'bold'
  },
  modalBody:{
    marginTop: 15,
  },
  input:{
    fontSize: 15,
    marginLeft: 10,
    marginRight: 15,
    marginTop: 30,
    backgroundColor: '#e1e1e6',
    padding: 7,
    height: 80,
    textAlignVertical: 'top',
    color: '#121212',
    borderRadius: 5,
  },
  handleAdd:{
    backgroundColor: '#8257e6',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    height: 40,
    marginTop: 20,
  },
  handleAddText:{
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF'
  }
});
