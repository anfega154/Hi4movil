import { StyleSheet, Text, View,Button,Pressable } from 'react-native'
import React from 'react'

export default function CustomButton({onPress,text,type="PRIMARY", bgColor ,fgColor,}) {
  return (
    <Pressable onPress={onPress}
     style={[styles.container,
      styles[`container_${type}`],
       bgColor? {backgroundColor:bgColor} :{}
      ]}>
      <Text style={[styles.text,
         styles[`text_${type}`],
         fgColor? {color:fgColor} :{}
         ]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:15,
        marginVertical:5,
        alignItems: 'center',
        borderRadius:5,
        marginTop: 20
    },
    container_PRIMARY:{
        backgroundColor :'#3B71F3',
    },
    container_SECONDARY:{
        borderColor:'#3b71f3',
        borderWidth:2,

    },
    container_TERTIARY:{

    },
    container_LINK:{
        backgroundColor :'#F18628',
    },
    text:{
        fontWeight:'bold',
        color:'#FFFFFF',
    },
    text_SECONDARY:{
        color:'#3b71f3',
    },
    text_TERTIARY:{
        color:'gray',
    },
    text_LINK:{
        fontWeight:'bold',
        color:'#FFFFFF',
    },
})