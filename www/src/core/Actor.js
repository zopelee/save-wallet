function Actor(x, y, options) {
  this.sprite = null
  options = options || {};
  this.position = new Point(x, y);
  this.anchor = options.anchor || new Point(0.5, 0.5);
  this.pivot = options.pivot || new Point(0, 0);
  this.scale = options.scale || new Point(1, 1);

  this.rotation = options.rotation || 0;
  this.alpha = typeof (options.alpha) !== 'undefined' ? options.alpha : 1;
}

Actor.prototype.update = function (dt) {
  if (this.sprite) {
    this.sprite.rotation = this.rotation
    this.sprite.alpha = this.alpha
    this.sprite.interactive = this.interactive
  }
};

Actor.prototype.syncPosition = function (actor) {
  this.position.x = actor.position.x;
  this.position.y = actor.position.y;
};

Actor.prototype.setSprite = function (sprite) {
  sprite.position = this.position
  sprite.anchor = this.anchor
  sprite.pivot = this.pivot
  sprite.scale = this.scale
  sprite.rotation = this.rotation

  this.mousedown = sprite.mousedown
  this.touchstart = sprite.touchstart
  this.mouseup = sprite.mouseup
  this.mouseupoutside = sprite.mouseupoutside
  this.touchend = sprite.touchend
  this.touchendoutside = sprite.touchendoutside
  this.mousemoveplayer = sprite.mousemoveplayer
  this.touchmove = sprite.touchmove

  this.sprite = sprite
}
