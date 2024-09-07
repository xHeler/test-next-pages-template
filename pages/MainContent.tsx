import React from "react";
import { Schema } from "@/amplify/data/resource";

interface MainContentProps {
  todos: Array<Schema["Todo"]["type"]>;
  createTodo: () => void;
  deleteTodo: (id: string) => void;
  signOut?: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  todos,
  createTodo,
  deleteTodo,
  signOut,
}) => (
  <main>
    <h1>My todos</h1>
    <button onClick={createTodo}>+ new</button>
    <ul>
      {todos.map((todo) => (
        <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
          {todo.content}
        </li>
      ))}
    </ul>
    <div>
      🥳 App successfully hosted. Try creating a new todo.
      <br />
      <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
        Review next steps of this tutorial.
      </a>
    </div>
    {process.env.NEXT_PUBLIC_ENV === "PROD" && signOut && (
      <button onClick={signOut}>Sign out</button>
    )}
  </main>
);
