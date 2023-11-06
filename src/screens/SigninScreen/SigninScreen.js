import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../Resources/Images/logo2.png'
import CostumInput from '../../components/CustomInput/CostumInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../components/Lib/SupabasseClient';

export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width, height } = useWindowDimensions()
  const navigation = useNavigation();

  const onSignInPressed = async () => {

    if (email == '' || password == '') {
      Alert.alert("Todos los campos username y password son obligatorios")
      return;
    }
    try {
      const { data: existingPass, error: existingPassError } = await supabase
        .from('users')
        .select('password')
        .eq('password', password);

      const { data: existingEmail, error: existingEmailError } = await supabase
        .from('users')
        .select('email,id,user_name,avatar_url,name,email')
        .eq('email', email);

      if ((existingPass && existingPass.length < 1) || (existingEmail && existingEmail.length < 1)) {
        Alert.alert('Correo o usuario incorrecto');
      } else {
        Alert.alert('Bienvenido');
        navigation.navigate('Home', { userData: existingEmail[0] });
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      Alert.alert('Error al interactuar con Supabase: ' + error.message);
    }
  }

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        <CostumInput placeholder="Username" value={email} setValue={setEmail} />
        <CostumInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
        <CustomButton text="Sign in" onPress={onSignInPressed} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '70%',
    maxWidth: 200,
    marginTop: 220,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#232E3F',
    flex: 1,
    flexDirection: 'column',

  }
})