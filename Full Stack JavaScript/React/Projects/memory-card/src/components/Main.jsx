import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function Main() {
  const [gifs, setGifs] = useState([]);
  const [shuffledGifs, setShuffledGifs] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedGifs, setClickedGifs] = useState(new Set());

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const apiKey = 'Aw3gWB8hNrTYLwATQDaP47cBQj9yZHv1';
        const numberOfGifs = 12;
        const gifPromises = Array(numberOfGifs).fill().map(async () => {
          try {
            const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=g`);
            if (!res.ok) {
              return {
                src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEXd3d3////Z2dnw8PBTU1NPT09dXV23t7dDQ0Pl5eXo6Oi8vLzg4OBJSUmSkpLDw8PR0dGHh4enp6fJyck9PT1zc3N7e3uZmZlra2tiYmKBgYGwsLCgoKAvLy83NzcpKSldZcsRAAADQklEQVR4nO3b63ajIBQFYAZRUMFLjOZim3n/t5wDXmJtJ5e1Zq14MvtrmkaTH+wgCGiFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/5u9QdhXl+4psrypeXX5npFqZZwZH+MTPbvx1f5YpXxqJ9VJHCt60O+Kop2urehQk68u5YPGMC5ehVFerExbpXxajg+j4mTt5NMkp0R1jawqTjWj3EeZrzgKU5c6789d1+acasaUkU2XsszQQXaIbFQmxu01qzB59vVIsuk+hJFpflL0NvXgLyrfU34OI8YwIs3VxXzmURalqdx8/dwJY5tDcSiKw6HYpa8p4DNuh5H+iMuys6M+mn2Y4QRjO/rIcf2RDVqECQPLaXcIkw0bQ5ho+f42TWGE77Cu3/0YJuywFCY2x1Ruvkubw9j+4kySjy0j3dMQILSZQMos/3Qu1tnLCvqIaxi9j91pDmNoXDCHoeFZVl6US/S2e4FrmNyoeApj7RBG+EFmGGhm/m0+YbSj0k5hfJtRUwdAWWSmWYWhr97NYbILhWnpdBn40+bZcQpDNeNO5bIDiM0CDaN5hYnnMKFm1jiF+TR7Nfdmv82Kn4uyCSPKtuvqZurNaONM87LRmX44tZlgPsXL5ZYUliY2nHqzMDa77l8vBkbMwnyzGIrRcIbRYXZvDMlqBIAwW4MwW/XeYdbT/HGbZ5jvcQKeYWy6WHa+5uIZpmrKsplUczVxDGPloV04SN5hare4flZPYSTTMMu5ZSGHkbTlF8ZS05e1cf7Ss2dcLYZOgF0Y6y9fFMXHbrfr+93gwy/NhFsBmIURNk+cU5rqx469s9XKxadwRZNdmPIYx6oPvbH0hNWJX37iGEZQzVAYu5hh9sq5JPevWIXxr5tz23baryxPcTSda86+zfDqAMKQLBxby8GZrPwu3z3zWQNw44KGHYNcj7N5T6a5hAkrml9vM5ulw46s3DMJ43pR/YUc/4qeS5uJu/qujsta8/d7zX7A5SrAgxiEUcOo8gFGbTyMbYonlJu+q2GYrsiHvbq8940TsNu+3I3CHpt7aAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOBfevw/RLdPRG9E/HojbxXmD7+hTLo1IdsNAAAAAElFTkSuQmCC',
                id: Math.random().toString()
              };
            }
            const data = await res.json();
            return {
              src: data.data.images.original.url,
              id: data.data.id
            };
          } catch {
            return {
              src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEXd3d3////Z2dnw8PBTU1NPT09dXV23t7dDQ0Pl5eXo6Oi8vLzg4OBJSUmSkpLDw8PR0dGHh4enp6fJyck9PT1zc3N7e3uZmZlra2tiYmKBgYGwsLCgoKAvLy83NzcpKSldZcsRAAADQklEQVR4nO3b63ajIBQFYAZRUMFLjOZim3n/t5wDXmJtJ5e1Zq14MvtrmkaTH+wgCGiFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/5u9QdhXl+4psrypeXX5npFqZZwZH+MTPbvx1f5YpXxqJ9VJHCt60O+Kop2urehQk68u5YPGMC5ehVFerExbpXxajg+j4mTt5NMkp0R1jawqTjWj3EeZrzgKU5c6789d1+acasaUkU2XsszQQXaIbFQmxu01qzB59vVIsuk+hJFpflL0NvXgLyrfU34OI8YwIs3VxXzmURalqdx8/dwJY5tDcSiKw6HYpa8p4DNuh5H+iMuys6M+mn2Y4QRjO/rIcf2RDVqECQPLaXcIkw0bQ5ho+f42TWGE77Cu3/0YJuywFCY2x1Ruvkubw9j+4kySjy0j3dMQILSZQMos/3Qu1tnLCvqIaxi9j91pDmNoXDCHoeFZVl6US/S2e4FrmNyoeApj7RBG+EFmGGhm/m0+YbSj0k5hfJtRUwdAWWSmWYWhr97NYbILhWnpdBn40+bZcQpDNeNO5bIDiM0CDaN5hYnnMKFm1jiF+TR7Nfdmv82Kn4uyCSPKtuvqZurNaONM87LRmX44tZlgPsXL5ZYUliY2nHqzMDa77l8vBkbMwnyzGIrRcIbRYXZvDMlqBIAwW4MwW/XeYdbT/HGbZ5jvcQKeYWy6WHa+5uIZpmrKsplUczVxDGPloV04SN5hare4flZPYSTTMMu5ZSGHkbTlF8ZS05e1cf7Ss2dcLYZOgF0Y6y9fFMXHbrfr+93gwy/NhFsBmIURNk+cU5rqx469s9XKxadwRZNdmPIYx6oPvbH0hNWJX37iGEZQzVAYu5hh9sq5JPevWIXxr5tz23baryxPcTSda86+zfDqAMKQLBxby8GZrPwu3z3zWQNw44KGHYNcj7N5T6a5hAkrml9vM5ulw46s3DMJ43pR/YUc/4qeS5uJu/qujsta8/d7zX7A5SrAgxiEUcOo8gFGbTyMbYonlJu+q2GYrsiHvbq8940TsNu+3I3CHpt7aAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOBfevw/RLdPRG9E/HojbxXmD7+hTLo1IdsNAAAAAElFTkSuQmCC',
              id: Math.random().toString()
            };
          }
        });

        const fetchedGifs = await Promise.all(gifPromises);
        setGifs(fetchedGifs);
        setShuffledGifs(shuffleArray(fetchedGifs));
      } catch {
        const placeholderGifs = Array(12).fill().map((_, index) => ({
          src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEXd3d3////Z2dnw8PBTU1NPT09dXV23t7dDQ0Pl5eXo6Oi8vLzg4OBJSUmSkpLDw8PR0dGHh4enp6fJyck9PT1zc3N7e3uZmZlra2tiYmKBgYGwsLCgoKAvLy83NzcpKSldZcsRAAADQklEQVR4nO3b63ajIBQFYAZRUMFLjOZim3n/t5wDXmJtJ5e1Zq14MvtrmkaTH+wgCGiFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/5u9QdhXl+4psrypeXX5npFqZZwZH+MTPbvx1f5YpXxqJ9VJHCt60O+Kop2urehQk68u5YPGMC5ehVFerExbpXxajg+j4mTt5NMkp0R1jawqTjWj3EeZrzgKU5c6789d1+acasaUkU2XsszQQXaIbFQmxu01qzB59vVIsuk+hJFpflL0NvXgLyrfU34OI8YwIs3VxXzmURalqdx8/dwJY5tDcSiKw6HYpa8p4DNuh5H+iMuys6M+mn2Y4QRjO/rIcf2RDVqECQPLaXcIkw0bQ5ho+f42TWGE77Cu3/0YJuywFCY2x1Ruvkubw9j+4kySjy0j3dMQILSZQMos/3Qu1tnLCvqIaxi9j91pDmNoXDCHoeFZVl6US/S2e4FrmNyoeApj7RBG+EFmGGhm/m0+YbSj0k5hfJtRUwdAWWSmWYWhr97NYbILhWnpdBn40+bZcQpDNeNO5bIDiM0CDaN5hYnnMKFm1jiF+TR7Nfdmv82Kn4uyCSPKtuvqZurNaONM87LRmX44tZlgPsXL5ZYUliY2nHqzMDa77l8vBkbMwnyzGIrRcIbRYXZvDMlqBIAwW4MwW/XeYdbT/HGbZ5jvcQKeYWy6WHa+5uIZpmrKsplUczVxDGPloV04SN5hare4flZPYSTTMMu5ZSGHkbTlF8ZS05e1cf7Ss2dcLYZOgF0Y6y9fFMXHbrfr+93gwy/NhFsBmIURNk+cU5rqx469s9XKxadwRZNdmPIYx6oPvbH0hNWJX37iGEZQzVAYu5hh9sq5JPevWIXxr5tz23baryxPcTSda86+zfDqAMKQLBxby8GZrPwu3z3zWQNw44KGHYNcj7N5T6a5hAkrml9vM5ulw46s3DMJ43pR/YUc/4qeS5uJu/qujsta8/d7zX7A5SrAgxiEUcOo8gFGbTyMbYonlJu+q2GYrsiHvbq8940TsNu+3I3CHpt7aAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOBfevw/RLdPRG9E/HojbxXmD7+hTLo1IdsNAAAAAElFTkSuQmCC',
          id: `placeholder-${index}`
        }));
        setGifs(placeholderGifs);
        setShuffledGifs(shuffleArray(placeholderGifs));
      }
    };

    fetchGifs();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleCardClick = (gif) => {
    if (clickedGifs.has(gif.id)) {
      setScore(0);
      setClickedGifs(new Set());
    } else {
      const newClickedGifs = new Set(clickedGifs);
      newClickedGifs.add(gif.id);
      setClickedGifs(newClickedGifs);

      const newScore = score + 1;
      setScore(newScore);
     
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }

    setShuffledGifs(shuffleArray([...gifs]));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-6">
        <div className="score">Current Score: {score}</div>
        <div className="best-score">Best Score: {bestScore}</div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {shuffledGifs.map((gif) => (
          <Card
            key={gif.id}
            gif={gif}
            onClick={() => handleCardClick(gif)}
          />
        ))}
      </div>
    </main>
  );
}
