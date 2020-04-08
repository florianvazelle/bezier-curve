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