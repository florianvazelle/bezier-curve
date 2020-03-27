// Configuration pour Phaser
var config = {
    width: 800, // Taille du canvas
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: {
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var pas = 1; // précision
var courbes = {
  index: 0,
  data: [
    { polygonPoints: [], deCasteljauPoints: [] }
  ]
};
var points; // tableau 2D de Point, avec P[numero du point][niveau/stade]
var graphics;

// Methode executé une seul fois au début
function create() {
    graphics = this.add.graphics();
  
    var currentCourbe = courbes.data[courbes.index]

    for (var i = 0; i < 4; i++) {
        currentCourbe[i] = []
    }

    // Points initiaux aux stade 0 => polygone de controle
    currentCourbe[0][0] = new Phaser.Geom.Point(150, 450);
    currentCourbe[1][0] = new Phaser.Geom.Point(260, 200);
    currentCourbe[2][0] = new Phaser.Geom.Point(460, 200);
    currentCourbe[3][0] = new Phaser.Geom.Point(600, 400);
  
    // A chaque fois que l'on clique 
    this.input.on('pointerdown', function (pointer) {
      // On ajoute un point
      courbes.data[courbes.index].push([new Phaser.Geom.Point(pointer.x, pointer.y)]);
    }, this);
    
    // A chaque fois que l'on presse une touche
    this.input.keyboard.on('keydown', function (event) {
      console.log(event)
      if (event.key == "+") {
        pas += 1;
      }
      
      if (event.key == "-") {
        pas = Math.max(pas - 1, 0);
      }
      
      if (event.key == "ArrowLeft") {
        courbes.index = Math.max(courbes.index - 1, 0);
      }
      if (event.key == "ArrowRight") {
        courbes.index = Math.min(courbes.index + 1, courbes.data.length);
      }
    }, this);
}

// Methode executé a chaque frame
function update() {
    const { polygonPoints } = courbes.data[courbes.index] 
  
    // Clear le canvas
    graphics.clear();
    graphics.fillStyle(0xfffffff); // Couleur des points
  
    // Dessine les traits verts
    graphics.lineStyle(2, 0x00ff00);
    for (var i = 0; i < points.length - 1; i++) {
        // Permet de dessiner les lignes entre les points (du stade 0)
        graphics.strokeLineShape(new Phaser.Geom.Line(polygonPoints[i][0].x, polygonPoints[i][0].y, polygonPoints[i + 1][0].x, polygonPoints[i + 1][0].y));
    }
    
    // On update deCasteljauPoints de la courbe courante
    courbes.data[courbes.index].deCasteljauPoints = deCasteljau(polygonPoints);
    displayDeCasteljau(courbes.data[courbes.index].deCasteljauPoints); 
}


function displayDeCasteljau(points) {
  // Dessine les traits verts
  graphics.lineStyle(2, 0x000000ff);
    for (var i = 0; i < points.length - 1; i++) {
      // Permet de dessiner les lignes entre les points (du stade 0)
      graphics.strokeLineShape(new Phaser.Geom.Line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y));
    }
}

// Algorithme de De Casteljau
function deCasteljau(points) {
    var deCasteljauPoints = []
  
    var n = points.length - 1; // Le pas
    for (var t = 0; t <= 1 ; t += 1/(n * pas)) {
        for(var j = 1; j <= n; j++) {
            for (var i = 0; i <= n - j; i++) {
                points[i][j] = new Phaser.Geom.Point(0, 0);
                points[i][j].x = (1 - t) * points[i][j - 1].x + points[i + 1][j - 1].x * t
                points[i][j].y = (1 - t) * points[i][j - 1].y + points[i + 1][j - 1].y * t
            }
        }
        
        deCasteljauPoints.push(points[0][n]);
      
        // Affiche les points blancs
        graphics.fillPointShape(points[0][n], 15);
    }
  
    return deCasteljauPoints
}


function deBoor(points) {
  
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