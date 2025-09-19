import "../styles/todolist.css";
import CardToDo from "./CardToDo";
import CardActualTodo from "./CardActualTodo";
import { useState, useEffect } from "react";

function Todolist() {
  const [todos, setTodos] = useState([]);
  const [actualTodos, setActualTodos] = useState([]);

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
  }

  //Refresh Actual Todos
  const refreshActualTodos = async () => {

    try {

      const url = "http://localhost:5000/api/actualtodos";
      const res = await fetch(url);
      const data = await res.json();
      setActualTodos(data);

    } catch (err) {

      console.log("Error : ", err);

    }

  }

  useEffect(() => {
    refreshTodos();
    refreshActualTodos();
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
          refreshActualTodos={refreshActualTodos} />
        <CardActualTodo
          title="Actual to Do"
          refreshActualTodos={refreshActualTodos}
          actualTodos={actualTodos} />
        {/* <CardToDo title="Actual to Do" completed="false" /> */}
        <CardToDo title="Complete" completed="true" />
      </div>
    </section>
  );
}

export default Todolist;
