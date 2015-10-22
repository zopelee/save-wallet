Wallet.prototype = Object.create(Collidable.prototype)

function Wallet(x, y, options) {
  Collidable.call(this, x, y, options)

  this.coin_count = 0
  this.expo_threshod = options.expo_threshod
  this.initial_scale = options.scale
  this.expo_alpha = 0
  this.expo_bg_alpha = 0
  this.expo_bg_rotation = 0
  this.socrowdedText = new Actor(x, y)

  this.eat_timeline = new TimelineMax({paused: true})
          .to(this.scale, 0.1, {x: 1, y: 1}, 'out')
          .to(this.socrowdedText.scale, 0.1, {x: 2, y: 2}, 'out')
          .to(this.scale, 0.1, {x: 0.8, y: 0.8}, 'in')
          .to(this.socrowdedText.scale, 0.1, {x: 0, y: 0}, 'in +=0.2')
  this.explosion_timeline = new TimelineMax({paused: true})
          .fromTo(this.scale, 1, {x: this.initial_scale.x, y: this.initial_scale.y}, {x: 1.5, y: 1.5}, 'start')
          .fromTo(this, 2, {alpha: 1}, {alpha: 0}, 'start')
          .to(this, 0.2, {expo_alpha: 1, repeat: 5, yoyo: true}, 'start')
          .to(this, 1, {expo_bg_rotation: 360 * Math.PI / 180}, 'start')
          .to(this, 0.1, {expo_bg_alpha: 1}, 'start')
          .to(this, 0.5, {expo_alpha: 0}, 'fade')
          .to(this, 0.5, {expo_bg_alpha: 0}, 'fade')
          .to(this, 0.5, {alpha: 0}, 'fade')
  this.reset()
}

Wallet.prototype.update = function (dt) {
  Collidable.prototype.update.call(this, dt)
  switch (this.state) {
    case Wallet.STATES.NORMAL:
      break
    case Wallet.STATES.EATING:
      break
    case Wallet.STATES.EXPLODING:
      break
    default:
  }
}

Wallet.prototype.reset = function () {
  this.state = Wallet.STATES.NORMAL
  this.coin_count = 0
  this.eat_timeline.restart().pause()
  this.explosion_timeline.restart().pause()
  this.alpha = 1
  this.scale.set(this.initial_scale.x, this.initial_scale.y)
  this.socrowdedText.position = this.position
  this.socrowdedText.scale.set(0, 0)
}

Wallet.prototype.eat = function () {
  this.eat_timeline.restart()
}

Wallet.prototype.explode = function () {
  this.state = Wallet.STATES.EXPLODING
  this.explosion_timeline.restart()
}

Wallet.STATES = {
  NORMAL: {},
  EATING: {},
  EXPLODING: {}
}
