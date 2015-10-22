Collidable.prototype = Object.create(AnimatedActor.prototype)

function Collidable(x, y, options) {
  AnimatedActor.call(this, x, y, options)
  options = options || {}
  this.max_velocity = options.max_velocity || 0
  this._velocity = new Point(0, 0)
  this.last_position = new Point(0, 0)
  this.radius = options.radius || 0
  this.width = options.width || 0
  this.height = options.height || 0
  this.mass = options.mass || 0
  this.velocity = options.velocity || new Point(0, 0)
  this.acceleration = options.acceleration || new Point(0, 0)
  this.friction_factor = options.friction_factor || 0
}

Collidable.prototype.getVelocity = function (dt) {
  if (dt === 0) {
    this._velocity.set(0, 0)
  } else {
    this._velocity.x = this.position.x === this.last_position.x ? 0 : (this.position.x - this.last_position.x) / dt
    this._velocity.y = this.position.y === this.last_position.y ? 0 : (this.position.y - this.last_position.y) / dt
  }
  return this._velocity
}

Collidable.prototype.update = function (dt) {
  AnimatedActor.prototype.update.call(this, dt)
  this.last_position.x = this.position.x
  this.last_position.y = this.position.y
  var ratio = this.velocity.y / this.velocity.x

  if (this.acceleration) {
    var d_velo_x = this.acceleration.x * dt
    var d_velo_y = this.acceleration.y * dt
    this.velocity.x += d_velo_x
    this.velocity.y += d_velo_y
  }

  if (this.friction_factor) {
    var deceleration = 9.8 * this.friction_factor
    var deceleration_x = deceleration * deceleration / Math.sqrt(1 + ratio * ratio)
    var deceleration_y = deceleration_x * Math.abs(ratio)
    var sign_x = this.velocity.x / Math.abs(this.velocity.x)
    var sign_y = this.velocity.y / Math.abs(this.velocity.y)
    var d_velo_x = deceleration_x * dt * sign_x * -1
    var d_velo_y = deceleration_y * dt * sign_y * -1
    this.velocity.x = Math.abs(this.velocity.x) > Math.abs(d_velo_x) ? this.velocity.x + d_velo_x : 0
    this.velocity.y = Math.abs(this.velocity.y) > Math.abs(d_velo_y) ? this.velocity.y + d_velo_y : 0
  }

  if (this.max_velocity) {
    var max_velo_x = this.max_velocity / Math.sqrt(1 + Math.pow(ratio, 2))
    var max_velo_y = Math.abs(ratio) * max_velo_x
    if (Math.abs(this.velocity.x) > max_velo_x || Math.abs(this.velocity.y) > max_velo_y) {
      this.velocity.set(max_velo_x, max_velo_y)
    }
  }

  this.position.x += this.velocity.x * dt
  this.position.y += this.velocity.y * dt
}
