// évalue S(x)
function deBoor(k, x, knots, polygonPoints, degree) {
  var d = []
  for (var j = 0; j < degree + 1; j++) {
    d.push(Phaser.Geom.Point.Clone(polygonPoints[Math.floor(j + k - degree)]))
  }

  for (var r = 1; r < degree + 1; r++) {
    for (var j = degree; j > r - 1; j--) {
      var alpha = (x - knots[Math.floor(j + k - degree)]) / (knots[Math.floor(j + 1 + k - r)] - knots[Math.floor(j + k - degree)])
      d[j].x = (1.0 - alpha) * d[j - 1].x + alpha * d[j].x
      d[j].y = (1.0 - alpha) * d[j - 1].y + alpha * d[j].y
    }
  }
  
  return d[degree]
}

function applyDeBoor(polygonPoints) {
  var bSplinePoints = []

  const degree = 2                     // degree
  const n = polygonPoints.length - 1   //
  var knots = []                       // length = n + degree + 2

  for (var j = 0; j < n + degree + 2; j++) {
    knots.push(j * 2)
  }
  
  if (!(degree <= n)) { console.log('degree is not <= to n'); return [] }
  if (!(knots.length == (n + degree + 2))) { console.log('wrong length of knots'); return [] }
  
  // parcours l'interval [knots[degree];knots[n + 1])
  for (var i = degree; i < n + 1; i++) { 
    for (var t = knots[i]; t <= knots[i + 1]; t += 0.2) {
      bSplinePoints.push(deBoor(i, t, knots, polygonPoints, degree));
    }
  }

  return bSplinePoints
}