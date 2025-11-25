import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/profile">Profil</Link>
      <Link to="/items">Items</Link>
      <Link to="/quests">Quêtes</Link>
      <button onClick={onLogout}>Déconnexion</button>
    </nav>
  );
}
