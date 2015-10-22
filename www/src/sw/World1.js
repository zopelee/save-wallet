function World1(listener) {
  this.listener = listener
  this.setting = new SwSetting()

  this.width = 480
  this.height = 800

  this.state = World1.STATES.READY
  this.state_time = 0
  this.score = 0

  this.coinpool = new CoinPool(this.setting.MAX_COINS, this.setting.GRAVITY)
  this.card = new Card(240, 500, {max_velocity: 5000, width: 120, height: 80, scale: new Point(0.3, 0.3)})
  this.wallet = new Wallet(240, 700, {radius: 50, expo_threshod: this.setting.EXPO_THRESHOLD, scale: new Point(0.8, 0.8)})

  this.ready = function () {
    // called after assets prepared
    this.state = World1.STATES.READY
    this.state_time = 0
  }

  this.start = function () {
    this.state = World1.STATES.RUNNING
    this.state_time = 0
    this.coinpool.reset()
    this.wallet.reset()
  }

  this.update = function (dt) {
    this.state_time += dt

    this.coinpool.update(dt)
    this.card.update(dt)
    this.wallet.update(dt)

    switch (this.state) {
      case World1.STATES.READY:
        if (this.state_time > this.state.duration) {
          this.start()
          console.log('world started')
        }
        break
      case World1.STATES.RUNNING:
        this.coinpool.drop_slotmgr.update(this.state_time)
        this.checkBoundary()
        this.checkCoinRecycled()
        this.checkGameover()
        break
      case World1.STATES.GAMEOVER:
        break
      default :
    }
  }

  this.hideResults = function () {
  }

  this.showResults = function () {
  }

  this.checkBoundary = function () {
    this.coinpool.falling_coins.forEach(function (coin) {
      var collided = false
      if (coin.position.x - coin.radius <= 0) {
        coin.position.x = coin.radius + 1
        collided = true
      } else if (coin.position.x + coin.radius >= this.width) {
        coin.position.x = this.width - coin.radius - 1
        collided = true
      }
      if (collided) {
        coin.velocity.x *= -1
      }
    }.bind(this))

    var card = this.card
    if (card.destination) {
      if (card.destination.x - card.radius <= 0) {
        card.destination.x = card.radius + 1
      } else if (card.destination.x + card.radius >= this.width) {
        card.destination.x = this.width - card.radius - 1
      }
      if (card.destination.y - card.radius <= 0) {
        card.destination.y = card.radius + 1
      } else if (card.destination.y + card.radius >= this.height) {
        card.destination.y = this.height - card.radius - 1
      }
    }
  }

  this.checkCoinRecycled = function () {
    for (var i = this.coinpool.falling_coins.length; i--; ) {
      var coin = this.coinpool.falling_coins[i]
      if (CollisionHelper.isRectBallCollide(this.card, coin)) {
        console.log('eaten')
        this.card.glow()
        this.coinpool.recycleCoin(coin)
        this.score += 1
      } else if (coin.position.y >= this.wallet.position.y) {
        console.log('dropped')
        this.wallet.eat()
        this.coinpool.recycleCoin(coin)
        this.wallet.coin_count += 1
      }
    }
  }
  this.checkGameover = function () {
    if (this.wallet.coin_count >= this.wallet.expo_threshod) {
      this.state = World1.STATES.GAMEOVER
      this.state_time = 0
      this.wallet.explode()
    }
  }

  this.playAgain = function () {
    this.start()
  }

  this.onPress = function (x, y) {
    switch (this.state) {
      case World1.STATES.RUNNING:
        this.card.destination.x = x
        break
      default :
    }
  }
}

World1.STATES = {
  READY: {duration: 2},
  RUNNING: {},
  GAMEOVER: {},
}
