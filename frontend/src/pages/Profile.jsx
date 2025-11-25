import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

export default function Profile({ token }) {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!token) return;

    const loadProfile = async () => {
      try {
        const data = await getProfile(token);
        setPlayer(data);
      } catch (err) {
        console.error("Erreur fetch profile :", err);
      }
    };

    loadProfile();
  }, [token]);

  if (!player) return <p>Chargement du profil...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Profil du joueur</h1>
      <p><strong>Nom :</strong> {player.name}</p>
      <p><strong>Email :</strong> {player.email}</p>
      <p><strong>Niveau :</strong> {player.level}</p>
      <p><strong>Expérience :</strong> {player.experience}xp / {player.level * 100 }xp</p>
    </div>
  );
}
