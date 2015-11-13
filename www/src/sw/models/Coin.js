Coin.prototype = Object.create(Collidable.prototype)

function Coin(x, y, options) {
  Collidable.call(this, x, y, options)
  this.state = Coin.STATES.AVAILABLE
  this.rotation_speed = options.rotation_speed || 0
}

Coin.prototype.update = function (dt) {
  Collidable.prototype.update.call(this, dt)
  switch (this.state) {
    case Coin.STATES.AVAILABLE:
      break
    case Coin.STATES.FALLING:
      this.rotation += this.rotation_speed * dt
      break
    case Coin.STATES.DROPPED:
      break
    default:
  }
}

Coin.prototype.reset = function () {
  this.state = Coin.STATES.AVAILABLE
  this.alpha = 1
  this.velocity.set(0, 0)
}

Coin.STATES = {
  AVAILABLE: {},
  FALLING: {},
  DROPPED: {}
}
