const form = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      messageDiv.innerHTML = `<div class="message success">${data.message}</div>`;
      setTimeout(() => {
        window.location.href = "/dashboard.html";
      }, 1000);
    } else {
      messageDiv.innerHTML = `<div class="message error">${data.message}</div>`;
    }
  } catch (error) {
    messageDiv.innerHTML = `<div class="message error">Erreur serveur</div>`;
  }
});