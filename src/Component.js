
import 'Phaser';


export default class Component {

  constructor({game, entity, name}){

    this.enabled = false;

    this.game = game;
    this.entity = entity;
    this.name = name;

  }

  /**
   * called when the component is attached to an entity
   * 
   * @memberOf Component
   */
  onadded(){}

  /**
   * called when the component is removed from an entity
   * 
   * @memberOf Component
   */
  onremoved(){}

  update(){}




  add(component){
    return this.entity.components.add(component);
  }

  /**
   * Removes component from entity by name
   * 
   * @param {String} name
   * @returns {Boolean} was component found and removed?
   * 
   * @memberOf Component
   */
  remove(name){
    return this.entity.components.remove(name);
  }

  /**
   * Gets instance of component by name
   * 
   * @param {String} name
   * @returns {Component}
   * 
   * @memberOf Component
   */
  get(name){
    return this.entity.components.get(name);
  }


  /**
   * Returns true if the entity has a component by the given name
   * 
   * @param {String} name
   * @returns {Boolean}
   * 
   * @memberOf Component
   */
  has(name){
    return this.entity.components.has(name);
  }

}
