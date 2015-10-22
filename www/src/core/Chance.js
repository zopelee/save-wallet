function Chance(offset, options) {
  options = options || {};
  this.offset = offset;
  this.success_events = options.success_events || [];
  this.whitelist_events = options.whitelist_events || null;   // null to inherit from parent, or override
  this.on_start = options.on_start;
  this.on_success = options.on_success;
  this.on_fail = options.on_fail;
  this.on_end = options.on_end;
  this.require_prev_success = options.require_prev_success;
  this.is_success = false;
}