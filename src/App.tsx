import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { SliderField } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["MenuItem"]["type"]>>([]);

  useEffect(() => {
    client.models.MenuItem.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.MenuItem.create({
      name: window.prompt("Todo content") ?? "N/A",
    });
  }

  return (
    <main>
      <h1>My todos</h1>
      <SliderField label="Test" />
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
