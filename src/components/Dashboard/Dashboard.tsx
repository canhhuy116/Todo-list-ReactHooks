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
import { refreshToken } from '../../api/auth';

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
        const todos = await readTodoByUsername();
        if (todos.code && todos.code === 401) {
          if (todos.msg && todos.msg === 'jwt expired') {
            const { token } = await refreshToken();
            if (token) {
              const store = localStorage.getItem('user');
              if (store) {
                const data = { ...JSON.parse(store), token };
                localStorage.setItem('user', JSON.stringify(data));
                const res = await readTodoByUsername();
                setTodoList(res);
              }
            }
          }
        } else {
          setTodoList(todos);
        }
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
        if (todos.code && todos.code === 401) {
          if (todos.msg && todos.msg === 'jwt expired') {
            const { token } = await refreshToken();
            if (token) {
              const store = localStorage.getItem('user');
              if (store) {
                const data = { ...JSON.parse(store), token };
                localStorage.setItem('user', JSON.stringify(data));
                const res = await createTodo(job);
                setTodoList([...todoList, res]);
              }
            }
          }
        } else {
          setTodoList([...todoList, todos]);
        }
      } catch (error) {
        alert(error);
      }
    },
    [todoList]
  );

  const onClickDeleteButton = useCallback(async (job: Job) => {
    try {
      const todos = await deleteTodo(job.id);
      if (todos.code && todos.code === 401) {
        if (todos.msg && todos.msg === 'jwt expired') {
          const { token } = await refreshToken();
          if (token) {
            const store = localStorage.getItem('user');
            if (store) {
              const data = { ...JSON.parse(store), token };
              localStorage.setItem('user', JSON.stringify(data));
              const res = await deleteTodo(job.id);
              setTodoList((prevState) =>
                prevState.filter((todo) => todo.id !== res.id)
              );
            }
          }
        }
      } else {
        setTodoList((prevState) =>
          prevState.filter((todo) => todo.id !== todos.id)
        );
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleUpdateJob = useCallback(async (job: Job) => {
    try {
      const todos = await updateTodo(job);
      if (todos.code && todos.code === 401) {
        if (todos.msg && todos.msg === 'jwt expired') {
          const { token } = await refreshToken();
          if (token) {
            const store = localStorage.getItem('user');
            if (store) {
              const data = { ...JSON.parse(store), token };
              localStorage.setItem('user', JSON.stringify(data));
              const res = await updateTodo(job);
              setTodoList((prevState) =>
                prevState.map((todo) =>
                  todo.id === job.id ? (todo = res) : todo
                )
              );
            }
          }
        }
      } else {
        setTodoList((prevState) =>
          prevState.map((todo) => (todo.id === job.id ? (todo = todos) : todo))
        );
      }
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
