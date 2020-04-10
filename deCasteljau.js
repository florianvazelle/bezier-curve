// Algorithme de De Casteljau
function deCasteljau(p) {
    // on met tout les points du polygone de controle au stade 0 
    var points = []
    for (var i = 0; i < p.length; i++) {
        points[i] = []
        points[i][0] = p[i]
    }
  
    var deCasteljauPoints = []
    var n = points.length - 1;
  
    // Pour verifier qu'il y a au moins un point
    if (n > -1) { 
      for (var t = 0; t <= 1 ; t += 1/(n * pas)) {
          for(var j = 1; j <= n; j++) {
              for (var i = 0; i <= n - j; i++) {
                  points[i][j] = new Phaser.Geom.Point(0, 0);
                  points[i][j].x = (1 - t) * points[i][j - 1].x + points[i + 1][j - 1].x * t
                  points[i][j].y = (1 - t) * points[i][j - 1].y + points[i + 1][j - 1].y * t
              }
          }
          
          // Affiche les points blancs
          //graphics.fillPointShape(points[0][n], 10);
          deCasteljauPoints.push(points[0][n]);
          
      }
    }
  
    return deCasteljauPoints
}  