import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/Home/Home';
import DetailTodo from './components/DetailTodo/DetailTodo';

const TO_DO_LIST_STORAGE = 'TodoList';

interface Job {
  id: string;
  name: string;
  description: string;
}

const loadLocalStorage = () => {
  const DataStorage = localStorage.getItem(TO_DO_LIST_STORAGE);
  let ListJobStorage: Job[];
  ListJobStorage = [];
  if (DataStorage) {
    ListJobStorage = JSON.parse(DataStorage);
  }
  return ListJobStorage;
};

function App() {
  const [todoList, setTodoList] = useState<Job[]>(loadLocalStorage);

  useEffect(() => {
    localStorage.setItem(TO_DO_LIST_STORAGE, JSON.stringify(todoList));
  }, [todoList]);

  const onClickAddButton = useCallback(
    (job: Job) => {
      setTodoList([...todoList, job]);
    },
    [todoList]
  );

  const onClickDeleteButton = useCallback((job: Job) => {
    setTodoList((prevState) => prevState.filter((todo) => todo.id !== job.id));
  }, []);

  const handleUpdateJob = useCallback((job: Job) => {
    setTodoList((prevState) =>
      prevState.map((todo) => (todo.id === job.id ? (todo = job) : todo))
    );
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
