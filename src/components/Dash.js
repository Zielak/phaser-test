
import Component from '../Component';
import Console from '../utils/Console';

var console = Object.create(Console);
console.init('Dash');

export default class Dash extends Component{
  
  constructor(){
    super(arguments[0]);

    // old "dashing" property
    this.active = false;
    // old "canDash" property
    this.available = true;

    // How fast you go while dashing
    this.speed = 750;


    // Current timer for dashing
    this.time = 0;

    // How long can you dash
    this.maxDashTime = 0.18 * 1000;

    // Added when you keep holding dash key
    this.timeMore = 0.01 * 1000;

    this.addedMoreTime = false;



    // Current cooldown of dashing
    this.cooldown = 0;

    // Maximum time for dash regeneration
    this.maxCD = 1000;




    // Prevent getting stuck by counting bounce times
    this.bounceCount = 0;



    // Time spent while dashing (in air), resets upon landing
    this.timeSpent = 0;
    

    // Log every dash to prevent looping
    this.dashLog = [];

    // Signals
    this.onStartDash = new Phaser.Signal();
    this.onStopDash = new Phaser.Signal();
  }


  update(elapsed){
    let input = this.get('input');
    // Dash if we can
    if(input.A && !this.dash.active && this.dash.available &&
      (input.up || input.down || input.left || input.right)) {
      this.startDashing();
    }

    // console.log('elapsed: ',elapsed);

    // Analytics?
    if(this.active){
      this.timeSpent += elapsed;
    }

    /**
     * Dashing cooldowns
     */
    if(this.cooldown >= 0){
      this.cooldown -= elapsed;
    }
    else if(this.cooldown < 0 && !this.available){
      this.reset();
    }

    // Keeps dashing speed until duration is over
    if( this.active ){
      if( this.time > 0 ){
        this.time -= elapsed;
        // if( this.stopDashtimeLeft <= 0 && _A && !this.dashaddedMoreTime ){
        //   this.stopDashtimeLeft += this.stopDashtimeMore;
        //   this.dashaddedMoreTime = true;
        //   // trace("added more time for dash");
        // }
      }
      else {
        this.stop();
      }
    }
  }

  start(){

    console.log('start()');

    this.active = true;
    this.available = false;
    this.addedMoreTime = false;
    this.time = this.maxDashTime;
    this.cooldown = this.maxCD;

    this.onStartDash.dispatch();

    return this;
  }

  stop(){

    console.log('stop()');

    this.active = false;
    this.time = 0;
    this.timeSpent = 0;
    this.bounceCount = 0;
    this.dashLog = [];

    this.onStopDash.dispatch();

    return this;
  }

  reset(){

    console.log('reset()');

    this.cooldown = 0;
    this.available = true;
  }

}
