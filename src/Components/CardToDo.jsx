import "../styles/cardtodo.css";
import { useEffect, useState } from "react";

function CardToDo(props) {
  const [todos, setTodos] = useState([]);
  const isDone = JSON.parse(props.completed);
  const isActual = false;

  useEffect(() => {
    fetch("http://localhost:5000/api/todos?completed=" + isDone)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="card-to-do-container">
      <h2> {props.title} </h2>
      <div className="card">
        <ul style={{ marginTop: "5vh" }}>
          {todos.map((todo) => (
            <li key={todo.id} className="font-li">
              {!isDone ? (
                <img
                  style={{
                    height: "32px",
                    width: "32px",
                  }}
                  src="/checkbox.png"
                  alt="checkbox"
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
