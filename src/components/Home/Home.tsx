import Input from '../Input/Input';
import TodoList from '../TodoList/TodoList';

interface Job {
  id: string;
  name: string;
  description: string;
}

interface propsHome {
  ListJob: Job[];
  onClickAddButton: (job: Job) => void;
  onClickDeleteButton: (job: Job) => void;
}

function Home({ ListJob, onClickAddButton, onClickDeleteButton }: propsHome) {
  return (
    <div className="Home">
      <h2>TO DO LIST</h2>
      <Input onClickAddButton={onClickAddButton} />
      <TodoList todoList={ListJob} onClickDeleteButton={onClickDeleteButton} />
    </div>
  );
}

export default Home;
