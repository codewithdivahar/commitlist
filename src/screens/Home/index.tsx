import { Button, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthProvider';

const Home = () => {
    const { logout, user } = useAuth();
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>{user?.email}</Text>
      <Button title="Logout" onPress={() => logout()}/>
    </View>
  )
}

export default Home
