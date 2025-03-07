///////elements
const boardContainer = document.querySelector(".board-container");
const addTaskBtnEl = document.querySelector(".add-task-btn");
const modalWindowEl = document.querySelector(".modal-window");
const modalCloseBtnEl = document.querySelector(".btn-close");
const modalAddBtn = document.querySelector(".add-btn");
const boardSelectEl = document.querySelector("#boards-name");
const taskInputEl = document.getElementById("task-title");
const boardTasksEl = document.querySelector(".tasks-board");
const allboards = document.querySelectorAll(".board");
const addBoardBtn = document.querySelector(".add-board");
const testTaskItem = document.querySelector(".test-task-item");

///////variables
const state = {
  // {board,todos,taskCount}
  boards: [
    {
      boardName: "tasks",
      tasks: ["Learn Js"],
      taskCount: 1,
    },
    {
      boardName: "inProgress",
      tasks: [],
      taskCount: 0,
    },
    {
      boardName: "done",
      tasks: [],
      taskCount: 0,
    },
  ],
};

///////functions
const addDeleteHandler = (target) => {
  target.addEventListener("click", () => {
    const tasksEl = target.closest(".task");
    tasksEl.remove();
  });
};

const addBoardDeleteHandler = (target) => {
  target.addEventListener("click", () => {
    const boardEl = target.closest(".board");
    boardEl.remove();
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

function createTaskElement(taskName) {
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
  return taskItem;
}

const addBoardOption = (boardName) => {
  const newOptionEl = document.createElement("option");
  newOptionEl.value = toCamelCase(boardName);
  newOptionEl.textContent = toTitleCase(boardName);
  boardSelectEl.appendChild(newOptionEl);
};

const createBoardElement = () => {
  const boardName = "Some new board";
  const className = toDashedName(boardName);
  const boardEl = document.createElement("div");
  boardEl.classList.add("board", `${className}-board`);
  const boardHeadingEl = document.createElement("h4");
  boardHeadingEl.classList.add("heading");
  boardHeadingEl.textContent = toTitleCase(boardName);
  const tasksContainerEl = document.createElement("div");
  tasksContainerEl.classList.add("tasks");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "board-delete-btn");
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
  addBoardDeleteHandler(deleteBtn);
  boardEl.appendChild(boardHeadingEl);
  boardEl.appendChild(tasksContainerEl);
  boardEl.appendChild(deleteBtn);
  addDragHandlerOnBoard(boardEl);
  boardContainer.appendChild(boardEl);
  addBoardOption(boardName);
};

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

  const boardEl = document.querySelector(
    `.${camelToDash(boardSelectEl.value)}-board`
  );
  const boardTasksEl = boardEl.querySelector(".tasks");
  if (!taskTitle && taskTitle.length <= 0) return;
  const tasksEl = boardTasksEl.querySelector(".tasks");
  const taskEl = createTaskElement(taskTitle, tasksEl);
  boardTasksEl.prepend(taskEl);
  clearTaskInput();
  hideModal();
});

//event to add board
addBoardBtn.addEventListener("click", createBoardElement);

//////helper functions
function camelToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function toDashedName(name) {
  // Trim any extra whitespace
  console.log(name);
  name = name.trim();

  // Replace underscores with spaces to unify separators
  name = name.replace(/_/g, " ");

  // First, convert camelCase transitions to include a space:
  name = name.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Replace one or more whitespace characters with a single dash
  const dashed = name.replace(/\s+/g, "-").toLowerCase();
  return dashed;
}

function toTitleCase(name) {
  return name
    .toLowerCase() // Convert the entire string to lowercase
    .split(/\s+/) // Split the string into words by whitespace
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "); // Join the words back together with a space
}

function toCamelCase(str) {
  // Convert the entire string to lowercase, then split it on spaces, underscores, or hyphens
  const words = str.toLowerCase().split(/[\s_-]+/);

  // Capitalize the first letter of every word except the first one
  const camelCased = words
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");

  return camelCased;
}
