import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>Hi4 ꕤ</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    root:{
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
      },
      header:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
      }
})