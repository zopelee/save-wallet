function CoinPool(max_coins, gravity) {
  this.max_coins = max_coins
  this.gravity = gravity
  this.initial_x = 240
  this.initial_y = -100
  this.available_coins = Array.apply(null, Array(max_coins)).map(function () {
    return new Coin(240, this.initial_y, {radius: 10, scale: new Point(0.5, 0.5)})
  })
  this.falling_coins = []
  this.dropped_coins = []
  this.drop_slotmgr = new TimeSlotManager(Array.apply(null, Array(64)).map(function () {
    return new TimeSlot(Math.random() * 0.5)
  }), function () {
    this.dropCoin()
  }.bind(this), {
    is_repeat: true
  })

  this.dropCoin = function () {
    var coin = this.available_coins.pop()
    if (!coin) {
      return
    }
    coin.state = Coin.STATES.FALLING
    coin.acceleration.set(0, this.gravity)
    coin.velocity.set((Math.random() - 0.5) * 5000, Math.random() * 1000)
    coin.position.y = this.initial_y
    this.falling_coins.push(coin)
  }
  
  this.recycleCoin = function (coin) {
    var index = this.falling_coins.indexOf(coin)
    if (index < 0) {
      return
    }
    this.falling_coins.splice(index, 1)
    coin.state = Coin.STATES.AVAILABLE
    coin.acceleration.set(0, 0)
    coin.position.set(this.initial_x, this.initial_y)
    this.available_coins.push(coin)
  }
  
  this.reset = function () {
    this.drop_slotmgr.resetAll()
    for (var i = this.falling_coins.length; i--; ) {
      var coin = this.falling_coins.pop()
      coin.state = Coin.STATES.AVAILABLE
      coin.acceleration.set(0, 0)
      coin.position.set(this.initial_x, this.initial_y)
      this.available_coins.push(coin)
    }
    for (var i = this.dropped_coins.length; i--; ) {
      var coin = this.dropped_coins.pop()
      coin.state = Coin.STATES.AVAILABLE
      coin.acceleration.set(0, 0)
      coin.position.set(this.initial_x, this.initial_y)
      this.available_coins.push(coin)
    }
  }
  
  this.start = function () {
  }
  
  this.update = function (dt) {
    this.falling_coins.forEach(function (c) {
      c.update(dt)
    })
  }
}
