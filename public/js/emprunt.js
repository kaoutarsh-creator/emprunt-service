const token = localStorage.getItem("token");
const logoutBtn = document.getElementById("logoutBtn");
const empruntForm = document.getElementById("empruntForm");
const messageDiv = document.getElementById("message");
const searchBtn = document.getElementById("searchBtn");
const empruntTableBody = document.getElementById("empruntTableBody");

if (!token) {
  window.location.href = "/login.html";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
});

empruntForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const idClient = document.getElementById("idClient").value;
  const idLivre = document.getElementById("idLivre").value;

  try {
    const response = await fetch("/api/v1/emprunt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ idClient, idLivre })
    });

    const data = await response.json();

    if (response.ok) {
      messageDiv.innerHTML = `<div class="message success">${data.message}</div>`;
      empruntForm.reset();
    } else {
      messageDiv.innerHTML = `<div class="message error">${data.message}</div>`;
    }
  } catch (error) {
    messageDiv.innerHTML = `<div class="message error">Erreur serveur</div>`;
  }
});

searchBtn.addEventListener("click", async () => {
  const clientId = document.getElementById("searchClientId").value;

  if (!clientId) return;

  try {
    const response = await fetch(`/api/v1/emprunt/${clientId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    empruntTableBody.innerHTML = "";

    if (response.ok && data.data.length > 0) {
      data.data.forEach((item) => {
        empruntTableBody.innerHTML += `
          <tr>
            <td>${item._id}</td>
            <td>${item.idLivre}</td>
            <td>${item.statut}</td>
          </tr>
        `;
      });
    } else {
      empruntTableBody.innerHTML = `
        <tr>
          <td colspan="3">Aucun emprunt trouvé</td>
        </tr>
      `;
    }
  } catch (error) {
    empruntTableBody.innerHTML = `
      <tr>
        <td colspan="3">Erreur serveur</td>
      </tr>
    `;
  }
});