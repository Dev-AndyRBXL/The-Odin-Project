import { React, useState } from 'react';
import General from './components/general.jsx';
import Info from './components/info.jsx';
import Experience from './components/experience.jsx';
import './App.css';

function App() {
  const [generalData, setGeneralData] = useState({
    name: '',
    email: '',
    number: '',
  });
  const [infoData, setInfoData] = useState({ school: '', title: '', date: '' });
  const [experienceData, setExperienceData] = useState({
    company: '',
    position: '',
    date: '',
  });
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('Submitted:', { generalData, infoData, experienceData });
  };

  return (
    <>
      <main>
        <div className="container">
          <form action="#" onSubmit={handleSubmit}>
            <General />
            <Info />
            <Experience />
          </form>
          <button id="editButton">Edit</button>
          <button type="submit">Submit</button>
        </div>
      </main>
    </>
  );
}

export default App;
