import React, { useCallback, useEffect, useState } from 'react';
import Input from './components/Input/Input';
import TodoList from './components/TodoList/TodoList';
import './App.scss';

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

function App(): JSX.Element {
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
    setTodoList((prevState) => {
      return prevState.filter((todo) => {
        return job.id !== todo.id;
      });
    });
  }, []);

  return (
    <div className="App">
      <h2>To do List</h2>
      <Input onClickAddButton={onClickAddButton} />
      <TodoList todoList={todoList} onClickDeleteButton={onClickDeleteButton} />
    </div>
  );
}

export default App;
