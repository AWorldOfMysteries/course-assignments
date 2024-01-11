// const oldTodoState = [{"title":"h1","description":"t1","id":1}];
// const newTodos = [{"title":"h1","description":"t1","id":1},{"title":"h2","description":"t2","id":2}];

// const added = newTodos.filter((item) => {
//     // if(oldTodoState.includes(item))
//     //   return false;
    
//     // for(let i=0; i<oldTodoState.length; i++){
//     //   if(oldTodoState[i].id == item.id)
//     //     return false;
//     // }

//     // return true;

//   // 1, 2, 3, 4 old
//   // 2*, 1, 5, 6 new

//     return !oldTodoState.some(oldTodoItem => oldTodoItem.id === item.id);

//   });

//   console.log(`newTodo is ${JSON.stringify(newTodos)}`);
//   console.log(`Added array is ${JSON.stringify(added)}`);
//   console.log(`Old State is ${JSON.stringify(oldTodoState)}`);


// -----------------------------------------------

let globalId = 1;
    let todoState = [];
    let oldTodoState = [{"title":"h1","description":"t1","id":1},{"title":"h2","description":"t2","id":2}]

    function addTodoToDom(todo) {
      const title = todo.title;
      const description = todo.description;
      const titleDiv = document.createElement("div");
      titleDiv.innerHTML = title;

      const desDiv = document.createElement("div");
      desDiv.innerHTML = description;
      const parentDiv = document.createElement("div");
      parentDiv.setAttribute("id", todo.id);

      parentDiv.appendChild(titleDiv);
      parentDiv.appendChild(desDiv);
      
      document.getElementById("todos").appendChild(parentDiv);
    }

    function removeTodoFromDom(todo) {
      let todoItem = document.getElementById(todo.id);
      todoItem.remove();
    }

    function updateTodoInDom(oldTodo, newTodo) {
        let todoItem = document.getElementById(oldTodo.id);
        todoItem.childNodes[0].innerHTML = newTodo.title;
        todoItem.childNodes[1].innerHTML = newTodo.description; 
    }

    function updateState(newTodos) {
      // calculate the diff b/w newTodos and oldTodos.
      // More specifically, find out what todos are - 
      // 1. added
      // 2. deleted
      // 3. updated
      const updated = [];
      console.log("hi there")
      console.log(`Old State is ${JSON.stringify(oldTodoState)}`);
      let added = newTodos.filter((item) => {
        // if(oldTodoState.includes(item))
        //   return false;
        
        // for(let i=0; i<oldTodoState.length; i++){
        //   if(oldTodoState[i].id == item.id)
        //     return false;
        // }

        // return true;

      // 1, 2, 3, 4 old
      // 2*, 1, 5, 6 new

        return !oldTodoState.some(oldTodoItem => oldTodoItem.id === item.id)
      });
      console.log(`newTodo is ${JSON.stringify(newTodos)}`);
      console.log(`Added array is ${JSON.stringify(added)}`);
      // console.log(`Old State is ${JSON.stringify(oldTodoState)}`);

      const deleted = oldTodoState.filter((item) => {
        if(newTodos.includes(item))
          return false;
        for(let i=0; i<newTodos.length; i++){
          if(newTodos[i].id == item.id){
            updated.push(item);
            return false;
          }
        }
        
        return true;
      });
      // calculate these 3 arrays
      
      // 1, 2, 3, 4 old
      // 2*, 1, 5, 6 new

      // call addTodo, removeTodo, updateTodo functions on each of the
      // elements
      for(let i=0; i<deleted.length; i++){
        removeTodoFromDom(deleted[i]);
      }
      for(let i=0; i<updated.length; i++){
        updateTodoInDom(updated[i]);
      }
      for(let i=0; i<added.length; i++){
        addTodoToDom(added[i]);
      }
    
      oldTodoState = newTodos.slice(); // kinda took most of the debug time
      console.log(`Updated Old State is ${JSON.stringify(oldTodoState)}`);
    }

    function addTodo() {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      todoState.push({
        title: title,
        description: description,
        id: globalId++,
      })
      updateState(todoState);
    }