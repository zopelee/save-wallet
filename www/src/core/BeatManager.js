function BeatManager(options) {
  options = options || {};
  this.spb;
  this.bpm = this.setBpm(options.bpm || 60);
}

BeatManager.prototype.setBpm = function(bpm) {
  this.bpm = bpm;
  this.spb = 60 / this.bpm;
};
