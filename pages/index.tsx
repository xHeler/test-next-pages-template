import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { MainContent } from "./MainContent";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [user, setUser] = useState<any>(null);

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  const signOut = () => {
    setUser(null);
  };

  if (process.env.NEXT_PUBLIC_ENV === "PROD") {
    return (
      <Authenticator>
        {({ signOut: authSignOut, user: authUser }) => {
          setUser(authUser);
          return (
            <MainContent
              todos={todos}
              createTodo={createTodo}
              deleteTodo={deleteTodo}
              signOut={signOut}
            />
          );
        }}
      </Authenticator>
    );
  }

  return (
    <MainContent
      todos={todos}
      createTodo={createTodo}
      deleteTodo={deleteTodo}
    />
  );
}
