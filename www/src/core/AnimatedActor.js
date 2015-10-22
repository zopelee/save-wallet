AnimatedActor.prototype = Object.create(Actor.prototype);

function AnimatedActor(x, y, options) {
  Actor.call(this, x, y, options);
  options = options || {};
  this.fps = options.fps || 20;
  this.states = [];
  this.state = null;
  this.state_time = 0;
  this.frame_index = 0;
  this.is_state_changed = true;
}

AnimatedActor.prototype.update = function (dt) {
  Actor.prototype.update.call(this, dt);
  this.state_time += dt;
  this.frame_index = Math.floor(this.fps * this.state_time);
  this.is_state_changed = false;
};

AnimatedActor.prototype.toState = function (state) {
  if (this.state === state) {
    return;
  }
  this.state = state;
  this.state_time = 0;
  this.fps = state.fps || this.fps;
  this.is_state_changed = true;
  // update() with make "is_state_changed" back to false
};

AnimatedActor.prototype.initStates = function (states) {
  var i = 0;
  for (var key in states) {
    states[key].id = i++;
  }
};
