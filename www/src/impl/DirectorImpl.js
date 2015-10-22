DirectorImpl.prototype = Object.create(Director.prototype)

function DirectorImpl(width, height, options) {
  options = options || {}
  this.is_debug = options.is_debug
  this.width = width
  this.height = height
  this.scale = options.scale || new Point(1, 1)
  this.main_canvas = document.getElementById('main_canvas')
  this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {view: this.main_canvas, backgroundColor: options.backgroundColor || 0x000})
  window.onresize = function (event) {
    var window_aspect_ratio = window.innerWidth / window.innerHeight
    var canvas_aspect_ratio = width / height
    if (window_aspect_ratio > canvas_aspect_ratio) {
      this.main_canvas.style.removeProperty('width')
      this.main_canvas.style.height = '100%'
    } else {
      this.main_canvas.style.width = '100%'
      this.main_canvas.style.removeProperty('height')
    }
  }
  window.onresize()
  Director.call(this)
  if (this.is_debug) {
    this.stats = new Stats()
    document.body.appendChild(this.stats.domElement)
  }
}

DirectorImpl.prototype.updateAndRender = function (dt) {
  if (this.is_debug) {
    this.stats.begin()
  }
  Director.prototype.updateAndRender.call(this, dt)
  if (this.is_debug) {
    this.stats.end()
  }
}
DirectorImpl.prototype.setScreen = function (screen) {
  var prev_screen = this.screen
  this.screen = null
  if (prev_screen) {
    prev_screen.hide()
  }
  screen.show()
  this.screen = screen
}
