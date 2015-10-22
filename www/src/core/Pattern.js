function Pattern(duration, options) {
  options = options || {};
  this.duration = duration;
  this.chances = options.chances || [];
  this.whitelist_events = options.whitelist_events || [];
  this.on_start = options.on_start;
  this.on_fail = options.on_fail;
  this.on_end = options.on_end;
  this.is_success = false;
}