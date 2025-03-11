///////elements
const boardContainer = document.querySelector(".board-container");
const addTaskBtnEl = document.querySelector(".add-task-btn");

//modals
const modalWindowEl = document.querySelector(".modal-window");
const modalAddTaskEl = document.querySelector(".modal-add-task");
const addTaskCloseBtnEl = document.querySelector(".task-modal-close-btn");
const modalAddTaskBtn = document.querySelector(".modal-add-task-btn");

const modalAddBoardEl = document.querySelector(".modal-add-board");
const modalAddBoardBtn = document.querySelector(".modal-add-board-btn");
const modalBoardCloseBtn = document.querySelector(".board-modal-close-btn");
/////adfadsfa
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
      id: "aB3dE1",
      boardName: "tasks",
      tasks: [
        {
          id: "a345D8",
          name: "Learn Js",
        },
      ],
    },
    {
      id: "Zx9K2m",
      boardName: "In Progress",
      tasks: [],
    },
    {
      id: "7pQw4L",
      boardName: "done",
      tasks: [],
    },
  ],
};
const deleteIcon = `<svg
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
    </svg>`;

/////Functions
const addBoard = (name) => {
  //update state
  const board = {};
  const id = generateId();
  board.id = id;
  board.boardName = name;
  board.tasks = [];
  board.taskCount = 0;
  state.boards.push(board);

  //create boardEl
  createBoardElement(board);
};

const addTask = (name, boardId) => {
  console.log(boardId);
  const taskId = generateId();
  const task = {};
  task.id = taskId;
  task.name = name;
  const boardIndex = state.boards.findIndex((board) => boardId === board.id);
  state.boards[boardIndex].tasks.push(task);
  console.log(state);
  //append task to board
  const boardEl = document.querySelector(`[data-board-id="${boardId}"]`);
  const taskEl = createTaskElement(task);
  const taskContainerEl = boardEl.querySelector(".tasks");
  taskContainerEl.prepend(taskEl);
};

///////dom related functions //////////
const addDeleteHandler = (target, taskId) => {
  target.addEventListener("click", () => {
    //delete from state
    state.boards.forEach((board) => {
      board.tasks = board.tasks.filter((task) => task.id !== taskId);
    });

    console.log(state);
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

const addTaskHandler = (target) => {
  target.addEventListener("click", () => {
    showModal();
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

function createTaskElement({ name, id }) {
  // Create the <li> element with the class "task"
  const taskItem = document.createElement("li");

  taskItem.setAttribute("data-task-id", id);
  taskItem.classList.add("task");

  // Create the <p> element for the task title
  const titleEl = document.createElement("p");
  titleEl.classList.add("task-title");
  titleEl.textContent = name;
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
  deleteBtn.innerHTML = deleteIcon;
  addDeleteHandler(deleteBtn, id);
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

const createBoardElement = ({ id, boardName, tasks = null }) => {
  const className = toDashedName(boardName);
  const boardEl = document.createElement("div");
  // add id dataAttribute
  boardEl.setAttribute(`data-board-id`, id);
  boardEl.classList.add("board", `${className}-board`);
  const boardHeadingEl = document.createElement("h4");
  boardHeadingEl.classList.add("heading");
  boardHeadingEl.textContent = toTitleCase(boardName);
  const tasksContainerEl = document.createElement("div");
  tasksContainerEl.classList.add("tasks");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "board-delete-btn");
  deleteBtn.innerHTML = deleteIcon;
  addBoardDeleteHandler(deleteBtn);
  const addTaskBtn = document.createElement("button");
  addTaskBtn.classList.add("add-task-btn");
  addTaskHandler(addTaskBtn);
  addTaskBtn.textContent = "Add Task";
  boardEl.appendChild(addTaskBtn);
  boardEl.appendChild(boardHeadingEl);
  boardEl.appendChild(tasksContainerEl);
  boardEl.appendChild(deleteBtn);
  addDragHandlerOnBoard(boardEl);
  if (tasks) {
    tasks.forEach((task) => {
      const taskEl = createTaskElement(task);
      tasksContainerEl.prepend(taskEl);
    });
  }
  boardContainer.appendChild(boardEl);
  addBoardOption(boardName);
};

const init = () => {
  allboards.forEach((board) => {
    addDragHandlerOnBoard(board);
  });
  state.boards.forEach((board) => {
    createBoardElement(board);
  });
};

init();

//event to close btn
addTaskCloseBtnEl.addEventListener("click", () => {
  hideModal();
});

//event to add task
modalAddTaskBtn.addEventListener("click", () => {
  const taskTitle = taskInputEl.value;
  const boardEl = document.querySelector(
    `.${camelToDash(boardSelectEl.value)}-board`
  );
  const boardId = boardEl.dataset.boardId;
  //add task to state
  if (!taskTitle && taskTitle.length <= 0) return;
  addTask(taskTitle, boardId);
  clearTaskInput();
  hideModal();
});

//event to add board
addBoardBtn.addEventListener("click", createBoardElement);

//////helper functions/////////
function camelToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function toDashedName(name) {
  // Trim any extra whitespace

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

function generateId(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}
