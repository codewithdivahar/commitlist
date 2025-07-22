import { Text, View, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const Login = ({ navigation }) => {
  const { login } = useAuth();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Login</Text>
      <Button title="Login" onPress={() => login('divahar', 'divahar123')} />
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default Login;
