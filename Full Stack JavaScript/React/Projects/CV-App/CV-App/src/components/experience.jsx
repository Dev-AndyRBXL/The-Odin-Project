import React, { useState } from 'react';

function Experience() {
  const [ids] = useState({
    companyId: crypto.randomUUID(),
    positionId: crypto.randomUUID(),
    dateId: crypto.randomUUID(),
  });

  return (
    <fieldset className="experience">
      <legend>Work Experience</legend>
      <Company id={ids.companyId} />
      <Position id={ids.positionId} />
      <Date id={ids.dateId} />
    </fieldset>
  );
}

function Company(props) {
  return (
    <p>
      <label htmlFor={props.id}>Company</label>
      <input
        type="text"
        id={props.id}
        name="company"
        placeholder="Company"
        required
      />
    </p>
  );
}

function Position(props) {
  return (
    <p>
      <label htmlFor={props.id}>Position</label>
      <input
        type="text"
        id={props.id}
        name="position"
        placeholder="Position"
        required
      />
    </p>
  );
}

function Date(props) {
  return (
    <p>
      <label htmlFor={props.id}>Dates (mm-dd-yy to mm-dd-yy)</label>
      <input
        type="text"
        id={props.id}
        name="date"
        placeholder="[mm-dd-yy] to [mm-dd-yy]"
        required
      />
    </p>
  );
}

export default Experience;
