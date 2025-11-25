import { useState } from "react";
import { register } from "../services/api";
import { Link } from "react-router-dom";

export default function Register({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register(name, email, password);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } else {
      alert(data.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">S'inscrire</button>
      </form>
      <p>Déjà un compte <Link to="/">Connexion</Link></p>
    </div>
    
  );
}
