import ActualTodo from "../../models/actualtodo.js";
import CompleteTodo from "../../models/completetodo.js";

export const getCompleteTodos = async (req, res) => {

    try {
        let completetodos;
        completetodos = await CompleteTodo.findAll({
            order: [["id", "ASC"]],
        });

        res.status(200).json(completetodos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const setCompleteTodos = async (req, res) => {

    try {
        const { title } = req.body;
        let newCompleteTodo = await CompleteTodo.create({
            title: title,
            completed: true,
        });

        res.status(201).json(newCompleteTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}