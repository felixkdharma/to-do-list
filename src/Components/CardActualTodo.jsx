import "../styles/cardtodo.css";
import { useEffect, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { TextField } from "@mui/material";

function CardActualTodo(props) {

    const [newActualTodo, setNewActualTodo] = useState("");
    const [showInput, setShowInput] = useState(false);

    const addActualTodo = async () => {

        try {

            const newItem = { title: newActualTodo, completed: false };

            await fetch("http://localhost:5000/api/actualtodos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });

            setNewActualTodo("");
            await props.refreshActualTodos();

        } catch (err) {
            console.log("Error : ", err);
        }
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

                    <ul>
                        {props.actualTodos && props.actualTodos.length > 0 ? (
                            props.actualTodos.map((actualTodo) => (
                                <li key={actualTodo.id} className="layout-li">
                                    <img id={actualTodo.id}
                                        style={{
                                            height: "32px",
                                            width: "32px",
                                        }}
                                        src="/checkbox.png"
                                        alt="checkbox" />

                                    {showInput && (
                                        <TextField>
                                            
                                        </TextField>
                                    )} 
                                    <span className="li-text"> {actualTodo.title} </span>

                                    <img
                                        id={actualTodo.id}
                                        style={{ height: 32, width: 32, cursor: "pointer" }}
                                        src="/edit.png"
                                        alt="edit icon"
                                    />
                                    <img
                                        id={actualTodo.id}
                                        style={{ height: 32, width: 32, cursor: "pointer" }}
                                        src="/delete.png"
                                        alt="edit icon"
                                    />
                                </li>
                            ))

                        ) : (
                            <div>
                                <span> There is no Actual Todo </span>
                            </div>
                        )}

                    </ul>
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
                    onClick={() =>setShowInput(!showInput)}
                // onClick={() => setShowInput(!showInput)}
                />

            </div>

        </div >
    )
}

export default CardActualTodo;