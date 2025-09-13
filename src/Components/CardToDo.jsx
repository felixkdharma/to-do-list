import "../styles/cardtodo.css";
import { useEffect, useState } from "react";

function CardToDo(props) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const isDone = JSON.parse(props.completed);
  const isActual = false;

  // Add todo list
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const newItem = { title: newTodo, completed: false };

    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    await res.json();

    // Refresh data untuk mengambil data yang terbaru
    const refreshData = await fetch("http://localhost:5000/api/todos?completed=false");
    const text = await refreshData.text();
    console.log("Raw response:", text);

    try {
      const data = JSON.parse(text);
      setTodos(data);
    } catch (err) {
      console.error("JSON parse error:", err);
    }

    // const data = await refreshData.json();
    // setTodos(data);

    setTodo("");
    setShowInput(false);

  }
  // Add to Actual Todo from Todo list
  const addToActual = (e) => {
    const id = e.target.id;

    fetch("http://localhost:5000/api/actualtodos/create-from-todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId: id }),
    })
      .then((res) => res.json())
      .then(() => alert(`Todo ${id} berhasil ditambahkan ✅`))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const url =
      props.title === "List to Do"
        ? "http://localhost:5000/api/todos?completed=" + isDone
        : "http://localhost:5000/api/actualtodos?completed=" + isDone;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, [props.title, isDone]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/todos?completed=" + isDone)
  //     .then((res) => res.json())
  //     .then((data) => setTodos(data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <div className="card-to-do-container">
      <h2> {props.title} </h2>
      <div className="card">
        <ul style={{ marginTop: "5vh" }}>
          {todos.map((todo) => (
            <li key={todo.id} className="font-li">
              {!isDone ? (
                <img
                  id={todo.id}
                  style={{
                    height: "32px",
                    width: "32px",
                  }}
                  src="/checkbox.png"
                  alt="checkbox"
                  onClick={addToActual}
                />
              ) : (
                <img
                  style={{
                    height: "36px",
                    width: "36px",
                  }}
                  src="/check-mark.png"
                  alt="checkbox"
                />
              )}
              {todo.title}
            </li>
          ))}
        </ul>

        {showInput && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Enter new todo"
            />
            <button onClick={addTodo}>Save</button>
            <button onClick={() => setShowInput(false)} > Cancel </button>
          </div>
        )}

        {!isDone && (
          <img
            style={{
              cursor: "pointer",
              position: "absolute",
              bottom: "-2.5vh",
              left: "6vw",
            }}
            src="addbutton.png"
            alt="addbutton"
            onClick={() => setShowInput(!showInput)}
          />
        )}
      </div>
    </div>
  );
}

export default CardToDo;
