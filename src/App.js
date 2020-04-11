import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(responde => {
      setRepositories(responde.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Título do Projeto ${Date.now()}`,
      url: 'https://github.com/alanlgoncalves',
      techs: ["Node", "ReactJS"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204){
      setRepositories(repositories.filter(repository => repository.id !== id));
    }else{
      console.error(`Error on delete repository ${id}`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
