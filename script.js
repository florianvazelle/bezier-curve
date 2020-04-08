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
var translateSpeed = 2;
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
    this.input.mouse.disableContextMenu();
  
    graphics = this.add.graphics();
  
    for (var i = 0; i < 4; i++) {
        courbes.data[courbes.index].polygonPoints[i] = []
    }

    // Points initiaux aux stade 0 => polygone de controle
    courbes.data[courbes.index].polygonPoints[0][0] = new Phaser.Geom.Point(150, 450);
    courbes.data[courbes.index].polygonPoints[1][0] = new Phaser.Geom.Point(260, 200);
    courbes.data[courbes.index].polygonPoints[2][0] = new Phaser.Geom.Point(460, 200);
    courbes.data[courbes.index].polygonPoints[3][0] = new Phaser.Geom.Point(600, 400);
  
    // A chaque fois que l'on clique 
    this.input.on('pointerdown', function (pointer) {
      if (pointer.rightButtonDown()) {
        // On ajoute un point
        courbes.data[courbes.index].polygonPoints.push([new Phaser.Geom.Point(pointer.x, pointer.y),new Phaser.Geom.Point(pointer.x, pointer.y),new Phaser.Geom.Point(pointer.x, pointer.y)]);
      } else {
        //https://labs.phaser.io/view.html?src=src/geom\rectangle\contains%20point.js
           for(var i = 0; i< courbes.data[courbes.index].polygonPoints.length ; i++){
             
             
           }
      }
      
    }, this);
    
    // A chaque fois que l'on presse une touche
    this.input.keyboard.on('keydown', function (event) {
      console.log(event.key)
      if (event.key == "+") {
        pas += 1;
      }
      
      if (event.key == "-") {
        pas = Math.max(pas - 1, 0);
      }
      
      // configuration des touches
      if (event.key == "s") {
        // On ajoute un point
        courbes.data[courbes.index]
      }
      
      if (event.key == "i") {
        // On bouges les points vers le haut
        for (var i = 0; i < courbes.data[courbes.index].polygonPoints.length; i++) {
          courbes.data[courbes.index].polygonPoints[i][0].y -= translateSpeed;
        }
        console.log("Test Antoine")
      }
      
      if (event.key == "ArrowLeft") {
        courbes.index = Math.max(courbes.index - 1, 0);
      }
      
      if (event.key == "ArrowRight") {
        courbes.index = Math.min(courbes.index + 1, courbes.data.length);
        if (courbes.data[courbes.index] == undefined) {
          courbes.data[courbes.index] = { polygonPoints: [], deCasteljauPoints: [] }
        }
      }
      
      if (event.key == "Delete") {
        if (courbes.index < courbes.data.length && courbes.data.length > 1) {
          courbes.data.splice(courbes.index, 1);
          courbes.index = Math.min(Math.max(courbes.index, 0), courbes.data.length - 1);
        } else if(courbes.data.length == 1) {
          courbes.data = [{ polygonPoints: [], deCasteljauPoints: [] }]
          courbes.index = 0
        }
      }
      
    }, this);
}

// Methode executé a chaque frame
function update() {  
    const currentIndex = courbes.index
  
    // Clear le canvas
    graphics.clear();
    graphics.fillStyle(0xfffffff); // Couleur des points
  
    // Dessine les traits verts
    graphics.lineStyle(2, 0x00ff00);
    for (var i = 0; i < courbes.data.length; i++) {
        const { polygonPoints } = courbes.data[i] 
      
        for (var j = 0; j < polygonPoints.length - 1; j++) {
            // Permet de dessiner les lignes entre les points (du stade 0)
            graphics.strokeLineShape(new Phaser.Geom.Line(polygonPoints[j][0].x, polygonPoints[j][0].y, polygonPoints[j + 1][0].x, polygonPoints[j + 1][0].y));
        }
    }
    
    // On update deCasteljauPoints de la courbe courante
    courbes.data[currentIndex].deCasteljauPoints = deCasteljau(courbes.data[currentIndex].polygonPoints);
  
    for (var i = 0; i < courbes.data.length; i++) {
        const { deCasteljauPoints } = courbes.data[i] 
        displayDeCasteljau(deCasteljauPoints);
    }
}

function displayLine(points) {
    for (var i = 0; i < points.length - 1; i++) {
        // Permet de dessiner les lignes entre les points (du stade 0)
        graphics.strokeLineShape(new Phaser.Geom.Line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y));
    }  
}

function displayDeCasteljau(points) {
    // Dessine les traits verts
    graphics.lineStyle(2, 0x000000ff);
    displayLine(points)
}

function selectPoint(points){
  
}

// Algorithme de De Casteljau
function deCasteljau(points) {
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
          graphics.fillPointShape(points[0][n], 10);
          deCasteljauPoints.push(points[0][n]);
      }
    }
  
    return deCasteljauPoints
}