import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import './GameOver.css';
import { useGame } from '../../../components/StoreContext';
import { Message } from './Message';
import { TotalPacManDyingAnimationLength } from '../../../model/pacManDyingPhase';

export const TOTAL_TIME_TO_GAME_OVER_MESSAGE = TotalPacManDyingAnimationLength;

export const GameOver: FC<{ className?: string }> = observer(
  ({ className }) => {
    let count = 0;
    const game = useGame();
    const { pacMan } = game;
    const gameOverMessageVisible =
      game.gameOver && pacMan.timeSinceDeath >= TOTAL_TIME_TO_GAME_OVER_MESSAGE;

      if (gameOverMessageVisible) {
        const end = window.localStorage.getItem('end');   
        if (end == 'false') {
          const name = window.localStorage.getItem('name');  
          const data = {"hsname":name,"score":game.score};
          fetch(`https://hsapi.azurewebsites.net/UpdateList?json=${JSON.stringify(data)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'text/plain'
            },
            body: ''
          })
          window.localStorage.setItem('end', 'true');
          window.localStorage.setItem('name', '');
        }
      }

    return gameOverMessageVisible ? <Message text="Game Over" /> : null;
  }
);
