
import 'Phaser';
import DG_Component from '../Component';
import Console from '../utils/Console';

var console = Object.create(Console);
console.init('InputPlayer');


var MOVE_AXIS_X = 0;
var MOVE_AXIS_Y = 0;

export default class InputPlayer extends DG_Component {

  constructor(){
    super(arguments[0]);

    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    this.dir = false;

    this.A = false;
    this.B = false;

    this.angle = 0;
    this.movePressed = false;


    this.moveStickX = 0;
    this.moveStickY = 0;

    this.setupKeys();
  }

  update(){
    this.up = this.upKey.isDown;
    this.down = this.downKey.isDown;
    this.left = this.leftKey.isDown;
    this.right = this.rightKey.isDown;

    this.A = this.AKey.isDown;
    this.B = this.BKey.isDown;


    if (this.up && this.down){
      this.up = this.down = false;
    }
    if (this.left && this.right){
      this.left = this.right = false;
    }

    this.movePressed = false;

    if (this.up || this.down || this.left || this.right){

      this.movePressed = true;

      if (this.up){
        this.angle = Math.PI*3 / 2;//-90;
        if (this.left){
          this.angle -= Math.PI/4;
        }
        else if (this.right){
          this.angle += Math.PI/4;
        }
      }
      else if (this.down){
        this.angle = Math.PI/2;//90;
        if (this.left){
          this.angle += Math.PI/4;
        }
        else if (this.right){
          this.angle -= Math.PI/4;
        }
      }
      else if (this.left){
        this.angle = -Math.PI;
      }
      else if (this.right){
        this.angle = 0;
      }

      console.log('move pressed!');

    }
    // else if( this._moveStick.length >= 0.15 ){
    //   movePressed = true;

    //   angle = Direction.angle2angle8( _moveStick.angle2D );
    // }
  }

  setupKeys(){
    //  Register the keys.
    this.leftKey  = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey    = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey  = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    this.AKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.BKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
  }

  get anyDir(){
    return this.up || this.down || this.left || this.right;
  }

}
