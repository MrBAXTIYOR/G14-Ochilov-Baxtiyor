let form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let inputValue = e.target[0];
  let passwordValue = e.target[1];
  console.log(inputValue, passwordValue);
  let res = await fetch("https://todo-for-n92.cyclic.app/user/login",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: inputValue.value,
      password: passwordValue.value,
    }),
  })
  let data = await res.json();
  let token = data.token;
  console.log(token);
  if (token) {
    localStorage.setItem("token", token);
    window.location.href = "../main/index.html";
  }
  else{
    alert("Please enter a valid token for your application and try again later to login");
  }
  
});
