import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addTodo, deleteTodo, toggleTodo } from '../../slice/todoSlice';

const Home = () => {
  const { logout, user } = useAuth();
  const dispatch = useDispatch();
  const {
    items: todos,
    loading,
    error,
  } = useSelector((state: any) => state?.todos);
  const [inputText, setInputText] = useState('');

  const handleAddTodo = () => {
    const trimmedText = inputText.trim()
    if(trimmedText) {
      dispatch(addTodo(trimmedText));
      setInputText('')
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const completeTodo = (id) => {
    dispatch(toggleTodo(id))
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center flex-row">
        <ActivityIndicator size={'small'} />
        <Text className="ml-2"> Fetching Todos ...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 p-4">
      <Text>Add a todo task</Text>
      <View className="flex-row gap-2">
        <TextInput
          className="mt-2 border-2 p-4 flex-1"
          onChangeText={setInputText}
          value={inputText}
          placeholder="Enter a Task"
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
        />
        <TouchableOpacity className='items-center justify-center bg-blue-500 px-8 mt-2 rounded-md' activeOpacity={0.7} onPress={handleAddTodo}>
          <Text className='text-white'>ADD</Text>
        </TouchableOpacity>
      </View>
      <Text className='mt-2'>TODOS</Text>
      {todos.length > 0 && <FlatList
        data={todos}
        renderItem={({item}: {item: any}) => {
          console.log("Item", item)
          return (
          <View className='flex-row gap-5'>
            <Text className={`${item.completed ? 'line-through' : 'no-underline'}`}>{item.text}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}><Text>DELETE</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => completeTodo(item.id)}><Text>{item.completed ? 'UNCHECK' : 'COMPLETE'}</Text></TouchableOpacity>
          </View>)
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className='mt-2'
      />}
      {todos.length === 0 && (
        <View className='flex-1 items-center justify-center '>
          <Text>No todos yet!. Add one above!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
