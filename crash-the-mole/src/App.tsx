import { useEffect, useState } from 'react';
import "./App.css";

function App() {
  const [grid, setGrid] = useState<boolean[]>(Array(16).fill(false));
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameSpeed, setGameSpeed] = useState<number>(1000);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('moleHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    let timer: number;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);


  useEffect(() => {
    let moleInterval:number;
    if (gameActive) {
      moleInterval = setInterval(() => {
        const newGrid = Array(16).fill(false);
        const randomIndex = Math.floor(Math.random() * 16);
        newGrid[randomIndex] = true;
        setGrid(newGrid);
        // increase game speed while time is ends
        if (timeLeft < 10 && gameSpeed > 500) {
          setGameSpeed(500);
        } else if (timeLeft < 20 && gameSpeed > 750) {
          setGameSpeed(750);
        }
      }, gameSpeed);
    }
    return () => clearInterval(moleInterval);
  }, [gameActive, gameSpeed, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameSpeed(1000);
    setGameActive(true);
  };

  const endGame = () => {
    setGameActive(false);
    setGrid(Array(16).fill(false));

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('moleHighScore', score.toString());
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameSpeed(1000);
    setGameActive(false);
    setHighScore(0);
  };

  const handleMoleWhack = (index: number) => {
    if (gameActive && grid[index]) {

      const newGrid = [...grid];
      newGrid[index] = false;
      setGrid(newGrid);
      setScore(score + 1);
    }
  };

  return (
    <div className='container'>
      <h1>Crash the Mole!</h1>
      <div className='infoContainer'>
        <div className='infoBox'>
          <h3>Time Left: {timeLeft}s</h3>
        </div>
        <div className='infoBox'>
          <h3>Score: {score}</h3>
        </div>
        <div className='infoBox'>
          <h3>High Score: {highScore}</h3>
        </div>
      </div>
      <div className='grid'>
        {grid.map((hasMole, index) => (
          <div 
            key={index} 
            className={hasMole ? 'moleCell' : 'emptyCell'}
            onClick={() => handleMoleWhack(index)}
          >
            {hasMole && <div className='mole'>🐹</div>}
          </div>
        ))}
      </div>
      {!gameActive && (
        <button className='startButton' onClick={startGame}>
          {score === 0 ? 'Start Game' : 'Play Again'}
        </button>
      )}
      {!gameActive && timeLeft < 30 && (
        <button className='resetButton' onClick={resetGame}>
          Reset Game
        </button>
      )}
      {gameActive && (
        <button className='endButton' onClick={endGame}>
          End Game
        </button>
      )}
    </div>
  );
}

export default App
