const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "horror" },
  { id: 2, name: "action" },
  { id: 3, name: "thriller" },
];

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find((g) => {
    return g.id === id;
  });
  if (!genre) {
    res.status(404).send("Not Found");
    return;
  }
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(`Genre added ${genre}`);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");

  genre.name = req.body.name;
  res.send(genre);
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server Started ${port}`);
});
