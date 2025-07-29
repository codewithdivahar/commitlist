import { Text, View, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const Login = ({ navigation }) => {
  const { login, loginError } = useAuth();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Login</Text>
      <Button title="Login" onPress={() => login('divahar@gmail.com', 'divahar123')} />
     {loginError && <Text className='text-red-600 mt-2'>{loginError}</Text>}
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default Login;
