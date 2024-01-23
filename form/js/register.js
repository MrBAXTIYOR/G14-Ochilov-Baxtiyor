let registerForm = document.querySelector("#form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let username = e.target[0].value;
  let password = e.target[1].value;
  let res = await fetch("https://todo-for-n92.cyclic.app/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  let data = await res.json();
  let token = data.token;
  if (token) {
    localStorage.setItem("token", token);
    window.location.href = "../main/index.html";
  }
});