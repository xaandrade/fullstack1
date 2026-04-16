//cambio 
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbFile = './tasks.json';


if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify([]));
}


app.get('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(dbFile));
  res.json(tasks);
});


app.post('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(dbFile));
  const newTask = { id: Date.now(), title: req.body.title };
  tasks.push(newTask);
  fs.writeFileSync(dbFile, JSON.stringify(tasks));
  res.json(newTask);
});


app.delete('/tasks/:id', (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(dbFile));
  tasks = tasks.filter(t => t.id != req.params.id);
  fs.writeFileSync(dbFile, JSON.stringify(tasks));
  res.json({ message: 'Tarea eliminada' });
});

app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
