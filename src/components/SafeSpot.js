
import 'Phaser';

export default class {
  
  /**
   * Create safe spot logger.
   * @param {Phaser.Point} firstPoint - first safe spot to be added
   * @param {number} maxLength - maximum stored points.
   * @returns {SafeSpot} this
   */
  constructor( firstPoint, maxLength ){
    this.maxLength = maxLength || 10;
    this.spotsLog = [firstPoint];
    
    return this;
  }

  /**
   * Add new point
   * @param {Phaser.Point} point - point
   * @returns {SafeSpot} this
   */
  add( point ){
    this.spotsLog.push( point );

    if(this.spotsLog.length > this.maxLength){
      this.spotsLog.shift();
    }
    return this;
  }

  /**
   * Get last registered point
   * @returns {Phaser.Point} point
   */
  getLast(){
    return this.spotsLog[this.spotsLog.length-1];
  }

}
