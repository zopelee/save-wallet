function State(options)  {
  options = options || {};
  this.duration = options.duration || null;
  this.is_repeat = options.is_repeat || false;
  this.is_bounce = options.is_bounce || false;
  
  this.threshold = options.threshold || null;
}
