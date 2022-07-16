import * as React from 'react';
import Todo from '../Todo/Todo';
import './styleTodoList.scss';

interface Job {
  id: string;
  name: string;
}

interface propsTodoList {
  todoList: Job[];
  onClickDelBtn: object;
}

function TodoList({ todoList, onClickDelBtn }: propsTodoList) {
  return (
    <div className="TodoList">
      {todoList.map((todo) => (
        <Todo key={todo.id} job={todo} onClickDelBtn={onClickDelBtn} />
      ))}
    </div>
  );
}

export default TodoList;
