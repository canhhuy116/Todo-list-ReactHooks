import React, { useCallback, useEffect, useState } from 'react';
import Input from './components/Input/Input';
import TodoList from './components/TodoList/TodoList';
import './App.scss';
import { v4 } from 'uuid';

const TO_DO_LIST_STORAGE = 'TodoList';

interface Job {
  id: string;
  name: string;
}

function App(): JSX.Element {
  let a: string | null;
  a = null;

  const [todoList, setTodoList] = useState<Job[]>([]);

  useEffect(() => {
    const ListStorage = localStorage.getItem(TO_DO_LIST_STORAGE);
    if (ListStorage) {
      console.log(JSON.parse(ListStorage));
      setTodoList(JSON.parse(ListStorage));
    }
  }, []);

  useEffect(() => {
    console.log('123');
    localStorage.setItem(TO_DO_LIST_STORAGE, JSON.stringify(todoList));
  }, [todoList]);

  const onListChangeCB = useCallback(
    (name: string) => {
      setTodoList([...todoList, { id: v4(), name }]);
    },
    [todoList]
  );

  const onClickDelBtn = useCallback((job: Job) => {
    setTodoList((prevState) => {
      return prevState.filter((todo) => {
        return job.id !== todo.id;
      });
    });
  }, []);

  return (
    <div className="App">
      <h1>{a}</h1>
      <h2>To do List</h2>
      <Input onListChange={onListChangeCB} />
      <TodoList todoList={todoList} onClickDelBtn={onClickDelBtn} />
    </div>
  );
}

export default App;
