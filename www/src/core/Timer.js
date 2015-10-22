function Timer(duration, callback) {
  this.timer = duration
  this.duration = duration
  this.minutes
  this.seconds
  this.minutes_str = '00'
  this.seconds_str = '00'
  this.is_started = false
  this.interval_obj

  this.start = function () {
    if (this.is_started) {
      return
    }
    this.timer = this.duration
    this.is_started = true
    this.interval_obj = setInterval(function () {
      if (--this.timer < 0) {
        if (this.is_started) {
          this.is_started = false
          callback()
        }
        window.clearInterval(this.interval_obj)
        return
      }
      this.minutes = parseInt(this.timer / 60, 10)
      this.seconds = parseInt(this.timer % 60, 10)

      var min = this.minutes
      var sec = this.seconds
      this.minutes_str = min < 10 ? "0" + min : "" + min;
      this.seconds_str = sec < 10 ? "0" + sec : "" + sec;
    }.bind(this), 1000)
  }

  this.stop = function () {
    window.clearInterval(this.interval_obj)
    this.is_started = false
  }
}