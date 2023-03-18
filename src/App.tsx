import React, { useEffect, useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Todo List</h1>
        <TodoForm />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
