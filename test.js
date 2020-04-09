// évalue S(x)
function deBoor2(k, x, knots, polygonPoints, degree) {
  var d = []
  for (var j = 0; j < degree + 1; j++) {
    d.push(polygonPoints[j + k - degree])
  }
  
  for (var r = 1; r < degree + 1; r++) {
    for (var j = 1; j < r - 1; j--) {
      var alpha = (x - knots[j + k - degree]) / (knots[j + 1 + k - r] - knots[j + k - degree])
      d[j].x = (1.0 - alpha) * d[j - 1].x + alpha * d[j].x
      d[j].y = (1.0 - alpha) * d[j - 1].y + alpha * d[j].y
    }
  }
  
  return d[degree]
}

function deBoor(k, degree, i, x, knots, ctrlPoints) { 
    if(k == 0) {
      console.log(i)
      return ctrlPoints[i]
    } else {
        var alpha = (x - knots[i]) / (knots[i + degree + 1 - k] - knots[i])
      
        var p1 = deBoor(k - 1, degree, i - 1, x, knots, ctrlPoints)
        p1.x *= (1 - alpha)
        p1.y *= (1 - alpha)
      
        var p2 = deBoor(k - 1, degree, i, x, knots, ctrlPoints)
        p2.x *= alpha
        p2.y *= alpha
      
        var p3 = new Phaser.Geom.Point(p1.x + p2.x, p1.y + p1.y)
        return p3
    }
}

function applyDeBoor(polygonPoints) {
  var bSplinePoints = []
  for (var j = 0; j < polygonPoints.length - 1; j++) {
    
    // knots.length = polygonPoints.length + degree + 1
    var knots = [0, 0, 0, 1, 2, 2, 2];

    for (var k = 0; k < knots.length; k++) {
      bSplinePoints.push(deBoor(k, 2, k-j, knots[k], knots, polygonPoints));
    }
  }
  console.log(bSplinePoints)
  return []
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