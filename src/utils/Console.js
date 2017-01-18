

/**
 * Console utility
 * 
 * HOW TO USE:
 * 
  import Console from '../utils/Console';

  var console = Object.create(Console);
  console.init('Dash: ');
  // ...
  console.log('siema');
 *
 */
export default {

  init( prefix ){
    this.prefix = prefix;

  },
  
  log(){
    window.console.log.apply(this, [ this.prefix, ...arguments] );
  },

  warn(){
    window.console.warn.apply(this, [ this.prefix, ...arguments] );
  },

  error(){
    window.console.error.apply(this, [ this.prefix, ...arguments] );
  },
  
  info(){
    window.console.info.apply(this, [ this.prefix, ...arguments] );
  }

};

