function Director() {
  this.now;
  this.dt;
  this.then = Date.now();
  this.setting = new Setting();
  this.screen = null

  this.preventTouchDefault()
  this.animate()
}

Director.prototype.animate = function () {
  // don't extend this method!
  this.now = Date.now();
  this.dt = (this.now - this.then) / 1000;
//  this.dt = this.now * 0.001 - this.then * 0.001;

  requestAnimationFrame(this.animate.bind(this));
  this.updateAndRender(this.dt);

  this.then = this.now;
};

Director.prototype.updateAndRender = function (dt) {
  if (!this.screen) {
    return
  }
  this.screen.updateAndRender(dt)
};

Director.prototype.preventTouchDefault = function () {
  window.addEventListener("touchstart", function (e) {
    e.preventDefault();
  }, false);

  window.addEventListener("touchmove", function (e) {
    e.preventDefault();
  }, false);
}

