import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  fetchTodosAsync,
  updateTodoAsync,
  deleteTodoAsync,
} from "../store/todoSlice";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch<any>(fetchTodosAsync());
  }, [dispatch]);

  const handleToggleTodo = (todo: ITodo) => {
    dispatch<any>(updateTodoAsync(todo));
  };

  const handleDeleteTodo = (todo: ITodo) => {
    dispatch<any>(deleteTodoAsync(todo));
  };

  return (
    <ul>
      {todos.todos.map((todo: ITodo) => (
        <li key={todo._id}>
          <label>
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => handleToggleTodo(todo)}
            />
            {todo.title}
          </label>
          <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
