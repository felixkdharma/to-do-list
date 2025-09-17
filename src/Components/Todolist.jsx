import "../styles/todolist.css";
import CardToDo from "./CardToDo";
import CardActualTodo from "./CardActualTodo";

function Todolist() {
  return (
    <section className="to-do-list-container">
      <h1> My To Do List </h1>
      <div className="card-wrapper">
        <CardToDo title="List to Do" completed="false" />
        <CardActualTodo title="Actual to Do" />
        {/* <CardToDo title="Actual to Do" completed="false" /> */}
        <CardToDo title="Complete" completed="true" />
      </div>
    </section>
  );
}

export default Todolist;
