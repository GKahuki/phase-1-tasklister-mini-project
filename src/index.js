document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("create-task-form");
  const taskInput = document.getElementById("new-task-description");
  const taskList = document.getElementById("list");

  // Add a dropdown for priority
  const priorityDropdown = document.createElement("select");
  priorityDropdown.id = "priority";
  priorityDropdown.innerHTML = `
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  `;
  taskForm.appendChild(priorityDropdown);

  // Add a sorting button
  const sortButton = document.createElement("button");
  sortButton.textContent = "Sort by Priority";
  sortButton.style.marginLeft = "10px";
  taskForm.appendChild(sortButton);

  // Handle form submission
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const taskText = taskInput.value.trim();
    const priority = priorityDropdown.value;
    if (taskText === "") return;

    // Create a new task item
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

        // Set the color based on priority
        if (priority === "high") {
          taskItem.style.color = "red";
        } else if (priority === "medium") {
          taskItem.style.color = "orange";
        } else if (priority === "low") {
          taskItem.style.color = "green";
        }

    // Add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(taskItem);
    });

    taskItem.dataset.priority = priority; // Store priority for sorting
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = "";
  });

 // Handle sorting
 sortButton.addEventListener("click", () => {
  const tasks = Array.from(taskList.children);
  tasks.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
  });

  // Clear and re-append sorted tasks
  taskList.innerHTML = "";
  tasks.forEach((task) => taskList.appendChild(task));
}); 
});