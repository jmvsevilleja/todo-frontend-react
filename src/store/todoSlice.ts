import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/todo";

interface TodoState {
  todos: ITodo[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch Todos from API
export const fetchTodosAsync = createAsyncThunk("todo/fetchTodo", async () => {
  const response = await fetchTodos();
  return response.data;
});

// Async thunk to create a new Todo
export const createTodoAsync = createAsyncThunk(
  "todo/createTodo",
  async (todo: Omit<ITodo, "_id">) => {
    const response = await addTodo(todo);
    return response.data;
  }
);

// Async thunk to update an existing Todo
export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async (todo: ITodo) => {
    const response = await updateTodo(todo);
    return response.data;
  }
);

// Async thunk to delete an existing Todo
export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (todo: ITodo) => {
    const response = await deleteTodo(todo._id || "");
    return response.data;
  }
);

// Define a slice of the store for Todos
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos reducers
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTodosAsync.fulfilled,
        (state, action: PayloadAction<ApiDataType>) => {
          state.status = "idle";
          state.todos = action.payload.todos;
        }
      )
      // .addCase(
      //   fetchTodosAsync.rejected,
      //   (state, action: PayloadAction<ApiDataType>) => {
      //     state.status = "failed";
      //     state.error = action.payload;
      //   }
      // )
      // Create Todo reducers
      .addCase(
        createTodoAsync.fulfilled,
        (state, action: PayloadAction<ApiDataType>) => {
          if (action.payload.todo) state.todos.push(action.payload.todo);
        }
      )
      // Update Todo reducers
      .addCase(
        updateTodoAsync.fulfilled,
        (state, action: PayloadAction<ApiDataType>) => {
          const index = state.todos.findIndex(
            (todo) => todo._id === action.payload.todo?._id
          );
          if (action.payload.todo) state.todos[index] = action.payload.todo;
        }
      )
      // // Delete Todo reducers
      .addCase(
        deleteTodoAsync.fulfilled,
        (state, action: PayloadAction<ApiDataType>) => {
          state.todos = state.todos.filter(
            (todo) => todo._id !== action.payload.todo?._id
          );
        }
      );
  },
});

// Export the slice reducer
export default todoSlice.reducer;
