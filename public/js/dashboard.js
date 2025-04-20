const token = localStorage.getItem("token");
const tokenInfo = document.getElementById("tokenInfo");
const logoutBtn = document.getElementById("logoutBtn");

if (!token) {
  window.location.href = "/login.html";
}

async function loadProfile() {
  try {
    const response = await fetch("/api/v1/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      tokenInfo.textContent = `Connecté avec : ${data.user.email}`;
    } else {
      tokenInfo.textContent = data.message || "Erreur de chargement du profil";

      if (response.status === 401) {
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login.html";
        }, 1000);
      }
    }
  } catch (error) {
    console.error("Profile error:", error);
    tokenInfo.textContent = "Erreur serveur";
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
});

loadProfile();