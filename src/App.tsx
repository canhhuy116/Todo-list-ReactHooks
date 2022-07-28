import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/Home/Home';
import DetailTodo from './components/DetailTodo/DetailTodo';
import { createTodo, deleteTodo, readTodo, updateTodo } from './api';

interface Job {
  id: string;
  name: string;
  description: string;
}

function App() {
  const [todoList, setTodoList] = useState<Job[]>([]);

  useEffect(() => {
    try {
      readTodo()
        .then((res) => res.json())
        .then((res) => {
          setTodoList(res);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const onClickAddButton = useCallback(
    (job: Job) => {
      try {
        createTodo(job)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setTodoList([...todoList, job]);
          });
      } catch (error) {
        alert(error);
      }
    },
    [todoList]
  );

  const onClickDeleteButton = useCallback((job: Job) => {
    try {
      deleteTodo(job.id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setTodoList((prevState) =>
            prevState.filter((todo) => todo.id !== job.id)
          );
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleUpdateJob = useCallback((job: Job) => {
    try {
      updateTodo(job)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setTodoList((prevState) =>
            prevState.map((todo) => (todo.id === job.id ? (todo = job) : todo))
          );
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                ListJob={todoList}
                onClickAddButton={onClickAddButton}
                onClickDeleteButton={onClickDeleteButton}
              />
            }
          />
          {todoList.map((todo) => {
            return (
              <Route
                key={todo.id}
                path={`/${todo.id}`}
                element={
                  <DetailTodo job={todo} handleUpdateJob={handleUpdateJob} />
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
