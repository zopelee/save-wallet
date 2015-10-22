SwDirector.prototype = Object.create(DirectorImpl.prototype);

function SwDirector(width, height, options) {
  DirectorImpl.call(this, width, height, options);
  this.setScreen(new GameScreen(this));
}
