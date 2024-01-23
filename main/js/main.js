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
      console.log(data.todo.userId);
      info.innerHTML = `
      <li>Todo: ${data.todo.task} <i class="fa-solid fa-user-pen"  onclick="editUser('${data.todo.userId}')"> </i> <i class="fa-solid fa-trash ii" onclick="deliteUser('${data.todo.userId}')"></i></li>`;
    })
    .catch((error) => console.error("Add Todo Error:", error));
});
function delitetodo(id) {
  fetch(` https://todo-for-n92.cyclic.app/todos/:${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => console.log(response))

    .catch((error) => console.error("Add Todo Error:", error));
}

async function deliteUser(id) {
  let res = await fetch(Main__IP + "/todo/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  renderData();
}

async function editUser(id) {
  console.log(id);
  const promptp = prompt("Are you sure you want to edit this user");
  let res = await fetch(Main__IP + "/todo/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: promptp,
    }),
  });
  renderData();
}
