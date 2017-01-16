
export default class Dash {
  
  constructor(){
    // old "dashing" property
    this.active = false;
    // old "canDash" property
    this.available = true;

    // How fast you go while dashing
    this.speed = 750;

    // Current cooldown of dashing
    this.cooldown = 0;

    // How long can you dash
    this.time = 0.18;

    // Added when you keep holding dash key
    this.timeMore = 0.01;

    this.addedMoreTime = false;

    // How long can you dash?
    this.timeLeft = 0;

    this.maxCD = 1;
    this.regenCD = 1;

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

    if (game.time.now > bulletTime){
      bullet = bullets.getFirstExists(false);

      if (bullet){
        bullet.reset(sprite.x + 6, sprite.y - 8);
        bullet.body.velocity.y = -300;
        bulletTime = game.time.now + 250;
      }
    }

    // Analytics?
    if(this.active){
      this.timeSpent += elapsed;
    }

    /**
     * Dashing cooldowns
     */
    if(this.cooldown > 0){
      this.cooldown -= this.regenCD * elapsed;
    }
    else if(this.cooldown < 0){
      this.cooldown = 0;
      this.available = true;
    }

    // Keeps dashing speed until duration is over
    if( this.active ){
      if( this.timeLeft > 0 ){
        this.timeLeft -= elapsed;

        // if( this.dashtimeLeft <= 0 && _A && !this.dashaddedMoreTime ){
        //   this.dashtimeLeft += this.dashtimeMore;
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

    this.active = true;
    this.available = false;
    this.addedMoreTime = false;
    this.cooldown = this.maxCD;
    this.timeLeft = this.time;

    this.onStartDash.dispatch();

    return this;
  }

  stop(){

    this.active = false;
    this.timeSpent = 0;
    this.bounceCount = 0;
    this.dashLog = [];

    this.onStopDash.dispatch();

    return this;
  }

}
