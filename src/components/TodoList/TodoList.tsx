import * as React from 'react';
import Todo from '../Todo/Todo';
import './styleTodoList.scss';

interface Job {
  id: string;
  name: string;
  description: string;
}

interface propsTodoList {
  todoList: Job[];
  onClickDeleteButton: (job: Job) => void;
}

function TodoList({ todoList, onClickDeleteButton }: propsTodoList) {
  return (
    <div className="TodoList">
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          job={todo}
          onClickDeleteButton={onClickDeleteButton}
        />
      ))}
    </div>
  );
}

export default TodoList;
