import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './Dashboard.scss';
import Home from '../Home/Home';
import DetailTodo from '../DetailTodo/DetailTodo';
import {
  createTodo,
  deleteTodo,
  readTodoByUsername,
  updateTodo,
} from '../../api/todos';

interface Job {
  id: string;
  name: string;
  description: string;
}

function Dashboard() {
  const [todoList, setTodoList] = useState<Job[]>([]);
  const shouldRead = useRef(true);

  useEffect(() => {
    const getData = async () => {
      try {
        readTodoByUsername().then((res) => {
          setTodoList(res);
        });
      } catch (error) {
        alert(error);
      }
    };
    if (shouldRead.current) {
      shouldRead.current = false;
      getData();
    }
  }, []);

  const onClickAddButton = useCallback(
    async (job: Job) => {
      try {
        const todos = await createTodo(job);
        setTodoList([...todoList, todos]);
      } catch (error) {
        alert(error);
      }
    },
    [todoList]
  );

  const onClickDeleteButton = useCallback(async (job: Job) => {
    try {
      const todos = await deleteTodo(job.id);
      setTodoList((prevState) => prevState.filter((todo) => todo.id !== todos));
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleUpdateJob = useCallback(async (job: Job) => {
    try {
      const todos = await updateTodo(job);
      setTodoList((prevState) =>
        prevState.map((todo) => (todo.id === job.id ? (todo = todos) : todo))
      );
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div className="Dashboard">
      <Outlet />
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
