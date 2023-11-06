import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
 import Header from './src/components/Header/Header';
 import Navigation from './src/Navigation';
 import Footer from './src/components/Footer/Footer';




function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.root}>
      
      <Header/>
      <Navigation/>
      <Footer/>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor: '#232E3F',
    paddingHorizontal:5,
  }
 
});

export default App;
