function CollisionHelper() {
}

CollisionHelper.calcVeloAfterCollide = function (m1, v1, m2, v2) {
//  console.log(v1 + ' ' + m1 + ' ' + m2 + ' ' + m2 + ' ' + v2 + ' ' + m1 + ' ' + m2)
  return (v1 * (m1 - m2) + (2 * m2 * v2)) / (m1 + m2)
}

CollisionHelper.isCollide = function (a, b) {
  if (a.width && !a.radius && b.width && !b.radius) {
    console.log('rects collision not suppoerted')
    return false
  } else if (!a.width && a.radius && !b.width && b.radius) {
    return CollisionHelper.isBallsCollide(a, b)
  } else if (a.width && b.radius) {
    return CollisionHelper.isRectBallCollide(a, b)
  } else if (a.radius && b.width) {
    return CollisionHelper.isRectBallCollide(b, a)
  } else {
    console.log('unable to check collision')
    return false
  }
}

CollisionHelper.isBallsCollide = function (a, b) {
  var dist_x = a.position.x - b.position.x
  var dist_y = a.position.y - b.position.y
  var dist_x_sq = Math.pow(dist_x, 2)
  var dist_y_sq = Math.pow(dist_y, 2)
  var dist_sq = dist_x_sq + dist_y_sq
  var min_dist_sq = Math.pow(b.radius + a.radius, 2)
  return dist_sq <= min_dist_sq
}

CollisionHelper.isRectBallCollide = function (rect, ball) {
  var x_dist = ball.position.x - rect.position.x
  var max_x_dist = rect.width / 2 + ball.radius
  var d_x = Math.abs(x_dist) - max_x_dist
  if (d_x <= 0) {
    var y_dist = ball.position.y - rect.position.y
    var max_y_dist = rect.height / 2 + ball.radius
    var d_y = Math.abs(y_dist) - max_y_dist
    return d_y <= 0
  } else {
    return false
  }
}
