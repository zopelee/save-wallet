function TimeSlot(duration, options) {
  options = options || {};
  this.duration = duration;
  
  this.is_accessed = false;
}