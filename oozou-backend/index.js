const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

// add todo item
app.post("/todos", async (req, res) => {
    try {

        var dateTime = new Date();
        const newTodoItem = await pool.query(
            "INSERT INTO todo (title,todostatus,created_at) VALUES($1 , $2 , $3) RETURNING *", [req.body.title, req.body.status, dateTime]
        );
        res.json(newTodoItem.rows);
    } catch (err) {
        console.log('error occured')
        console.error(err.messgae)
    }
})

// add subtasks
app.post("/subtasks", async (req, res) => {
    try {
        var dateTime = new Date();
        const newTodoItem = await pool.query(
            "INSERT INTO Subtask (todoid,subtasktitle,subtaskstatus,created_at) VALUES($1 , $2 , $3 , $4) RETURNING *", [req.body.todoid, req.body.title, req.body.status, dateTime]
        );
        res.json(newTodoItem.rows);
    } catch (err) {
        console.log('error occured')
        console.error(err.messgae)
    }
})

// get todo list items
app.get("/GetTodoList", async (req, res) => {
    try {
        const newTodoItem = await pool.query("SELECT TODO.TODOID, TODO.TITLE, TODO.TODOSTATUS, SUBTASK.SUBTASKID, SUBTASK.SUBTASKTITLE, SUBTASK.SUBTASKSTATUS FROM TODO LEFT JOIN SUBTASK ON TODO.TODOID = SUBTASK.TODOID ");
        res.json(newTodoItem.rows);
    } catch (err) {
        console.log('error occured')
        console.error(err.messgae)
    }
})

// middleware 
app.use(cors());

// API will use port 5000 
app.listen(5000, () => { console.log('server started') })