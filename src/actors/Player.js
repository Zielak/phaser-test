
import 'Phaser';

import SafeSpot from '../components/SafeSpot';
import Dash from '../components/Dash';


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

    this.game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);

    /**
     * Init input
     */
    this.input = this.game.input.keyboard.createCursorKeys();


    /**
     * Init variables
     */
    // Current speed, manipulated during play by eg. Dashing
    this.speed = 0;
    this.speedLerp = 0.2;

    // Maximum "walking" speed
    this.moveSpeed = 200;
    this.moveAngle = 0;
    this.deathCamTime = 0.7;

    // Input seetup
    // this._up = undefined;
    // this._down = undefined;
    // this._left = undefined;
    // this._right = undefined;
    // this._A = undefined;

    /**
     * DASHING
     */
    this.dash = new Dash();

    this.dash.onStartDash.add(()=>{
      // dashS.play();
      // foorstepsS.stop();

      // cast(FlxG.state, PlayState).flashHUD();
      // FlxG.camera.shake(0.01, 0.1);
    }, this);

    this.dash.onStopDash.add(()=>{
      this.speed = this.moveSpeed;
      
      this.body.velocity.x *= 0.2;
      this.body.velocity.y *= 0.2;
    }, this);




    this.safeSpot = new SafeSpot(this.position, 10);


    this.onVoid = false;


    this.setupKeys();

    return this;
  }

  setupKeys(){
    //  Register the keys.
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update(){

    if(this.alive && !this.reviving){

      this.dash.update( this.game.time.elapsed );
      this.updateKeys();
      this.updateMovement();
      this.updateSafeSpot();

    }

    // Reset this one every frame
    this.onVoid = false;

    return this;
  }

  updateSafeSpot(){

    if(!this.dash.active && !this.onVoid){

      if( Phaser.Point.distance( this.position, this.safeSpot.getLast() ) > 100) {
        this.safeSpot.add( new Phaser.Point(this.position.x, this.position.y) )
      }
    }
    return this;
  }

  updateMovement(){

    if( !this.dash.active && this._anyDir ){
      this.speed = this.moveSpeed;
    }

    // Move player forward, when dashing and not
    this.move();

    // Dash if we can
    if(this._A && !this.dash.active && this.dash.available &&
      (this._up || this._down || this._left || this._right)) {
      this.startDashing();
    }

    // Update animations
    // updateAnimation();

    /**
     * Position fixer
     */
    // if(!this.dash.active){
    //   x = Math.round( x );
    //   y = Math.round( y );
    // }

  }

  startDashing(){
    this.dash.start();

    this.speed = this.dash.speed;
  }




  /**
   * Update movement, move forward even when dashing
   * 
   * @memberOf Player
   */
  move() {

    if(!this.dash.active){

      if (this._up && this._down){
        this._up = this._down = false;
      }
      if (this._left && this._right){
        this._left = this._right = false;
      }

      if (this._up || this._down || this._left || this._right){

        if (this._up){
          this.moveAngle = -90;
          if (this._left){
            this.moveAngle -= 45;
          }
          else if (this._right){
            this.moveAngle += 45;
          }
        }
        else if (this._down){
          this.moveAngle = 90;
          if (this._left){
            this.moveAngle += 45;
          }
          else if (this._right){
            this.moveAngle -= 45;
          }
        }
        else if (this._left){
          this.moveAngle = -180;
        }
        else if (this._right){
          this.moveAngle = 0;
        }

        this.body.velocity.x = this.speed;
        this.body.velocity.y = 0;
        this.body.velocity.rotate(0, 0, this.moveAngle, true);
      }
      else{
        this.body.velocity = Phaser.Point.interpolate( this.body.velocity, {x:0, y:0}, this.speedLerp );
      }
    }
    else{
      this.body.velocity.setMagnitude( this.speed );
    }
  }

  updateKeys(){
    // if(!this.dash.active){
    //   this._up = this.input.up.isDown;
    //   this._down = this.input.down.isDown;
    //   this._left = this.input.left.isDown;
    //   this._right = this.input.right.isDown;

    //   this._A = this.game.input.keyboard.isDown( Phaser.KeyCode.SPACEBAR );
    // }
  }

  get _up(){ return this.upKey.isDown; }
  get _down(){ return this.downKey.isDown; }
  get _left(){ return this.leftKey.isDown; }
  get _right(){ return this.rightKey.isDown; }
  get _A(){ return this.spaceKey.isDown; }
  get _anyDir(){
    return this._up || this._down || this._left || this._right;
  }


}


