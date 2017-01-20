
import Component from '../Component';
import Console from '../utils/Console';

var console = Object.create(Console);
console.init('Walk');

export default class Walk extends Component {

  constructor(){
    super(arguments[0]);

      // speeds
    this.maxWalkSpeed = 200;

    this.accel_rate = 14.25;
    this.decel_rate = 42.75;

      // Temp speed for calculations
    this._speed = 0;
    this._angle = 0;

      // Angled running
    this.runAngleLerp = Math.PI*2;
    this._angleDistForward;
    this._angleDistBackward;
    this._endAngle;

  }

  onadded(){
    this._speed = this.entity.body.velocity.getMagnitude();

    if(this._speed > this.maxWalkSpeed){
      this._speed = this.maxWalkSpeed;
    }

    this._angle = this.entity.body.velocity.angle({x:0,y:0}, true);
  }


  update(elapsed){
    
    this.setSpeed(elapsed);

    this._angle = this.get('input').angle;

    this.entity.body.velocity.set( this._speed, 0 );

    // if(_angle != -1 && _speed > 0) angle = _angle;
    if( this._angle !== -1 && this._speed > 0){
      this.entity.body.velocity.rotate(0, 0, this._angle);
    }

  }


  setSpeed(dt){

    if( this.get('input').movePressed ){

      if( this._speed < this.maxWalkSpeed ){
        this._speed += this.maxWalkSpeed * this.accel_rate * dt;
      }

      if( this._speed > this.maxWalkSpeed ){
        this._speed = this.maxWalkSpeed;
      }
    }
    else{

      if( this._speed >= 1){
        this._speed -= this._speed * this.decel_rate * dt;
      }

      if( this._speed < 1 ){
        this._speed = 0;
      }
    }
  }

}

