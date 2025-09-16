import "../styles/cardtodo.css";
import { useEffect, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';

function CardToDo(props) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const isDone = JSON.parse(props.completed);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [originalText, setOriginalText] = useState("");

  /* Add todo list */
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const newItem = { title: newTodo, completed: false };

    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    await res.json();

    try {
      // Refresh data untuk mengambil data yang terbaru (Todo list only)
      const refreshData = await fetch("http://localhost:5000/api/todos?completed=false");
      const data = await refreshData.json();
      setTodos(data);
    } catch (err) {
      console.error("JSON parse error:", err);
    }

    // const data = await refreshData.json();
    // setTodos(data);

    setTodo("");
    setShowInput(false);

  }

  /* Add to Actual Todo from Todo list */
  const addToActual = async (e) => {
    const id = e.target.id;

    await fetch("http://localhost:5000/api/actualtodos/create-from-todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId: id }),
    })
      .then((res) => res.json())
      .then(() => alert(`Todo ${id} berhasil ditambahkan ✅`))
      .catch((err) => console.error(err));
  };

  /* Delete Todo */
  const deleteTodo = async (id) => {

    console.log(id);
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });

    await refreshTodos();
    // setTodos((prev) => prev.filter((todo) => todo.id !== id));

  }

  /* Edit Todo */
  const saveEdit = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editText })
    });

    await refreshTodos();
    setEditingId(null);
    // setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, title: editText } : todo));
  }

  /* Function Refresh Data */
  const refreshTodos = async () => {
    try {
      const url =
        props.title === "List to Do"
          ? "http://localhost:5000/api/todos?completed=" + isDone
          : "http://localhost:5000/api/actualtodos?completed=" + isDone;

      const res = await fetch(url);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Fetch Error :", err);
    }
  }
  /* Get Data */
  useEffect(() => {
    refreshTodos();
  }, [props.title, isDone]);

  /* Cancel Edit */
  const cancelEdit = () => {
    setEditText(originalText);
    setEditingId(null);
  }

  return (
    <div className="card-to-do-container">
      <h2> {props.title} </h2>
      <div className="card">
        <Scrollbars
          style={{ right: 7, top: 15, height: "90%" }}
          autoHide
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: "#888",
                borderRadius: "6px",
                height: "100px", // <-- fix size disini
              }}
            />
          )}
        >
          <ul >
            {todos.map((todo) => (
              <li key={todo.id} className="layout-li">
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

                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    autoFocus
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => cancelEdit()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEdit(todo.id);
                        setEditingId(null);
                      } else if (e.key === "Esacape") cancelEdit();
                    }}
                  >

                  </input>
                ) : (
                  <span className="li-text"> {todo.title} </span>
                )}

                <img
                  id={todo.id}
                  style={{ height: 32, width: 32, cursor: "pointer" }}
                  src="/edit.png"
                  alt="edit icon"
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.title);
                    setOriginalText(todo.title);
                  }}
                />
                <img
                  id={todo.id}
                  style={{ height: 32, width: 32, cursor: "pointer" }}
                  src="/delete.png"
                  alt="edit icon"
                  onClick={() => deleteTodo(todo.id)}
                />
              </li>
            ))}
          </ul>
        </Scrollbars>

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
