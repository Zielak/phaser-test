
import 'PIXI';
import 'p2';
import 'Phaser';

// import BootState from './states/Boot'
import SplashState from './states/Splash';
import GameState from './states/Game';

console.clear();

class Game extends Phaser.Game {

  constructor() {
    // let width = document.documentElement.clientWidth > 768 ? 768 : document.documentElement.clientWidth;
    // let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight;

    super(600, 600, Phaser.AUTO, 'content', null);

    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Splash');
  }

  create(){

    this.time.advancedTiming = true;
    this.time.desiredFps = 60;
    this.time.slowMotion = 1.0

  }
}

window.game = new Game();
