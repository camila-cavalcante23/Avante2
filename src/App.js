import { useState } from "react";
import axios from "axios";
import './App.css'; // <-- Importa o CSS separado

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setProfile(null);

    if (!username.trim()) {
      setError("Por favor, digite um nome de usuário.");
      setLoading(false);
      return;
    }

    try {
      // Substitua "YOUR_TOKEN_AQUI" pelo seu token do GitHub
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer YOUR_TOKEN_AQUI`, // Aqui entra o seu token
        },
      });
      setProfile(response.data);
    } catch (err) {
      setError("Perfil não encontrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscar Perfil no GitHub</h1>

      <div className="search-box">
        <input
          className="input"
          type="text"
          placeholder="Digite o nome do usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="button" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {loading && <p className="loading">Carregando...</p>}
      {error && <p className="error">{error}</p>}

      {profile && (
        <div>
          <img className="avatar" src={profile.avatar_url} alt="Avatar" />
          <h2 className="name">{profile.name || "Sem nome"}</h2>
          <p className="bio">{profile.bio || "Sem bio disponível."}</p>
        </div>
      )}
    </div>
  );
}

export default App;
