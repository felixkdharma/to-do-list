import Todo from "../../models/todo.js";

// const Todo = db.Todo;

export const getTodos = async (req, res) => {
  try {
    let todos;
    const { completed } = req.query;

    if (completed === "true") {
      todos = await Todo.findAll({ where: { completed: true } });
    } else if (completed === "false") {
      todos = await Todo.findAll({ where: { completed: false } });
    } else {
      todos = await Todo.findAll();
    }
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTodos = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const newTodo = await Todo.create({
      title,
      completed: completed
    });

    console.log(newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const deleteTodos = async (req, res) => {

  try{

    const {id} = req.params;

    const deleted = await Todo.destroy({
      where: {id: id}
    })

    if(!deleted){
      res.status(404).json({messagge: "ID not found "});
    }
    res.status(200).json({message: "Todo deleted successfully "});
  } catch (err) {
    res.status(500).json({error: err.message})
  }
};

//Ini injek data
// let todos = [{ id: 1, task: "Belajar React", completed: false }];

// export const getTodos = (req, res) => res.json(todos);

// export const addTodo = (req, res) => {
//   const newTodo = { id: Date.now(), ...req.body };
//   todos.push(newTodo);
//   res.json(newTodo);
// };
