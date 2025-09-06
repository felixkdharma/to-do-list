import "../styles/cardtodo.css";

function CardToDo(props) {
  return (
    <div className="card-to-do-container">
      <h2> {props.title} </h2>
      <div className="card">
        <p> test </p>
      </div>
    </div>
  );
}

export default CardToDo;
