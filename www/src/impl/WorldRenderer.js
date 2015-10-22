function WorldRenderer(world, screen, options) {
  options = options || {};
  this.is_debug = options.is_debug || false;
  this.world = world;
  this.screen = screen
  this.assets = options.assets || screen.assets;

  this.container = screen.container
  this.stage = options.stage || screen.stage
  this.outline_mgr = new OutlineManager();

  this.children_array = null;
  this.children_array_hash = {};
}

WorldRenderer.prototype.init = function () {
}

WorldRenderer.prototype.render = function (array) {
}

WorldRenderer.prototype.useChildrenArray = function (array) {
  if (this.children_array === array) {
    return;
  }
  this.children_array = array;
  this.stage.children = array;
};

WorldRenderer.prototype.addChild = function (child) {
  this.stage.addChild(child);
  if (this.is_debug) {
    this.addOutline(child);
  }
};

WorldRenderer.prototype.addOutline = function (clip) {
  var box = new PIXI.Graphics();
//    box.beginFill(0xFFFFFF);
  box.lineStyle(1, 0x000000);
  box.drawRect(clip.position.x - clip.width / 2, clip.position.y - clip.height / 2, clip.width, clip.height);
//    box.endFill();
  this.outline_mgr.pushOutline(clip, box);
  this.stage.addChild(box);
};

