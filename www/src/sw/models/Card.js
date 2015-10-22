Card.prototype = Object.create(Collidable.prototype)

function Card(x, y, options) {
  Collidable.call(this, x, y, options)
  this.destination = new Point(this.position.x, this.position.y)

  this.glow_alpha = 0
  this.glow_timeline = new TimelineMax({paused: true})
          .to(this, 0.2, {glow_alpha: 1})
          .to(this, 0.2, {glow_alpha: 0})

  this.glow = function () {
    this.glow_timeline.restart()
  }
}

Card.prototype.update = function (dt) {
//  this.velocity.set(0, 0)
  this.moveTo(this.destination.x, this.destination.y)
  Collidable.prototype.update.call(this, dt)
}

Card.prototype.moveTo = function (x, y) {
  var distance_x = x - this.position.x
  var distance_y = y - this.position.y
  if (distance_x === 0 && distance_y === 0) {
    this.velocity.set(0, 0)
    return
  }
  var last_distance_x = x - this.last_position.x
  var last_distance_y = y - this.last_position.y
  // if already passed destination, set to destination
  if (distance_x * last_distance_x <= 0 || distance_y * last_distance_y <= 0) {
    this.velocity.set(0, 0)
    this.position.set(x, y)
    return
  }

  // velocity x y based on max_velocity
  var ratio = distance_y / distance_x
  var velo_x = this.max_velocity / Math.sqrt((1 + Math.pow(ratio, 2))) * (Math.abs(distance_x) / distance_x)
  var velo_y = ratio * velo_x
  this.velocity.set(velo_x, velo_y)

}

