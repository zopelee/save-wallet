function TimeSlotManager (slots, callback, options) {
  options = options || {};
  this.is_repeat = options.is_repeat || false;
  this.slots = slots;
  this.slot_count = slots.length;
  if (this.slot_count < 2) {
    throw Error("TimeSlot must be > 1");
  }
  
  this.callback = callback;
  this.durations = this.slots.map(function (s) {
    return parseFloat(s.duration)
  });
  this.total_duration = this.getTotalDuration(this.durations);
  this.edges = this.getEdges(this.durations);
  
  this.active_index = 0;
  this.active_slot = this.slots[0];
  
  this.last_time_pos = 0
}

TimeSlotManager.prototype.update = function (state_time) {
  var time_pos = state_time % this.total_duration
  var is_last = this.active_index === this.slot_count - 1;
  var next_edge = is_last ? this.total_duration : this.edges[this.active_index + 1];
  if (time_pos > next_edge || time_pos < this.last_time_pos) {
    if (is_last) {
      if (this.is_repeat) {
        this.active_index = 0;
        this.active_slot = this.slots[0];
        this.resetAll();
      } else {
        // no repeat, end
        return false;
      }
    } else {
      this.active_index += 1;
      this.active_slot = this.slots[this.active_index];
      this.active_slot.is_accessed = true;
    }
    if (this.callback) {
      this.callback();
    }
  }
  this.last_time_pos = time_pos
};

TimeSlotManager.prototype.getEdges = function (durations) {
  var edges = [];
  var tmp_edge = 0;
  for (var i = 0, len = this.slot_count; i < len; i++) {
    edges.push(tmp_edge);
    tmp_edge += durations[i];
  }
  return edges;
};

TimeSlotManager.prototype.getTotalDuration = function (durations) {
  var total = 0;
  durations.forEach(function(d){
    total += d
  })
  return total;
};

TimeSlotManager.prototype.resetAll = function (durations) {
  this.active_index = 0
  for (var s in this.slots) {
    s.is_accessed = false;
  }
};
