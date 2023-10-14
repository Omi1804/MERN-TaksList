const ul = document.querySelector(".list>ul");

//get all the list and populate it over the frontend
window.onload = function () {
  fetch("http://localhost:3000/todos/", { method: "GET" })
    .then((data) => data.json())
    .then((response) => {
      response.forEach((res) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Title: ${res.title} <br><br> Description: ${res.description}`;

        ul.appendChild(listItem);
      });
    });
};

//Post the todos to the list
const submit = document.querySelector(".submit");
const title = document.getElementById("titleInput");
const description = document.getElementById("descriptionInput");

submit.addEventListener("click", () => {
  if (title.value && description.value) {
    fetch("http://localhost:3000/todos/", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        description: description.value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Success!");
        } else {
          console.log("Failed to submit todos!");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    console.log("Please Enter");
  }
});
