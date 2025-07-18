import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [livros, setLivros] = useState([]);
  const [form, setForm] = useState({ titulo: '', autor: '', ano: '' });

  // GET - buscar todos os livros
  useEffect(() => {
    axios.get('http://localhost:8080/api/livros')
      .then(response => setLivros(response.data))
      .catch(error => console.error('Erro ao buscar livros:', error));
  }, []);

  // POST - criar novo livro
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/livros', form)
      .then(response => {
        setLivros([...livros, response.data]);
        setForm({ titulo: '', autor: '', ano: '' });
      })
      .catch(error => console.error('Erro ao adicionar livro:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Livros</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={form.autor}
          onChange={(e) => setForm({ ...form, autor: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Ano"
          value={form.ano}
          onChange={(e) => setForm({ ...form, ano: e.target.value })}
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <h2>Lista de Livros</h2>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            <strong>{livro.titulo}</strong> - {livro.autor} ({livro.ano})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

