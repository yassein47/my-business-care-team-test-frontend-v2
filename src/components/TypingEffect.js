
import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(prevText => prevText + text[index]);
      index += 1;
      if (index === text.length-1) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId); 
  }, [text, speed]);

  return (
    <div>
      <p>{displayedText}</p>
    </div>
  );
};

export default TypingEffect;
