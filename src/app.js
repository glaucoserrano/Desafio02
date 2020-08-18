const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title,url,techs} = request.body;
  const newRepositories = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(newRepositories);
  return response.json(newRepositories);

});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title,url,techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositore => repositore.id === id);
  
  if(repositorieIndex < 0){
    response.status(400).json({error: "Repositorie not found!"});
  }
  const repository = repositories.find(repository => repository.id === id);
  
  const repositorie = {
    id: repository.id,
    title,
    url,
    techs,
    likes: repository.likes
  }
  repositories[repositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositorieIndex = repositories.findIndex(repositore => repositore.id === id);
  
  if(repositorieIndex < 0){
    response.status(400).json({error: "Repositorie not found!"});
  }
  repositories.splice(repositorieIndex,1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositorieIndex = repositories.findIndex(repository => repository.id === id);
  
  
  if(repositorieIndex < 0){
    response.status(400).json({error: "Repositorie not found!"});
  }
  const repository = repositories.find(repository => repository.id === id);
  repository.likes +=1;
  return response.json({ likes: repository.likes});
});

module.exports = app;
