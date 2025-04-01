import React, { useEffect, useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((count) => count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>{counter} seconds have passed.</p>;
}
