///////elements
const addTaskBtnEl = document.querySelector(".add-task-btn");
const modalWindowEl = document.querySelector(".modal-window");
const modalCloseBtnEl = document.querySelector(".btn-close");
const modalAddBtn = document.querySelector(".add-btn");
const taskInputEl = document.getElementById("task-title");
const boardTasksEl = document.querySelector(".task-board");
const allboards = document.querySelectorAll(".board");
const testTaskItem = document.querySelector(".test-task-item");

///////variables
const state = {
  todos: {},
};

///////functions
const addDeleteHandler = (target) => {
  target.addEventListener("click", () => {
    const tasksEl = target.closest(".task");
    tasksEl.remove();
  });
};

const addDragHandlerOnTaskItem = (target) => {
  target.addEventListener("dragstart", () => {
    target.classList.add("flying");
  });
  target.addEventListener("dragend", () => {
    target.classList.remove("flying");
  });
};

const addDragHandlerOnBoard = (target) => {
  target.addEventListener("dragover", () => {
    const flyingItem = document.querySelector(".flying");
    const boardTasksEl = target.querySelector(".tasks");
    boardTasksEl.prepend(flyingItem);
  });
};

const showModal = () => {
  modalWindowEl.style.display = "flex";
};

const hideModal = () => {
  modalWindowEl.style.display = "none";
};

const clearTaskInput = () => {
  taskInputEl.value = "";
};

function createTaskElement(taskName, targetElement) {
  // Create the <li> element with the class "task"
  const taskItem = document.createElement("li");
  taskItem.classList.add("task");

  // Create the <p> element for the task title
  const titleEl = document.createElement("p");
  titleEl.classList.add("task-title");
  titleEl.textContent = taskName;
  taskItem.appendChild(titleEl);

  // Create the container for action buttons
  const actionBtns = document.createElement("div");
  actionBtns.classList.add("action-btns");

  // Create the edit button with its SVG
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  `;
  actionBtns.appendChild(editBtn);

  // Create the delete button with its SVG
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  `;
  addDeleteHandler(deleteBtn);
  actionBtns.appendChild(deleteBtn);

  // Append the action buttons container to the task item
  taskItem.appendChild(actionBtns);

  //draggable event
  taskItem.setAttribute("draggable", true);
  addDragHandlerOnTaskItem(taskItem);
  // Prepend the newly created task item into the target container
  if (targetElement && targetElement.prepend) {
    targetElement.prepend(taskItem);
  } else {
    console.error("Invalid target element provided:", targetElement);
  }
}

const init = () => {
  allboards.forEach((board) => {
    addDragHandlerOnBoard(board);
  });
};

init();
addDragHandlerOnTaskItem(testTaskItem);
addDeleteHandler(testTaskItem);
///////events
addTaskBtnEl.addEventListener("click", () => {
  showModal();
});

//event to close btn
modalCloseBtnEl.addEventListener("click", hideModal);

//event to add task
modalAddBtn.addEventListener("click", () => {
  const taskTitle = taskInputEl.value;
  if (!taskTitle && taskTitle.length <= 0) return;
  const tasksEl = boardTasksEl.querySelector(".tasks");
  createTaskElement(taskTitle, tasksEl);
  clearTaskInput();
  hideModal();
});
