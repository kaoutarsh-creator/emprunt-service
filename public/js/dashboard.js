const token = localStorage.getItem("token");
const tokenInfo = document.getElementById("tokenInfo");
const logoutBtn = document.getElementById("logoutBtn");

if (!token) {
  window.location.href = "/login.html";
}

tokenInfo.textContent = "Vous êtes connecté avec un token JWT.";

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
});