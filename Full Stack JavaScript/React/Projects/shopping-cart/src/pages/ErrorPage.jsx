import React, { useState, useEffect } from 'react';
import '../styles/general/Error.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const response = await fetch(
          'https://api.giphy.com/v1/gifs/search?api_key=Aw3gWB8hNrTYLwATQDaP47cBQj9yZHv1&q=Error+404&limit=10'
        );
        if (!response.ok) throw new Error('Error fetching the GIF');

        const data = await response.json();
        console.log(data);

        if (!data.data.length) throw new Error('GIF Not Found!');
        const randomIndex = Math.floor(Math.random() * data.data.length);
        setGifUrl(data.data[randomIndex].images.original.url);
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    };

    fetchGif();
  }, []);

  return (
    <div className="container">
      <h1>Error 404</h1>

      <img className="gif" src={gifUrl} alt="GIF: Error 404" />

      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;
