
import 'Phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() { }

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([ this.loaderBg, this.loaderBar ]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.image('player', 'assets/player_test.gif');


    /**
     * MAPS
     */
    this.load.tilemap('t_first', 'assets/maps/t_first.json', null, Phaser.Tilemap.TILED_JSON);

    /**
     * TILESETS
     */
    this.load.image('_tileset', 'assets/tilesets/_tileset.gif');
  }

  create() {
    this.state.start('Game');
  }

}
