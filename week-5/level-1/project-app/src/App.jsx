import { useEffect } from "react";
import { useState } from "react";

function App(){
  const [todos, setTodos] = useState([]);

  useEffect(()=> {
    setInterval(() => {
      fetch("https://sum-server.100xdevs.com/todo?id=1")
      .then(async (res) => {
        const json = await res.json;
        setTodos(json.todos);
      });
    }, 10000)
    
  }, []);

  return <>
    {todos.map((todo) => {<Todo key={todo.id} title={todo.title} description={todo.description}></Todo>})}
  </>
}

function Todo({title, description}){
  return <>
    <h1>{title}</h1>
    <h4>{description}</h4>
  </>
}

export default App;