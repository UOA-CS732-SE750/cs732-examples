import { useState } from "react";
import initialTodos from "./js/initial-todos";
import ToDoList from "./components/ToDoList";

function App() {
  const [todos, setTodos] = useState(initialTodos);

  function handleItemChanged(updatedItem) {
    const updatedTodos = todos.map((item) => (item.id === updatedItem.id ? updatedItem : item));
    setTodos(updatedTodos);
  }

  return (
    <main className="main">
      <h1>My todos</h1>
      <ToDoList items={todos} onItemChanged={handleItemChanged} />
    </main>
  );
}

export default App;
