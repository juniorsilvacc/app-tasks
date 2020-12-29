import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function TaskList({data}){
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Ionicons name="md-checkmark-circle" size={30} color='#8257e6' />
            </TouchableOpacity>

            <View>
                <Text style={styles.task}>{data.task}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 9,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e1e1e6',
        borderRadius: 5,
        padding: 7,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3,
          }
    },
    task:{
        fontSize: 17,
        color: '#121212',
        paddingLeft: 8,
        paddingRight: 20,
    }
});

