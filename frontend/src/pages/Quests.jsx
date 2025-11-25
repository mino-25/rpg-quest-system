import { useEffect, useState } from "react";
import { getQuests, acceptQuest, finishQuest } from "../services/api";

export default function Quests({ token }) {
  const [available, setAvailable] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [finished, setFinished] = useState([]);

  useEffect(() => {
    if (!token) return;

    const loadQuests = async () => {
      const data = await getQuests(token);
      console.log("Données reçues :", data);

      setAvailable(data.available || []);
      setInProgress(data.inProgress || []);
      setFinished(data.finished || []);
    };

    loadQuests();
  }, [token]);

  const handleAccept = async (questId) => {
    const data = await acceptQuest(token, questId);
    alert(data.message);

    // Recharger les listes après acceptation
    const refreshed = await getQuests(token);
    setAvailable(refreshed.available || []);
    setInProgress(refreshed.inProgress || []);
    setFinished(refreshed.finished || []);
  };
  
  const handleFinish = async (questId) => {
    try {
      const result = await finishQuest(token, questId); // finishQuest dans api.js
      alert(result.message);

      // Recharger les listes
      const data = await getQuests(token);
      setAvailable(data.available || []);
      setInProgress(data.inProgress || []);
      setFinished(data.finished || []);
    } catch (err) {
      console.error(err);
    }
  };
  


  return (
    <div>
      <h1>Journal de Quêtes</h1>

      {/* --- QUÊTES DISPONIBLES --- */}
      <h2>Quêtes disponibles</h2>
      {available.length === 0 && <p>Aucune quête disponible.</p>}
      {available.map((q) => (
        <div key={q._id} style={card}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
          <p>Récompenses :</p>
          <p>Items : {q.rewards.items.length}</p>
          <p>+ {q.rewards.experience} xp</p>
          <button onClick={() => handleAccept(q._id)}>Accepter</button>
        </div>
      ))}

      <hr />

      {/* --- QUÊTES EN COURS --- */}
      <h2>Quêtes en cours</h2>
      {inProgress.length === 0 && <p>Aucune quête en cours.</p>}
      {inProgress.map((q) => (
        <div key={q._id} style={{ ...card, background: "#fff3eaff" }}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
          <button onClick={() => handleFinish(q._id)}>Terminer la quête</button>
        </div>
      ))}

      {/* --- QUÊTES TERMINÉES --- */}
      <h2>Quêtes terminées</h2>
      {finished.length === 0 && <p>Aucune quête terminée.</p>}
      {finished.map((q) => (
        <div key={q._id} style={{ ...card, background: "#eaffea" }}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
          <p><em>Quête terminée</em></p>
        </div>
      ))}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "1rem",
  borderRadius: "6px",
  marginBottom: "0.5rem",
};
