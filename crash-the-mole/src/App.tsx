import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState<number | undefined>(undefined);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [isMoleUp, setIsMoleUp] = useState<boolean[]>(Array(16).fill(false));
  const [highScore, setHighScore] = useState<number | undefined>(undefined);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
  };

  const stopAndResetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(false);
    setIsMoleUp(Array(16).fill(false));
  };

  const handleMoleWhack = (index: number) => {
    if (gameActive && isMoleUp[index]) {
      setScore(score! + 1);
      setIsMoleUp(isMoleUp.map((mole, i) => i === index ? false : mole));
    }
  };

  useEffect(() => {
    if (!gameActive) return;

    const moleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 16);
      setIsMoleUp(isMoleUp.map((_, i) => i === randomIndex ? true : false));
    }, 800);

    return () => clearInterval(moleInterval);
  }, [gameActive, isMoleUp]);

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev! <= 1) {
          setGameActive(false);
          setHighScore(Math.max(score!, highScore!));
          clearInterval(timer);
          return 0;
        }
        return prev! - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, score, highScore]);


  return (
    <div className="App">
      <h1>Crash the Mole</h1>
      <div className="game-info">
        <div>Score: {score}</div>
        <div>Time: {timeLeft === undefined ? `0 s` : `${timeLeft} s`}</div>
        <div>High Score: {highScore!}</div>
      </div>
        <button onClick={gameActive ? stopAndResetGame : startGame} className="start-button">
          {gameActive ? 'Stop and Reset Game' : 'Start Game'}
        </button>
      <div className="mole-grid">
        {isMoleUp.map((isUp: boolean, index) => (
          <div 
            key={index} 
            className={`mole-hole ${isUp ? 'mole-up' : ''}`}
            onClick={() => handleMoleWhack(index)}
          >
            {isUp && <div className="mole"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
