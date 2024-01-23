let addTodoForm = document.querySelector("form");
let info = document.getElementById("info");

addTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = document.getElementById("todo").value;

  fetch(`https://todo-for-n92.cyclic.app/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ task }),
  })
    .then((response) => response.json())

    .then((data) => {
      alert(data.message);
      rederData();
    })
    .catch((error) => console.error("Add Todo Error:", error));
});

async function rederData() {
  let data = await fetch("https://todo-for-n92.cyclic.app/todos/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });
  let res = await data.json();
  console.log(res);
  info.innerHTML = "";
  res.allTodos.forEach((element) => {
    info.innerHTML += `
  <li>Todo: ${element.task} <i class="fa-solid fa-user-pen"  onclick="editUser('${element._id}')"> </i> <i class="fa-solid fa-trash ii" onclick="deliteUser('${element._id}')"></i></li>`;
  });
}

async function editUser(id) {
  let prom = prompt("Please enter your todo !!!");
  fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ task: prom }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      rederData();
    })
    .catch((error) => console.error("Update Todo Error:", error));
}
function deliteUser(todoId) {
 
  fetch(`https://todo-for-n92.cyclic.app/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      rederData();
    })
    .catch((error) => console.error("Delete Todo Error:", error));
}
