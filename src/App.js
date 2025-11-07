import React, { useEffect, useState } from "react";
import "./App.css";

const usernames = [
  "rahulilk100",
  "HQ4umhXFKC",
  "1455",
  "Rushi1705",
  "SarthakDengale",
];

const API_BASE = "https://leetcode-stats-api.herokuapp.com/";

function App() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        usernames.map(async (username) => {
          try {
            const res = await fetch(`${API_BASE}${username}`);
            const json = await res.json();
            return { username, ...json };
          } catch {
            return { username, error: "⚠️ Failed to fetch data" };
          }
        })
      );
      setUserData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
          alt="LeetCode Logo"
          className="logo"
        />
        <h1>LeetCode Friends Dashboard</h1>
      </header>

      {loading ? (
        <div className="loader">Loading data...</div>
      ) : (
        <div className="card-grid">
          {userData.map((user) => (
            <div key={user.username} className="card">
              <div className="card-header">
                <h2>{user.username}</h2>
                <p className="rank">🏆 Rank #{user.ranking || "N/A"}</p>
              </div>
              {user.error ? (
                <p className="error">{user.error}</p>
              ) : (
                <>
                  <div className="stats">
                    <div className="stat easy">
                      <span>Easy</span>
                      <strong>{user.easySolved}</strong>
                    </div>
                    <div className="stat medium">
                      <span>Medium</span>
                      <strong>{user.mediumSolved}</strong>
                    </div>
                    <div className="stat hard">
                      <span>Hard</span>
                      <strong>{user.hardSolved}</strong>
                    </div>
                  </div>
                  <div className="details">
                    <p>Total Solved: {user.totalSolved}</p>
                    <p>Acceptance Rate: {user.acceptanceRate}%</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
