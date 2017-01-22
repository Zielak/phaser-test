
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


    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player'
    });

    this.game.add.existing(this.player);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  }

  // update() {}

  render () {
    this.game.debug.spriteInfo(this.player, 32, 32);
    this.game.debug.bodyInfo(this.player, 32, 128);
  }
}
