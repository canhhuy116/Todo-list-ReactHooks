import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './Dashboard.scss';
import Home from '../Home/Home';
import DetailTodo from '../DetailTodo/DetailTodo';
import { createTodo, deleteTodo, readTodo, updateTodo } from '../../api/todos';

interface Job {
  id: string;
  name: string;
  description: string;
}

function Dashboard() {
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
    <div className="Dashboard">
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
    </div>
  );
}

export default Dashboard;
