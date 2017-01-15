
import 'Phaser';
import Player from '../actors/Player';

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack';
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText);
    banner.font = 'Bangers';
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player'
    });

    this.game.add.existing(this.player);
  }

  render () {
    this.game.debug.spriteInfo(this.player, 32, 32);
  }
}
