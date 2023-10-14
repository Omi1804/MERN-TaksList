const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const pathDir = path.join(__dirname, "../database/storage.json");

//get All the todos
app.get("/todos", (req, res) => {
  fs.readFile(pathDir, "utf8", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

//get Single todos
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id); //fetches id from the url itself
  fs.readFile(pathDir, "utf8", (err, data) => {
    if (err) throw err;

    let todoList = JSON.parse(data);
    let todo = todoList.find((item) => item.id === id);

    if (todo) {
      res.status(200).send(todo);
    } else {
      res.status(404).send("Todo Not Found");
    }
  });
});

//create todo from the body
app.post("/todos", (req, res) => {
  let newTodo = req.body;

  fs.readFile(pathDir, "utf-8", (err, data) => {
    if (err) throw err;

    const todoList = JSON.parse(data);
    newTodo.id = Math.floor(Math.random() * 1000);
    todoList.push(newTodo);

    fs.writeFile(pathDir, JSON.stringify(todoList), (err) => {
      if (err) throw err;
      res.status(200).send(todoList);
    });
  });
});

//update the existing Todo
app.put("/todos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let upTodo = req.body;
  fs.readFile(pathDir, "utf-8", (err, data) => {
    if (err) throw err;
    let todoList = JSON.parse(data);

    let todoUpdate = todoList.find((todo) => todo.id === id);
    if (todoUpdate) {
      todoUpdate.title = upTodo.title;
      todoUpdate.description = upTodo.description;
      res.status(200).send(todoList);
    } else {
      res.status(404).send("Todo Not Found");
    }
  });
});

//delete the exisiting todo List
app.delete("/todos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  fs.readFile(pathDir, "utf-8", (err, data) => {
    if (err) return err;
    let todoList = JSON.parse(data);

    let deleteTodo = todoList.filter((todo) => todo.id != id);
    fs.writeFile(pathDir, JSON.stringify(deleteTodo), (err) => {
      if (err) return err;

      res.status(200).send(deleteTodo);
    });
  });
});

//any other garbage routes
app.get((req, res) => {
  res.status(404).send("No Routes Found!");
});

app.listen(PORT, () => {
  console.log("listening on Port : " + PORT);
});
