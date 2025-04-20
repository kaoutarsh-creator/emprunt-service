const form = document.getElementById("registerForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      messageDiv.innerHTML = `
        <div class="message success">${data.message}</div>
      `;

      setTimeout(() => {
        window.location.href = "/login.html";
      }, 1000);
    } else {
      messageDiv.innerHTML = `
        <div class="message error">${data.message}</div>
      `;
    }
  } catch (error) {
    console.error("Register error:", error);

    messageDiv.innerHTML = `
      <div class="message error">Erreur serveur</div>
    `;
  }
});