import { useEffect } from 'react';
import backgroundSound from '../assets/sounds/sonidoFondo.mp3';

const BackgroundAudio = () => {
  useEffect(() => {
    const audio = new Audio(backgroundSound);
    audio.loop = true;
    audio.volume = 0.05;

    let hasPlayed = false;

    const tryPlay = () => {
      if (!hasPlayed) {
        audio.play();
        hasPlayed = true;
        window.removeEventListener('click', tryPlay);
      }
    };

    audio.play().catch(() => {
      console.log("Autoplay bloqueado, esperando interacción...");
      window.addEventListener('click', tryPlay);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener('click', tryPlay);
    };
  }, []);

  return null; // No renderiza nada visual
};

export default BackgroundAudio;
