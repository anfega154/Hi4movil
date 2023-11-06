import { StyleSheet,Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Text >©︎ Copyright</Text>
      </View>
    )
  }
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