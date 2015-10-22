function GameAssets(screen) {
  this.screen = screen;

  this.card
  this.card_glow
  this.coins = []
  this.wallet
  this.wallet_expo
  this.gameoverText
  this.playagainText

  this.sprite_sheets = ["assets/sprites.json", "assets/mc.json"]
  PIXI.loader
          .add(this.sprite_sheets)
          .load(this.onAssetsLoaded.bind(this));
}

GameAssets.prototype.onAssetsLoaded = function () {
  this.card = new PIXI.Sprite(new PIXI.Texture.fromFrame('card.png'))
  this.card_glow = new PIXI.Sprite(new PIXI.Texture.fromFrame('yellow_glow.png'))
  for (var i = 0; i < 100; i++) {
    // an enough number, coz the actual number of coins is unkonwn yet
    var rand = 1 + Math.floor(Math.random() * 1.99)   // 1 or 2
    this.coins.push(new PIXI.Sprite(new PIXI.Texture.fromFrame('coin_0' + rand + '.png')))
  }
  this.wallet = new PIXI.Sprite(new PIXI.Texture.fromFrame('wallet.png'))
  this.wallet_expo = new PIXI.extras.MovieClip(Array.apply(null, Array(26)).map(function (e, i) {
    return PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i + 1) + '.png')
  }))
  this.gameoverText = new PIXI.Text('珍愛銀包，用八達通', {
    font: 'bold italic 36px Arial',
    fill: '#666',
    stroke: '#CEE632',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  })
  this.playagainText = new PIXI.Text('再來一次', {
    font: 'bold 22px Arial',
    fill: '#333',
    stroke: '#CCC',
    strokeThickness: 3,
  })
  this.playagainText.interactive = true

  if (this.screen) {
    this.screen.onAssetsPrepared()
  }
};

