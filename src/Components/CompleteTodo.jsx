import "../styles/cardtodo.css";
import "../styles/global.css";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { TextField } from "@mui/material";

function CompleteTodo(props) {
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
            {props.completeTodos.length > 0 ? (
              props.completeTodos.map((completetodo) => (
                <li key={completetodo.id} className="layout-li">
                  <img
                    id={completetodo.id}
                    style={{
                      height: "32px",
                      width: "32px",
                    }}
                    src="/check-mark.png"
                    alt="check mark"
                  />

                  <span className="li-text"> {completetodo.title} </span>
                </li>
              ))
            ) : (
              <p> No Complete Todo </p>
            )}
          </ul>
        </Scrollbars>
      </div>
    </div>
  );
}

export default CompleteTodo;
