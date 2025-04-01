import { useState } from 'react';
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [item, setItem] = useState('');
  const [todos, setTodos] = useState(
    localStorage.getItem('ITEMS')
      ? JSON.parse(localStorage.getItem('ITEMS'))
      : []
  );

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <Form
        className="new-item-form"
        item={item}
        setItem={setItem}
        setTodos={setTodos}
      />
      <h1>Todo</h1>
      <TodoList className="list" todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
