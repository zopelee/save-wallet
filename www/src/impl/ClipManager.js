function ClipManager(clip_hash, options) {
  options = options || {};
  // a clip contains many textures
  this.clip_hash = clip_hash || {};
  this.current_clip = null;
}

ClipManager.prototype.useClip = function(clip) {
  if (clip.visible && clip === this.current_clip) {
    return;
  }
  clip.visible = true;
  clip.currentFrame = 0;   // for non-repeat clip
  if (this.current_clip) {
    this.current_clip.visible = false;
  }
  this.current_clip = clip;
};

ClipManager.prototype.render = function(actor) {
  // sync rotation
  this.current_clip.rotation = actor.rotation;
  if (false) {   // v3.0.7 issue on iOS
//  if (!actor.state.is_repeat && this.is_last_frame(this.current_clip)) {
    // render last frame (already)
  } else {
    this.current_clip.gotoAndStop(actor.frame_index);
  }
};

ClipManager.prototype.is_last_frame = function(clip) {
  return clip.currentFrame >= clip.totalFrames - 1;
};

// static
ClipManager.prototype.syncRotation = function(actor, clip) {
  clip.rotation = actor.rotation;
};
ClipManager.prototype.linkProps = function(actor, clip) {
  clip.position = actor.position;
  clip.anchor = actor.anchor;
  clip.pivot = actor.pivot;
  clip.scale = actor.scale;
};

