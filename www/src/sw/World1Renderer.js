World1Renderer.prototype = Object.create(WorldRenderer.prototype)

function World1Renderer(world, screen, options) {
  WorldRenderer.call(this, world, screen, options)

  this.childrenToAdd = [
    [this.world.card, this.assets.card], [this.world.wallet, this.assets.wallet],
    [null, this.assets.card_glow], [null, this.assets.wallet_expo],
  ].concat(this.world.coinpool.available_coins.map(function (c, i) {
    return [c, this.assets.coins[i]]
  }.bind(this))).concat([
    [this.world.readyText, this.assets.readyText],
    [this.world.touch, this.assets.touch],
    [this.world.wallet.socrowdedText, this.assets.socrowdedText],
    [null, this.assets.gameoverText], [null, this.assets.playagainText],
    [this.world.scoreText, this.assets.scoreText]
  ])

  this.syncGlows = function () {
    this.assets.card_glow.position = this.assets.card.position
    this.assets.wallet_expo.position = this.assets.wallet.position
    this.assets.wallet_expo.scale = this.assets.wallet.scale
  }
}

World1Renderer.prototype.init = function () {
  WorldRenderer.prototype.init.call(this)

  this.stage.children.forEach(function (child) {
    if (child.anchor) {
      // sprite has anchor, but container doesn't
      child.anchor.set(0.5, 0.5)
    }
  })
  this.assets.coins.forEach(function (c) {
    c.position.set(this.world.coinpool.initial_x, this.world.coinpool.initial_y)
  }.bind(this))

  this.syncGlows()
  this.assets.card_glow.scale.set(1.5, 1.5)
  this.assets.wallet_expo.gotoAndPlay(0)
  this.assets.wallet_expo.visible = false
  this.assets.gameoverText.position.set(240, 400)
  this.assets.playagainText.position.set(240, 500)
}

World1Renderer.prototype.render = function () {
  WorldRenderer.prototype.render.call(this);
  this.assets.card_glow.alpha = this.world.card.glow_alpha
  this.assets.scoreText.text = ('餘額: ' + this.world.score)
  switch (this.world.state) {
    case World1.STATES.READY:
    case World1.STATES.RUNNING:
      this.assets.wallet_expo.visible = false
      this.assets.gameoverText.visible = false
      this.assets.playagainText.visible = false
      break
    case World1.STATES.GAMEOVER:
      this.assets.wallet_expo.visible = this.world.state_time < 1 ? true : false
      this.assets.gameoverText.visible = true
      this.assets.playagainText.visible = true
      break
    default:
  }
}

