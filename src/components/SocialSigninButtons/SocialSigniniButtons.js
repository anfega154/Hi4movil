import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton/CustomButton';

export default function SocialSigniniButtons() {
    const onSignInFacebook = () => {
        console.warn('Facebook')
    }
    const onSignInGoogle = () => {
        console.warn('Google')
    }
  return (
    <>
     <CustomButton text="Sign in with Facebook "
       onPress={onSignInFacebook}
       bgColor="#E7EAF4"
       fgColor="#4765A9"
       />
      <CustomButton text="Sign in with Google"
       onPress={onSignInGoogle}
       bgColor="#FAE9EA"
       fgColor="#DD4D44"
       />
    </>
  )
}

const styles = StyleSheet.create({})