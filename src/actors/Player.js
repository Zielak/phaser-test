
import 'Phaser';

import SafeSpot from '../components/SafeSpot';
import Dash from '../components/Dash';
import Walk from '../components/Walk';
import Components from '../Components';
import InputPlayer from '../components/InputPlayer';

export default class Player extends Phaser.Sprite {

  /**
   * Creates an instance of Player.
   * 
   * @param {Phaser.Game} game
   * @param {any} x
   * @param {any} y
   * @param {String} asset
   * 
   * @memberOf Player
   */
  constructor( { game, x, y, asset } ){

    super( game, x, y, asset );

    this.game = game;

    this.anchor.setTo(0.5);

    /**
     * Init variables
     */
    this._components = new Components(this);
    
    this.input = new InputPlayer({
      game: this.game,
      name: 'input',
    });
    this._components.add(this.input);

    this.walk = new Walk({
      game: this.game,
      name: 'walk',
    });
    this._components.add(this.walk);

    this.dash = new Dash({
      game: this.game,
      name: 'dash',
    });
    this._components.add(this.dash);

    this.dash.onStartDash.add(()=>{
      // dashS.play();
      // foorstepsS.stop();

      // cast(FlxG.state, PlayState).flashHUD();
      // FlxG.camera.shake(0.01, 0.1);
    }, this);

    this.dash.onStopDash.add(()=>{
      // this.speed = this.moveSpeed;
      
      // this.body.velocity.x *= 0.2;
      // this.body.velocity.y *= 0.2;
    }, this);




    this.safeSpot = new SafeSpot(this.position, 10);


    this.onVoid = false;



    return this;
  }

  update(){

    this._components.update();

    if(this.alive && !this.reviving){

      this.updateSafeSpot();

    }

    // Reset this one every frame
    this.onVoid = false;
  }

  updateSafeSpot(){

    if(!this.dash.active && !this.onVoid){

      if( Phaser.Point.distance( this.position, this.safeSpot.getLast() ) > 100) {
        this.safeSpot.add( new Phaser.Point(this.position.x, this.position.y) )
      }
    }
    return this;
  }


  startDashing(){
    this.dash.start();

    this.speed = this.dash.speed;
  }



  updateKeys(){
    // if(!this.dash.active && this.components.has('input')){
    //   this.input.update();
    // }
  }


}


