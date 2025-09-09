import "../styles/cardtodo.css";
import { useEffect, useState } from "react";

function CardToDo(props) {
  const [todos, setTodos] = useState([]);
  const isDone = JSON.parse(props.completed);
  const isActual = false;

  // Add to Actual Todo
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

  //sudah saya ganti dengan express.json dan urlencoded req body masih undefined
  if (props.title == "List to Do") {
    useEffect(() => {
      fetch("http://localhost:5000/api/todos?completed=" + isDone)
        .then((res) => res.json())
        .then((data) => setTodos(data))
        .catch((err) => console.error(err));
    }, []);
  } else if (props.title == "Actual to Do") {
    useEffect(() => {
      fetch("http://localhost:5000/api/actualtodos?completed=" + isDone)
        .then((res) => res.json())
        .then((data) => setTodos(data))
        .catch((err) => console.error(err));
    }, []);
  }
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
          />
        )}
      </div>
    </div>
  );
}

export default CardToDo;
