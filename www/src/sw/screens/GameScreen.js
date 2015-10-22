GameScreen.prototype = Object.create(ScreenImpl.prototype)

function GameScreen(director) {
  ScreenImpl.call(this, director)
  this.assets = null
  this.world_listener
  this.world
  this.world_renderer
  this.hammer
}

GameScreen.prototype.show = function () {
  this.assets = new GameAssets(this)
  this.hammer = new Hammer.Manager(this.director.main_canvas);
  var hm = this.hammer
  var pan = new Hammer.Pan({threshold: 0})
  var press = new Hammer.Press({time: 0})
  hm.add([pan, press]);
  hm.on('press pan', function (ev) {
    var screen = this
    var world = this.world

    ev.pointers.forEach(function (pt) {
      var pos = screen.getPointerPosition(ev, pt)
      world.onPress(pos.x, pos.y)
    })
  }.bind(this))
}

GameScreen.prototype.onAssetsPrepared = function (stage) {
  // on assets loaded and sprites created
  this.world_listener = new World1Listener(this.assets)
  this.world = new World1(this.world_listener)
  this.world_renderer = new World1Renderer(this.world, this, {is_debug: false})
  this.childrenToAdd = this.world_renderer.childrenToAdd
  ScreenImpl.prototype.onAssetsPrepared.call(this)   // add all childrenToAdd to stage
  this.world_renderer.init()   // set additional scales
  this.world.ready()

  this.assets.playagainText.mousedown = this.assets.playagainText.touchstart = function (eventData) {
    this.world.playAgain()
  }.bind(this)
}

GameScreen.prototype.updateAndRender = function (dt) {
  ScreenImpl.prototype.updateAndRender.call(this, dt)
  this.world.update(dt);
  this.world_renderer.render();
}
