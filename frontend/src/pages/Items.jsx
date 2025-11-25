import { useEffect, useState } from "react";
import { getProfile, useItem } from "../services/api";

export default function Items({ token }) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    if (!token) return;

    const loadInventory = async () => {
      try {
        const profile = await getProfile(token);
        setInventory(profile.inventory || []);
      } catch (err) {
        console.error("Erreur fetch inventory :", err);
      }
    };

    loadInventory();
  }, [token]);

  // Fonction pour utiliser un objet
  const handleUse = async (itemId) => {
    try {
      const result = await useItem(token, itemId);
      alert(result.message);

      // Mettre à jour l’inventaire local
      setInventory(result.inventory || []);
    } catch (err) {
      console.error("Erreur useItem :", err);
    }
  };

  return (
    <div>
      <h1>Inventaire du joueur</h1>
      {inventory.length === 0 && <p>Aucun objet pour l'instant.</p>}

      {inventory.map((item) => (
        <div key={item._id} style={card}>
          <h3>{item.name}</h3>
          <p>Type : {item.type}</p>
          <p>{item.description}</p>
          <button onClick={() => handleUse(item._id)}>Utiliser</button>
        </div>
      ))}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "0.7rem",
  marginBottom: "0.7rem",
  borderRadius: "6px",
};
