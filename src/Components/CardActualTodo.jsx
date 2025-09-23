import "../styles/cardtodo.css";
import "../styles/global.css";
import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { TextField } from "@mui/material";

function CardActualTodo(props) {
  const [newActualTodo, setNewActualTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editngId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [originalText, setOriginalText] = useState("");

  const handleAddButton = () => {
    setShowInput(!showInput);
  };

  const cancelAdd = () => {
    setNewActualTodo("");
    setShowInput(false);
  };

  const addActualTodo = async () => {
    try {
      const newItem = { title: newActualTodo, completed: false };

      await fetch("http://localhost:5000/api/actualtodos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      await props.refreshActualTodos();
      setNewActualTodo("");
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  const saveActualTodo = async(id) => {

    try {
        console.log("Id Edited : ", id);
        const updatedItem = {title: editText};
        const url = "http://localhost:5000/api/actualtodos/" + id;
        await fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedItem),
        });

        await props.refreshActualTodos();
        setEditText("");
        setEditingId(null);

    } catch (err) {
      console.log("Error : ", err);
    }

  }

const setCompleteTodo = async(id) => {

  try {
    const url = "http://localhost:5000/api/completetodoss/" + id;
    await fetch(url, {
      method: "PUT",
    });

    await props.refreshCompleteTodos
  } catch (err) {
    console.log("Error : ", err);
  }

}
const deleteActualTodo = async(id) => {

    try {
        const url = "http://localhost:5000/api/actualtodos/" + id;
        await fetch(url, {
            method: "DELETE",
        });

        await props.refreshActualTodos();
    } catch (err) {
        console.log("Error : ", err);
    }
}

  const cancelEdit = () => {
    setEditText(originalText);
    setEditingId(null);
  };

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
          <ul>
            {props.actualTodos && props.actualTodos.length > 0 ? (
              props.actualTodos.map((actualTodo) => (
                <li key={`${actualTodo.id}-${actualTodo.title}`} className="layout-li">
                  <img
                    id={actualTodo.id}
                    style={{
                      height: "32px",
                      width: "32px",
                    }}
                    onClick={() => setCompleteTodo(actualTodo.id)}
                    src="/checkbox.png"
                    alt="checkbox"
                  />

                  {editngId === actualTodo.id ? (
                    <TextField
                      label="Title"
                      autoFocus
                      value={editText}
                      type="text"
                      variant="standard"
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          cancelEdit();
                        } else if (e.key === "Enter") {
                          saveActualTodo(actualTodo.id);
                          setEditingId(null)
                        }
                      }}
                    ></TextField>
                  ) : (
                    <span className="li-text"> {actualTodo.title} </span>
                  )}

                  <img
                    id={actualTodo.id}
                    style={{ height: 32, width: 32, cursor: "pointer" }}
                    src="/edit.png"
                    alt="edit icon"
                    onClick={() => {
                      setEditingId(actualTodo.id);
                      setEditText(actualTodo.title);
                      setOriginalText(actualTodo.title);
                    }}
                  />
                  <img
                    id={actualTodo.id}
                    style={{ height: 32, width: 32, cursor: "pointer" }}
                    src="/delete.png"
                    alt="delete icon"
                    onClick={() => {deleteActualTodo(actualTodo.id)}}
                  />
                </li>
              ))
            ) : (
              <div>
                <span> There is no Actual Todo </span>
              </div>
            )}
          </ul>

          {showInput ? (
            <div className="input-new-todo">
              <div className="MuiInputLabel-root">
                <div className="MuiInputBase-input">
                  <TextField
                    label="Title"
                    value={newActualTodo}
                    onChange={(e) => setNewActualTodo(e.target.value)}
                    variant="standard"
                    autoFocus
                    // onBlur={() => cancelAdd()}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        cancelAdd();
                      } else if (e.key === "Enter") {
                        addActualTodo();
                        setShowInput(false);
                      }
                    }}
                  ></TextField>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </Scrollbars>

        <img
          style={{
            cursor: "pointer",
            position: "absolute",
            bottom: "-2.5vh",
            left: "6vw",
          }}
          src="addbutton.png"
          alt="addbutton"
          onClick={handleAddButton}
        />
      </div>
    </div>
  );
}

export default CardActualTodo;