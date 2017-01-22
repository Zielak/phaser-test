
import 'Phaser';
import Component from '../Component';
import Console from '../utils/Console';

var console = Object.create(Console);
console.init('PlayerAnimations');

export default class PlayerAnimations extends Component {

  constructor(){
    super(arguments[0]);


    let legs_anim_json = `{
      "idle" : {
        "frame_size":{ "x":"16", "y":"16" },
        "frameset": ["18"],
          "loop": "true"
      },
      "walk" : {
        "frame_size":{ "x":"16", "y":"16" },
        "frameset": ["19-20"],
          "loop": "true",
            "speed": "5"
      },
      "jump" : {
        "frame_size":{ "x":"16", "y":"16" },
        "frameset": ["21"],
          "loop": "true"
      },
      "grab" : {
        "frame_size":{ "x":"16", "y":"16" },
        "frameset": ["22"],
          "loop": "true"
      },
      "walk_grab" : {
        "frame_size":{ "x":"16", "y":"16" },
        "frameset": ["23-24"],
          "loop": "true",
            "speed": "10"
      },
      "test" : {
        "frame_size":{ "x":"16", "y":"16" },
        "frameset": ["18-24"],
          "loop": "true",
            "speed": "4"
      }
    }`;

    let head_anim_json = `{
      "test": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["1-17"],
        "loop": "true",
        "speed": "24"
      },
      "idle": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["1"],
        "loop": "true"
      },
      "walk_d": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["2-3"],
        "loop": "true",
        "speed": "10"
      },
      "walk_dr": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["4-5"],
        "loop": "true",
        "speed": "10"
      },
      "walk_r": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["6-7"],
        "loop": "true",
        "speed": "10"
      },
      "walk_ur": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["8-9"],
        "loop": "true",
        "speed": "10"
      },
      "walk_u": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["10-11"],
        "loop": "true",
        "speed": "10"
      },
      "walk_ul": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["12-13"],
        "loop": "true",
        "speed": "10"
      },
      "walk_l": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["14-15"],
        "loop": "true",
        "speed": "10"
      },
      "walk_dl": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["16-17"],
        "loop": "true",
        "speed": "10"
      },
      "dashing": {
        "frame_size": { "x": "16", "y": "16" },
        "frameset": ["35"],
        "loop": "true"
      }
    }`;
    
    
    this.legs_sprite = new Phaser.Sprite({
      game: this.entity.game,
      x: 0,
      y: 0,
      asset: 'player'
    });
    this.addChild(this.legs);

    this.legs_sprite.animations.updateFrameData()


    this.head_sprite = new Phaser.Sprite({
      game: this.entity.game,
      x: 0,
      y: 0,
      asset: 'player'
    });
    this.addChild(this.head_sprite);


  }

  onadded(){
    this.initEvents();
  }

  onremoved(){
    this.forgetEvents();
  }


  initEvents(){
    // actor.events.listen('dash.start', ()=>{
    //   legs_sprite.visible = false;
    //   head_anim.animation = 'dashing';
    // });

    // actor.events.listen('dash.stop', ()=>{
    //   legs_sprite.visible = true;
    //   legs_back_to_normal();
    //   head_anim.animation = 'walk_d';
    // });



    // actor.events.listen('stomp.start', ()=>{
    //   legs_sprite.visible = false;
    //   head_anim.animation = 'dashing';
    // });

    // actor.events.listen('stomp.stop', ()=>{
    //   legs_sprite.visible = true;
    //   legs_back_to_normal();
    //   head_anim.animation = 'walk_d';
    // });
  }

  forgetEvents(){

  }

  legs_back_to_normal(){

    if( this.entity.body.velocity.getMagnitude() > 1 ){
      legs_anim.animation = 'walk';
    }
    else{
      legs_anim.animation = 'idle';
    }
    legs_anim.play();
  }

  legs_start_walking(){

    if( this.entity.body.velocity.getMagnitude() >= 1
    && legs_anim.animation !== 'walk' ){
      legs_anim.animation = 'walk';
    }
    else if ( this.entity.body.velocity.getMagnitude() < 1
    && legs_anim.animation !== 'idle' ){
      legs_anim.animation = 'idle';
    }
  }
  


  update(){
    // Update Y position
    this.legs_sprite.pos.y = - this.entity.z + this.entity.size.x/2;
    this.head_sprite.pos.y = - this.entity.z + this.entity.size.y/2;

    // Frames
    if( this.get('dash').active ){

    }
    else if( !ctrl.dash.active && !actor.on_ground ){
        legs_anim.animation = 'jump';
    }
    else{
        legs_start_walking();
    }

    if( actor.on_ground && actor.velocity.get_length2D() < 1 ){
        head_anim.stop();
    }else{
        head_anim.play();
    }


    // Just landed
    if( actor.on_ground && legs_anim.animation == "jump" ){
        legs_back_to_normal();
    }
  }

}