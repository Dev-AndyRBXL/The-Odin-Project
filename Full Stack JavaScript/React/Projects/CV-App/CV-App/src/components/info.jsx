import React, { useState } from 'react';

function Info() {
  const [ids] = useState({
    schoolId: crypto.randomUUID(),
    titleId: crypto.randomUUID(),
    dateId: crypto.randomUUID(),
  });

  return (
    <fieldset className="info">
      <legend>Education Info</legend>
      <School id={ids.schoolId} />
      <Title id={ids.titleId} />
      <Date id={ids.dateId} />
    </fieldset>
  );
}

function School(props) {
  return (
    <p>
      <label htmlFor={props.id}>School</label>
      <input
        type="text"
        id={props.id}
        name="school"
        placeholder="Enter your school name"
        required
      />
    </p>
  );
}

function Title(props) {
  return (
    <p>
      <label htmlFor={props.id}>Title</label>
      <input
        type="text"
        id={props.id}
        name="title"
        placeholder="Enter your degree title"
        required
      />
    </p>
  );
}

function Date(props) {
  return (
    <p>
      <label htmlFor={props.id}>Graduation Date</label>
      <input
        type="date"
        id={props.id}
        name="date"
        required
      />
    </p>
  );
}

export default Info;
