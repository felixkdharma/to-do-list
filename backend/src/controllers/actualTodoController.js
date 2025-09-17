import ActualTodo from "../../models/actualtodo.js";
import Todo from "../../models/todo.js";

export const getActualTodos = async (req, res) => {
  try {
    let actualtodos;

    actualtodos = await ActualTodo.findAll();

    // const { completed } = req.query;

    // if (completed === "true") {
    //   actualtodos = await ActualTodo.findAll({ where: { completed: true } });
    // } else if (completed === "false") {
    //   actualtodos = await ActualTodo.findAll({ where: { completed: false } });
    // }
    res.json(actualtodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createFromTodoList = async (req, res) => {
  try {
    console.log("Req Body: ", req.body);
    const { todoId } = req.body;
    const todo = await Todo.findByPk(todoId);
    if (!todo) return res.status(404).json({ error: "Todo not Found! " });

    const actualTodo = await ActualTodo.create({
      title: todo.title,
      completed: todo.completed,
    });

    res.status(201).json(actualTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
