import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function CostumInput({value,setValue,placeholder,secureTextEntry,disabled}) {
  return (
    <View style={styles.container}>
      <TextInput 
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
       style={styles.input} 
       editable={!disabled}/>
    </View>
  )
}

const styles = StyleSheet.create({

    input: {},
    container: {
        backgroundColor:'white',
        width:'100%',
        borderColor: '#e8e8e8',
        borderWidth:1,
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:10,
        marginTop:10,
        }
})