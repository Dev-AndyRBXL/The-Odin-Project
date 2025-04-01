import React, { useState } from 'react';

function General() {
  const [ids] = useState({
    nameId: crypto.randomUUID(),
    emailId: crypto.randomUUID(),
    numberId: crypto.randomUUID(),
  });

  return (
    <fieldset className="general">
      <legend>General</legend>
      <Name id={ids.nameId} />
      <Email id={ids.emailId} />
      <Number id={ids.numberId} />
    </fieldset>
  );
}

function Name(props) {
  return (
    <p>
      <label htmlFor={props.id}>Name</label>
      <input
        type="text"
        id={props.id}
        name="name"
        placeholder="Enter your name"
        required
      />
    </p>
  );
}

function Email(props) {
  return (
    <p>
      <label htmlFor={props.id}>Email</label>
      <input
        type="email"
        id={props.id}
        name="email"
        placeholder="Enter your email"
        required
      />
    </p>
  );
}

function Number(props) {
  return (
    <p>
      <label htmlFor={props.id}>Telephone</label>
      <input
        type="tel"
        id={props.id}
        name="telephone"
        placeholder="Enter your phone number"
        required
      />
    </p>
  );
}

export default General;
