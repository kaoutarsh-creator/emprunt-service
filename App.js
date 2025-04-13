import { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [idClient, setIdClient] = useState("");
  const [idLivre, setIdLivre] = useState("");
  const [dateEmprunt, setDateEmprunt] = useState("");
  const [searchClient, setSearchClient] = useState("");
  const [emprunts, setEmprunts] = useState([]);

  const API = "http://localhost:3000/api/v1";

  // 🔐 LOGIN
  const login = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@test.com",
        password: "123456",
      }),
    });

    const data = await res.json();
    setToken(data.token);
    alert("Login success");
  };

  // ➕ ADD EMPRUNT
  const addEmprunt = async () => {
    const res = await fetch(`${API}/emprunt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idClient,
        idLivre,
        dateEmprunt,
      }),
    });

    const data = await res.json();
    console.log(data);
    alert("Emprunt ajouté");
  };

  // 📥 GET EMPRUNTS
  const getEmprunts = async () => {
    const res = await fetch(`${API}/emprunt/${searchClient}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setEmprunts(data);
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>📚 Emprunt Service</h1>

        {/* LOGIN */}
        <div style={styles.card}>
          <h2>Login</h2>
          <button style={styles.button} onClick={login}>
            Se connecter
          </button>
        </div>

        {/* ADD */}
        <div style={styles.card}>
          <h2>Ajouter un emprunt</h2>

          <input
            style={styles.input}
            placeholder="ID Client"
            onChange={(e) => setIdClient(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="ID Livre"
            onChange={(e) => setIdLivre(e.target.value)}
          />

          <input
            style={styles.input}
            type="date"
            onChange={(e) => setDateEmprunt(e.target.value)}
          />

          <button style={styles.button} onClick={addEmprunt}>
            Ajouter
          </button>
        </div>

        {/* LIST */}
        <div style={styles.card}>
          <h2>Lister les emprunts</h2>

          <input
            style={styles.input}
            placeholder="ID Client"
            onChange={(e) => setSearchClient(e.target.value)}
          />

          <button style={styles.button} onClick={getEmprunts}>
            Chercher
          </button>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID Client</th>
                <th>ID Livre</th>
                <th>Date Emprunt</th>
                <th>Date Retour</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {emprunts.map((e, i) => (
                <tr key={i}>
                  <td>{e.idClient}</td>
                  <td>{e.idLivre}</td>
                  <td>
                    {e.dateEmprunt
                      ? new Date(e.dateEmprunt).toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    {e.dateRetour
                      ? new Date(e.dateRetour).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{e.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 🎨 CSS داخل JS
const styles = {
  body: {
    background: "#f4f7fb",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial",
  },
  container: {
    maxWidth: "900px",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  card: {
    background: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
  },
};

export default App;