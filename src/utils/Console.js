

/**
 * Console utility
 * 
 * HOW TO USE:
 * 
  import Console from '../utils/Console';

  var console = Object.create(Console);
  console.init('Dash');
  // ...
  console.log('siema');
 *
 */
export default {

  init( name ){
    this.name = name;
    this.prefix = this.name + ': ';
    this.enabled = true;
  },
  
  log(){
    if(this.enabled){
      window.console.log.apply(this, [ this.prefix, ...arguments ] );
    }
  },

  warn(){
    if(this.enabled){
      window.console.warn.apply(this, [ this.prefix, ...arguments ] );
    }
  },

  error(){
    if(this.enabled){
      window.console.error.apply(this, [ this.prefix, ...arguments ] );
    }
  },
  
  info(){
    if(this.enabled){
      window.console.info.apply(this, [ this.prefix, ...arguments ] );
    }
  }

};

