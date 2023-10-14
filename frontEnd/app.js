const ul = document.querySelector(".list>ul");

//get all the list and populate it over the frontend
window.onload = function () {
  fetch("http://localhost:3000/todos/", { method: "GET" })
    .then((data) => data.json())
    .then((response) => {
      response.forEach((res) => {
        const listItem = document.createElement("li");
        const spanListItem = document.createElement("span");
        const buttonListItem = document.createElement("button");
        buttonListItem.classList.add("deleteButton");
        buttonListItem.setAttribute("data-id", res.id);
        spanListItem.innerHTML = `Title: ${res.title} <br> Description: ${res.description}`;
        buttonListItem.innerHTML = "Delete";

        listItem.appendChild(spanListItem);
        listItem.appendChild(buttonListItem);
        ul.appendChild(listItem);
      });
    });
};

//Post the todos to the list
const submit = document.querySelector(".submit");
const title = document.getElementById("titleInput");
const description = document.getElementById("descriptionInput");

submit.addEventListener("click", (e) => {
  e.preventDefault();
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

//delete the todos
ul.addEventListener("click", function (e) {
  // This is called Event Delegation
  if (e.target.classList.contains("deleteButton")) {
    const id = e.target.getAttribute("data-id");

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Success!");
        } else {
          console.log("Failed to delete todo!");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
});

/*
### Event Delegation and Bubbling: A Quick Note

**Event Bubbling:**
- When an event occurs on a DOM element (like a click on a button), it doesn't stop there. 
- This event propagates or "bubbles up" through its parent elements in the DOM hierarchy.
- For instance, a click on a button inside a list (`li` inside `ul`) will also trigger click events on the `li`, the `ul`, and so on up to the root.

**Event Delegation:**
- Rather than setting an event listener on each child element, set a single listener on a common parent.
- This approach takes advantage of event bubbling. The parent catches the event that bubbled up from the child.
- Inside the event listener on the parent, use the event's `target` property to identify which child element was the source of the original event.
- This is efficient, especially when handling events for many elements, or for elements that can be added or removed dynamically.

**Example:**
1. Click a "delete" button inside a list.
2. The click event bubbles up to its parent `li` and then to the `ul`.
3. An event listener on the `ul` catches the bubbled event.
4. Check if the clicked element (`event.target`) was a "delete" button.
5. If yes, execute the relevant logic (e.g., delete an item).

**Advantages:**
- Efficiency: Only one listener for multiple child elements.
- Dynamism: Works even if child elements are added or removed after the listener is set up.
*/
