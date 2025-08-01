/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import { AuthProvider, useAuth } from './src/context/AuthProvider';
import BootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return null;

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}
    >
      {user ? (
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Provider>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
