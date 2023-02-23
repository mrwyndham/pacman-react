import { observable, action } from 'mobx';
import { Game } from './Game';
import { DebugState } from './DebugState';

export class Store {
  @observable
  game: Game = new Game(this);

  debugState = new DebugState(this);

  @action.bound
  resetGame() {
    window.localStorage.setItem('end', 'false');
    this.game = new Game(this);
    this.game.readyGameForPlay();
  }
}
