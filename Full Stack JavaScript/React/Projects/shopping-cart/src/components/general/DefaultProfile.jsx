import React, { useState, useEffect } from 'react';

export default function DefaultProfile() {
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const response = await fetch(
          'https://api.giphy.com/v1/gifs/search?api_key=Aw3gWB8hNrTYLwATQDaP47cBQj9yZHv1&q=sad+cat&limit=10'
        );
        if (!response.ok) throw new Error('Error fetching the GIF');
  
        const data = await response.json();
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
    <>
      <p>
        Uh Oh... The category doesn't exist! <br /> Sorry for any
        incovenience :(
      </p>
      <img src={gifUrl} alt="GIF" />
    </>
  );
}
