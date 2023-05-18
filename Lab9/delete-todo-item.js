/* open crudcrud.com and then replace ID and resource name. */
// BEGIN: configuration zone
var CRUD_CURD_ID = "4fc7c6b87f7f43ca9e4c876914fc71eb";
var CRUD_CURD_RESOURCE_NAME = "todo";
var CURD_CURD_API_ENDPOINT =
  "https://crudcrud.com/api/" + CRUD_CURD_ID + "/" + CRUD_CURD_RESOURCE_NAME;
// END:configuration zone

// BEGIN: application variables zone
var APPLICATION_STATE = {
  todoList: []
}
// END: application variables zone

// BEGIN: utility function zone
function htmlToElem(html) {
  let temp = document.createElement("template");
  html = html.trim(); // Never return a space text node as a result
  temp.innerHTML = html;
  return temp.content.firstChild;
}
// END: utility function zone

// BEGIN: API fetching zone
async function loadTodoList(afterLoadFunction) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: headers
  };

  await fetch(CURD_CURD_API_ENDPOINT, requestOptions).then(function (response) {
    response.json().then(function (data) {
      afterLoadFunction(data);
    });
  });
}

function addNewTodoItem(value, afterAddFunction) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    body: JSON.stringify({
      name: value
    }),
    headers: headers
  };

  fetch(CURD_CURD_API_ENDPOINT, requestOptions).then(function (response) {
    response.json().then(function (data) {
      afterAddFunction(data);
    });
  });
  console.log(requestOptions);
}


// END: API fetching zone

// BEGIN: UI Control and logic zone
function bindEvents() {
  var addButtonElm = document.getElementById("todo-add-button");
  addButtonElm.addEventListener("click", function () {
    var inputElm = document.getElementById("todo-input");
    var todoValue = inputElm.value;
    inputElm.value = "";
    if (todoValue !== "") {
      addNewTodoItem(todoValue, function () {
        refreshTodoList()
      });
    }
  });
}

function renderTodoList() {
  var todoListElm = document.getElementById("todo-list-container");
  todoListElm.innerHTML = "";

  for (var idx = 0; idx < APPLICATION_STATE.todoList.length; idx++) {
    var todoItem = APPLICATION_STATE.todoList[idx];
    var todoItemElm = htmlToElem(
      '<div class="todo-item">' + todoItem.name + "</div>"
    );
    todoListElm.append(todoItemElm);
  }
}

function refreshTodoList () {
  loadTodoList(function (data) {
    APPLICATION_STATE.todoList = data;
    renderTodoList();
  });
}

window.onload = function () {
  bindEvents();
  refreshTodoList();
};

// END: UI Control and logic zone