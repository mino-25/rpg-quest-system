import { useState } from "react";
import { login } from "../services/api";
import { Link } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data.token) setToken(data.token);
    else alert(data.message || "Erreur de connexion");
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas encore de compte : <Link to="/register">Inscription</Link></p>
    </div>
    
    
  );
}
