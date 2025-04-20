const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

const form = document.getElementById("empruntForm");
const messageDiv = document.getElementById("message");
const tableBody = document.getElementById("empruntTable");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const idClient = document.getElementById("idClient").value;
  const idLivre = document.getElementById("idLivre").value;

  try {
    const response = await fetch("/api/v1/emprunt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ idClient, idLivre })
    });

    const data = await response.json();

    if (response.ok) {
      messageDiv.innerHTML = `<div class="message success">${data.message}</div>`;
      loadEmprunts();
    } else {
      messageDiv.innerHTML = `<div class="message error">${data.message}</div>`;
    }
  } catch (error) {
    messageDiv.innerHTML = `<div class="message error">Erreur serveur</div>`;
  }
});

async function loadEmprunts() {
  try {
    const response = await fetch("/api/v1/emprunt", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await response.json();

    tableBody.innerHTML = "";

    data.data.forEach((e) => {
      tableBody.innerHTML += `
        <tr>
          <td>${e.idClient}</td>
          <td>${e.idLivre}</td>
          <td>${new Date(e.date).toLocaleDateString()}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error(error);
  }
}

loadEmprunts();