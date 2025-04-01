import React from 'react';

function TodoList({ className = 'list', todos, setTodos }) {
  return (
    <>
      {!todos.length && <span>Your Todo is Empty! &#128526;</span>}
      <ul className={className}>
        {todos.map((todo) => {
          return <Item key={todo.id} todo={todo} setTodos={setTodos} />;
        })}
      </ul>
    </>
  );
}

function Item({ todo, setTodos }) {
  const toggleItem = (id, completed) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <li className="item" id={todo.id}>
      <label htmlFor="todo">{todo.title}</label>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(ev) => {
          toggleItem(todo.id, ev.target.checked);
        }}
        className="checkbox"
        name="todo"
      />
      <button
        onClick={() => {
          deleteTodo(todo.id);
        }}
        className="del-btn"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoList;
