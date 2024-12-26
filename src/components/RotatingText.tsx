import React, { useState, useEffect } from 'react';

const words = [
  'Hip Hop',
  'Christmas',
  'Billie Eilish',
  'Soundtrack',
  'Taylor Swift',
];

const RotatingText: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex(prev => (prev === words.length - 1 ? 0 : prev + 1));
        setIsAnimating(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className='rotating-text'>
      <p>Find the latest trends in music</p>
      <p className='words-wrapper'>
        {words.map((word, index) => (
          <span
            key={word}
            className={`word ${index === currentWordIndex ? 'visible' : ''} ${
              isAnimating ? 'animating' : ''
            }`}>
            {word.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className='letter'
                style={{
                  animationDelay: `${letterIndex * 0.08}s`,
                }}>
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
};

export default RotatingText;
