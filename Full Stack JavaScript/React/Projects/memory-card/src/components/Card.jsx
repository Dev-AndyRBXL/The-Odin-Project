import React from 'react';

export default function Card({ gif, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className="card bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
    >
      <img
        className="w-full h-48 object-cover"
        src={gif.src}
        alt={`Gif ${gif.id}`}
      />
      <p className="p-4 text-sm text-center">
        Click to play
      </p>
    </div>
  );
}