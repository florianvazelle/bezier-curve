 // c => polygonPoints
function deBoor(k, x, t, c, p) {
  var d = []
  for (var j = 0; j < p + 1; j++) {
    d.push(c[j + k - p])
  }
  
  for (var r = 1; r < p + 1; r++) {
    for (var j = 1; j < r - 1; j--) {
      var alpha = (x - t[j + k - p]) / (t[j + 1 + k - r] - t[j + k - p])
      d[j] = (1.0 - alpha) * d[j - 1] + alpha * d[j]
    }
  }
  
  return d[p]
}

function applyDeBoor(polygonPoints) {
  var bSplinePoints = []
  for (var j = 0; j < polygonPoints.length - 1; j++) {
    var line = new Phaser.Geom.Line(polygonPoints[j].x, polygonPoints[j].y, polygonPoints[j + 1].x, polygonPoints[j + 1].y);
    var t = Phaser.Geom.Line.GetPoints(line, 10);
    
    for (var k = 0; k < t.length; k++) {
      //bSplinePoints.push(deBoor(k, t[k], t, polygonPoints, 60));
    }
  }
  return bSplinePoints
}

/*
def deBoor(k: int, x: int, t, c, p: int): 
    """Evaluates S(x).

    Arguments
    ---------
    k: Index of knot interval that contains x.
    x: Position.
    t: Array of knot positions, needs to be padded as described above.
    c: Array of control points.
    p: Degree of B-spline.
    """
    d = [c[j + k - p] for j in range(0, p+1)]

    for r in range(1, p+1):
        for j in range(p, r-1, -1):
            alpha = (x - t[j+k-p]) / (t[j+1+k-r] - t[j+k-p])
            d[j] = (1.0 - alpha) * d[j-1] + alpha * d[j]

    return d[p]
*/