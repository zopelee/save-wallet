ScreenImpl.prototype = Object.create(Screen.prototype)

function ScreenImpl(director) {
  Screen.call(this, director)
  this.renderer = director.renderer
  this.scale = director.scale
  this.container = new PIXI.Container()
  this.container.scale.set(this.scale.x, this.scale.y)
  this.stage = new PIXI.Container()
  this.container.addChild(this.stage)
  this.childrenToAdd = []
  this._pointer_position = new Point(0, 0)
}

ScreenImpl.prototype.onAssetsPrepared = function (stage) {
  if (!stage) {
    stage = this.stage
  }
  this.childrenToAdd.forEach(function (actor_n_sprite) {
    var actor = actor_n_sprite[0]
    var sprite = actor_n_sprite[1]
    if (actor && sprite instanceof PIXI.Sprite) {
      actor.setSprite(sprite)
    } else if (sprite instanceof PIXI.Container) {
    }
    stage.addChild(sprite)
  }.bind(this))
}

ScreenImpl.prototype.show = function () {
}

ScreenImpl.prototype.updateAndRender = function (dt) {
  Screen.prototype.updateAndRender.call(this, dt)
  if (this.container) {
    this.renderer.render(this.container)
  }
}

function removeAllChildren(container) {
  container.children.forEach(function (child) {
    if (child.children.length) {
      removeAllChildren(child)
    } else {
      child.destroy(true, true)
      container.removeChild(child)
    }
  })
}

ScreenImpl.prototype.hide = function () {
  Screen.prototype.hide.call(this)
  removeAllChildren(this.container)
//  this.container.children.forEach(function (child) {
//    this.container.removeChild(child)
//  }.bind(this))
  this.container = null
  PIXI.loader.reset()
//  Object.keys(PIXI.utils.TextureCache).forEach(function (texture) {
//    PIXI.utils.TextureCache[texture].destroy(texture)
//  })
  if (this.hammer) {
    this.hammer.destroy()
  }
}

ScreenImpl.prototype.getPointerPosition = function (ev, pt) {
  var rect = ev.target.getBoundingClientRect();
  var ratio = ev.target.clientWidth / ev.target.width
  var pos_x = (pt.clientX - rect.left) / ratio
  var pos_y = (pt.clientY - rect.top) / ratio
  pos_x /= this.scale.x
  pos_y /= this.scale.y
  this._pointer_position.set(pos_x, pos_y)
  return this._pointer_position
}