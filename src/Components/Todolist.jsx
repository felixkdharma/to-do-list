import "../styles/todolist.css";
import CardToDo from "./CardToDo";
import CardActualTodo from "./CardActualTodo";
import CompleteTodo from "./CompleteTodo";
import { useState, useEffect } from "react";

function Todolist() {
  const [todos, setTodos] = useState([]);
  const [actualTodos, setActualTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //Refresh Todos
  const refreshTodos = async () => {
    try {
      const url = "http://localhost:5000/api/todos";
      const res = await fetch(url);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  //Refresh Actual Todos
  const refreshActualTodos = async () => {
    try {
      const url = "http://localhost:5000/api/actualtodos";
      const res = await fetch(url);
      const data = await res.json();
      console.log("Actual Todos : ", data);
      // setActualTodos(data);
      setActualTodos([...data]);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  // Refresh Complete Todos
  const refreshCompleteTodos = async () => {
    try {
      const url = "http://localhost:5000/api/completetodos";
      const res = await fetch(url);
      const data = await res.json();

      setCompleteTodos([...data]);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  useEffect(() => {
    refreshTodos();
    refreshActualTodos();
    refreshCompleteTodos();
  }, []);

  return (
    <section className="to-do-list-container">
      <h1> My To Do List </h1>
      <div className="card-wrapper">
        <CardToDo
          title="List to Do"
          completed="false"
          todos={todos}
          refreshTodos={refreshTodos}
          refreshActualTodos={refreshActualTodos}
        />
        <CardActualTodo
          title="Actual to Do"
          refreshActualTodos={refreshActualTodos}
          refreshCompleteTodos={refreshCompleteTodos}
          actualTodos={actualTodos}
        />
        <CompleteTodo
          title="Complete"
          refreshCompleteTodos={refreshCompleteTodos}
          completeTodos={completeTodos}
        />
      </div>
    </section>
  );
}

export default Todolist;
