import AsyncStorage from "@react-native-async-storage/async-storage";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const TODOS_KEY = "@todos";

export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
    try {
        const todoJson = await AsyncStorage.getItem(TODOS_KEY);
        return todoJson ? JSON.parse(todoJson) : [];
    } catch(error) {
        console.error('Error loading data', error)
        return [];
    }
});

export const saveTodos = createAsyncThunk('todos/saveTodos', async (todos) => {
    try {
        await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos))
    } catch(error) {
        console.log("Error savaing todo", error)
        throw error;
    }
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now().toString(),
                text: action.payload,
                completed: false,
                createdAt: new Date().toISOString()
            }
            state.items.push(newTodo)
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find(todo => todo.id === action.payload)
            if(todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loadTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(loadTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        }).addCase(loadTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }).addCase(saveTodos.rejected, (state, action) => {
            state.error = action.error.message
        });
    },
});

export const {
    addTodo, toggleTodo, deleteTodo 
} = todoSlice.actions

export default todoSlice.reducer;