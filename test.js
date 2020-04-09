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

function deBoor(polygonPoints, knots, k, u)
{
	var matrix = []
	var x = 0, y = 0, firstKnot = 0; //find I such that u within [u_I, u_I+1)
	
	//find the knots where u lies in between
	for (var i = 0; i < knots.length; i++) //domain [U_k-1,U_n+1]
	{
		if (knots[i] <= u && u < knots[i + 1])
			break;
		else//not in that interval, u must be one ahead in knots
			firstKnot++;
	}
	//first column contains the control points needed to locate c(u)
	for (var i = 0; i < polygonPoints.length; i++) {
    matrix[i] = []
		matrix[i][0] = polygonPoints[i];
  }


	for (var j = 1; j < k; j++) //loop through from generation 1 to (k-1)
	{
		for (var i = firstKnot - (k - 1); i <= (firstKnot - j); i++)
		{
			x = (knots[i + k] - u) * matrix[i][j - 1].x / (knots[i + k] - knots[i + j]) +

				(u - knots[i + j]) * matrix[i + 1][j - 1].x / (knots[i + k] - knots[i + j]);

			y = (knots[i + k] - u) * matrix[i][j - 1].y / (knots[i + k] - knots[i + j]) +

				(u - knots[i + j]) * matrix[i + 1][j - 1].y / (knots[i + k] - knots[i + j]);

			matrix[i][j] = new Phaser.Geom.Point(x, y);
		}
	}
  
	return matrix[firstKnot - (k - 1)][k - 1];
}
var t = false 
function applyDeBoor(polygonPoints) {
  var bSplinePoints = []
  if (t) return []
  for (var j = 0; j < polygonPoints.length - 1; j++) {
    
    // knots.length = polygonPoints.length + degree + 1
    var knots = [0, 1, 2, 3];

    for (var k = 0; k < knots.length; k++) {
      //bSplinePoints.push(deBoor(polygonPoints, knots, k, 2));
      bSplinePoints.push(deBoor2(k, knots[k], knots, polygonPoints, 2) )
    }
  }
  console.log(bSplinePoints)
  t = true
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