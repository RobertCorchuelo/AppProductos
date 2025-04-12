import { useCallback } from 'react';
import clickSound1 from '../assets/sounds/money.mp3';

const useResultsSound = () => {
    const playSound = useCallback(() => {
      const audio = new Audio(clickSound1);
      audio.play();
    }, []);
  
    return playSound;
  };


export default useResultsSound;