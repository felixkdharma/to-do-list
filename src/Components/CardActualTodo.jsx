import "../styles/cardtodo.css";
import { useEffect, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';

function CardActualTodo(props) {

    const [actualTodos, setActualTodos] = useState([]);

    // Function Get Actual Todos
    const refreshDatas = async () => {
        try {
            const url = "http://localhost:5000/api/actualtodos";

            const res = await fetch(url);
            const data = await res.json();

            setActualTodos(data);
        } catch (err) {
            console.log("Refresh Data Error: ", err);
        }
    }

    useEffect(() => {
        refreshDatas();
    }, [props.title])

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
                        {actualTodos && actualTodos.length > 0 ? (
                            actualTodos.map((actualTodo) => (
                                <li key={actualTodo.id} className="layout-li">
                                    <img id={actualTodo.id}
                                        style={{
                                            height: "32px",
                                            width: "32px",
                                        }}
                                        src="/checkbox.png"
                                        alt="checkbox" />

                                    <span className="li-text"> {actualTodo.title} </span>

                                    <img
                                        id={todo.id}
                                        style={{ height: 32, width: 32, cursor: "pointer" }}
                                        src="/edit.png"
                                        alt="edit icon"
                                    />
                                    <img
                                        id={todo.id}
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

            </div>

        </div >
    )
}

export default CardActualTodo;