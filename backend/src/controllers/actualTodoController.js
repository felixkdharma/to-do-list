import ActualTodo from "../../models/actualtodo.js";
import Todo from "../../models/todo.js";

export const getActualTodos = async (req, res) => {
  try {
    let actualtodos;

    actualtodos = await ActualTodo.findAll({
      order: [["id", "ASC"]],
    });
    res.json(actualtodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addActualTodos = async (req, res) => {
  try {
    const { title, completed } = req.body;

    console.log("Req Body: ", req.body);
    const newActualTodo = await ActualTodo.create({
      title: title,
      completed: completed,
    });

    console.log(newActualTodo);
    res.status(201).json(newActualTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editActualTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const actualTodo = await ActualTodo.findByPk(id);

    if (!actualTodo)
      return res.status(404).json({ error: "Actual Todo not Found! " });

    await actualTodo.update({ title: title });

    res.status(200).json(actualTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const dataleteActualTodos = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ActualTodo.destroy({
      where: { id: id },
    });

    if (!deleted) {
      res.status(404).json({ message: "ID not Found! " });
    }

    res.status(200).json({ message: "Actual Todo deleted successfully " });
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

export const setCompleteTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const completetodo = await ActualTodo.findByPk(id);

    if (!completetodo)
      return res.status(404).json({ error: "Todo not Found! " });

    // update langsung instance
    completetodo.completed = true;
    await completetodo.save();

    res.status(201).json(completetodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
