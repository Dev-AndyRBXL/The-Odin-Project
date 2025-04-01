import React from 'react';

function Form(props) {
  const handleSubmit = (ev) => {
    ev.preventDefault();

    props.setTodos((todos) => [
      ...todos,
      { id: crypto.randomUUID(), title: props.item, completed: false },
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className={props.className}>
      <Row item={props.item} setItem={props.setItem} />
      <button type="submit">Add</button>
    </form>
  );
}

function Row(props) {
  return (
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input
        value={props.item}
        onChange={(ev) => {
          props.setItem(ev.target.value);
        }}
        type="text"
        name="item"
        id="item"
        tabIndex={0}
      />
    </div>
  );
}

export default Form;
