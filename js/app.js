const $ = document;
const form = $.getElementById("itemForm");
const itemInput = $.getElementById("itemInput");
const itemList = $.querySelector(".item-list");
const feedback = $.querySelector(".feedback");
const clearButton = $.querySelector("#clear-list");

let todoItems = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const itemName = itemInput.value;

  if (itemName.length === 0) {
    feedback.innerHTML = "لطفا اینپوت را پر کنید";
    feedback.classList.add("showItem", "alert-danger");
    setTimeout(function () {
      feedback.classList.remove("showItem");
    }, 4000);
  } else {
    let todoObj = { title: itemName, completed: false }
    todoItems.push(todoObj);
    getList(todoItems);
  }
  itemInput.value = "";
  setLocalStorage(todoItems)
  console.log(todoItems);
});

function handleItem(todoItem) {
  const items = $.querySelectorAll(".item");
  items.forEach(function (item) {
    if (item.querySelector(".item-name").textContent === todoItem.title) {

      // Complete Event
      item
        .querySelector(".complete-item")
        .addEventListener("click", function () {

          let mainTodoTitle = todoItem.title
          todoItems.map(item => {
            if (item.title == mainTodoTitle) {
              item.completed = !item.completed
            }
          })

          item.querySelector(".item-name").classList.toggle("completed");
          this.classList.toggle("visibility");
          setLocalStorage(todoItems)
        });

      // Delete Event
      item.querySelector('.delete-item').addEventListener('click', function() {
        itemList.removeChild(item)

        todoItems = todoItems.filter(function(item) {
          return item != itemName
        })
      })

      // Edit Event
      item.querySelector('.edit-item').addEventListener('click', function() {
        // console.log('روی آیکون ویرایش کلیک شد')
        itemInput.value = itemName
        itemList.removeChild(item)

        todoItems = todoItems.filter(item => {
          return item != itemName
        })
      })

    }
  });
}

const getLocalStorage = () => {
  const todoStorage = JSON.parse(localStorage.getItem('todoItems'))
  if(todoStorage == null) {
    todoItems = []
  } else {
    todoItems = todoStorage
    getList(todoItems)
  }
}

getLocalStorage()

function setLocalStorage(todoItems) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems))
}

function getList(todoItems) {
  itemList.innerHTML = "";
  todoItems.forEach(function (item) {

    if (item.completed) {
      itemList.insertAdjacentHTML(
        "beforeend",
        `
      <div class="item my-3">
      <h5 class="completed item-name text-capitalize">${item.title}</h5>
      <div class="item-icons">
        <a href="#" class="visibility complete-item mx-2 item-icon"
          ><i class="far fa-check-circle"></i
        ></a>
        <a href="#" class="edit-item mx-2 item-icon"
          ><i class="far fa-edit"></i
        ></a>
        <a href="#" class="delete-item item-icon"
          ><i class="far fa-times-circle"></i
        ></a>
      </div>
    </div>
      `
      );
    } else {
      itemList.insertAdjacentHTML(
      "beforeend",
      `
    <div class="item my-3">
    <h5 class="item-name text-capitalize">${item.title}</h5>
    <div class="item-icons">
      <a href="#" class="complete-item mx-2 item-icon"
        ><i class="far fa-check-circle"></i
      ></a>
      <a href="#" class="edit-item mx-2 item-icon"
        ><i class="far fa-edit"></i
      ></a>
      <a href="#" class="delete-item item-icon"
        ><i class="far fa-times-circle"></i
      ></a>
    </div>
  </div>
    `
    );
    }
    
    handleItem(item);
  });
}


clearButton.addEventListener('click', function() {
  // todoItems = []

  todoItems.length = 0
  localStorage.clear()
  getList(todoItems)
})
