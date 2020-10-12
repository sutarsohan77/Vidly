
const express = require("express");
const router = express.Router();

const genres = [
    { id: 1, name: "horror" },
    { id: 2, name: "action" },
    { id: 3, name: "thriller" },
  ];
  



  
  router.get("/", (req, res) => {
    res.send(genres);
  });
  
  router.get("/:id", (req, res) => {
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
  
  router.post("/", (req, res) => {
    const genre = {
      id: genres.length + 1,
      
      name: req.body.name,
    };
    genres.push(genre);
    res.send(`Genre added ${genre}`);
  });
  
  router.delete("/:id", (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre Not Found");
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
  });
  
  router.put("/:id", (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre Not Found");
  
    genre.name = req.body.name;
    res.send(genre);
  });
  

  module.exports = router;