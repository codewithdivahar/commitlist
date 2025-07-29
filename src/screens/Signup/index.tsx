import { Button, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthProvider';

const Signup = ({navigation}) => {
    const { signup } = useAuth();
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>Signup</Text>
      <Button title="Signup" onPress={() => signup('divahar@gmail.com', 'divahar123')}/>
    <Button
            title="Go to Login"
            onPress={() => navigation.goBack()}
            />
    </View>
  )
}

export default Signup