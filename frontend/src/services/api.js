const API_BASE = "http://localhost:3000/api";

// Auth
export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const register = async (name, email, password) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
};

// Player
export const getProfile = async (token) => {
  const res = await fetch(`${API_BASE}/player/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const acceptQuest = async (token, questId) => {
  const res = await fetch(`${API_BASE}/player/accept-quest/${questId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const useItem = async (token, itemId) => {
  const res = await fetch(`${API_BASE}/player/use-item/${itemId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

// Items et Quests n'ont PAS le préfixe /api
export const getItems = async (token) => {
  const res = await fetch(`http://localhost:3000/items`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const getQuests = async (token) => {
  const res = await fetch("http://localhost:3000/quests", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const finishQuest = async (token, questId) => {
  const res = await fetch(`${API_BASE}/player/finish-quest/${questId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};


