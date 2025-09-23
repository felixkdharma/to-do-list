import CompleteTodo from "../../models/completetodo.js";
import ActualTodo from "../../models/actualtodo.js";

export const getCompleteTodos = async (req, res) => {
  try {
    let completetodos;
    completetodos = await ActualTodo.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).json(completetodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
