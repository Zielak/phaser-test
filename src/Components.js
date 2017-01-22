
import 'Phaser';

import Console from './utils/Console';

var console = Object.create(Console);
console.init('Components');


export default class Components {

  constructor(entity){

    this.components = new Map();

    this.entity = entity;

  }

  destroy(){
    this.components.clear();
    this.components = undefined;
    this.entity = undefined;
  }


  add(component){

    if(!component){
      console.warn('you\'re trying to add empty compnoent!');
    }

    component.entity = this.entity;

    this.components.set(component.name, component);

    component.onadded();

    return component;
  }

  remove(name){
    
    if(!this.components.has(name)){
      console.warn('trying to remove a component not found on this entity', this.entity);
      return false;
    }

    this.components.get(name).onremoved();

    return this.components.delete(name);
  }

  get(name){
    return this.components.get(name);
  }

  has(name){
    return this.components.has(name);
  }

  update(){
    this.components.forEach( (v) => {
      v.update(this.entity.game.time.physicsElapsed);
    });
  }

}