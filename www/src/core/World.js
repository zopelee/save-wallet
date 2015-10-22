World = function (listener) {
  this.listener = listener;
}

World.prototype.states = {
  FADE_IN: new State(),
  RUNNING: new State(),
  PAUSED: new State(),
  FADE_OUT: new State(),
  END: new State()
};