function OutlineManager() {
  this.children = [];
  this.outlines = [];
}

OutlineManager.prototype.getOutline = function(child) {
  var i = this.children.indexOf(child);
  if (i < 0) {
    return null;
  }
  return this.outlines[i];
};

OutlineManager.prototype.pushOutline = function(child, outline) {
  this.children.push(child);
  this.outlines.push(outline);
};

OutlineManager.prototype.syncOutlines = function() {
  for (var i = this.children.length; --i; ) {
    var clip = this.children[i];
    var box = this.outlines[i];
    box.clear();
    box.lineStyle(1, 0x000000);
    box.drawRect(clip.position.x - clip.width/2, clip.position.y - clip.height/2, clip.width, clip.height);
    box.rotation = clip.rotation;
  }
};

