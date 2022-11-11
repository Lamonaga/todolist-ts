import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoForm/TodoList";
import { db } from "./firebase";
import { ITodo } from "./interfaces";

const AppContainerStyled = styled.div`
  align-items: center;
  width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const App: React.FC = () => {
  useEffect(() => {
    db.collection("todoList")
      .get()
      .then((querySnapshot) => {
        console.log("todo", querySnapshot);

        querySnapshot.forEach((doc) => {
          console.log(doc);

          console.log("todo", `${doc.id} => ${doc.data()}`);
        });
      });
  }, []);

  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false,
    };
    setTodos((prev: ITodo[]) => [newTodo, ...prev]);

    db.collection("todoList")
      .add({
        title: title,
        id: Date.now(),
        completed: false,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const onEdit = (id: number, value: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = value;
        }
        return todo;
      })
    );
  };

  return (
    <AppContainerStyled>
      <TodoForm addTodo={addTodo} />
      <TodoList
        onToggle={onToggle}
        todos={todos}
        removeTodo={removeTodo}
        onEdit={onEdit}
      />
    </AppContainerStyled>
  );
};

export default App;
