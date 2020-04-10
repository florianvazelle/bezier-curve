/* global Phaser Curve */
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
var selectedPoint = { index: -1 };
var courbes = {
  index: 0,
  data: [new Curve()]
};
var mouse = new Phaser.Geom.Point(0, 0);
var graphics;

// Methode executé une seul fois au début
function create() {
    this.input.mouse.disableContextMenu();
  
    graphics = this.add.graphics();

    // Points initiaux => polygone de controle
    courbes.data[courbes.index].polygonPoints[0] = new Phaser.Geom.Point(150, 450);
    courbes.data[courbes.index].polygonPoints[1] = new Phaser.Geom.Point(260, 200);
    courbes.data[courbes.index].polygonPoints[2] = new Phaser.Geom.Point(460, 200);
    courbes.data[courbes.index].polygonPoints[3] = new Phaser.Geom.Point(600, 400);
  
    // A chaque fois que l'on clique 
    this.input.on('pointerdown', pointerdown, this);
    this.input.on('pointermove', pointermove, this);
    this.input.on('pointerup', pointerup, this);
    
    // A chaque fois que l'on presse une touche
    this.input.keyboard.on('keydown', keydown, this);
}

// Methode executé a chaque frame
function update() {  
    const currentIndex = courbes.index
  
    // Clear le canvas
    graphics.clear();
    graphics.fillStyle(0xfffffff); // Couleur des points
    
    for (var i = 0; i< courbes.data[courbes.index].polygonPoints.length ; i++) {
      var point = courbes.data[courbes.index].polygonPoints[i]
      graphics.fillPointShape(point, 12);
      var rect = new Phaser.Geom.Rectangle(point.x - 10, point.y - 10, 20, 20);
      if (Phaser.Geom.Rectangle.ContainsPoint(rect, mouse)) {
          graphics.lineStyle(2, 0xfffffff);
          graphics.strokeRectShape(rect);
      }
    }
    
    // On update la courbe courante (deCasteljauPoints et deBoor)
    courbes.data[currentIndex].update()
  
    for (var i = 0; i < courbes.data.length; i++) {
        const { polygonPoints, deCasteljauPoints, bSplinePoints } = courbes.data[i]
        displayLine(polygonPoints, 0x00ff00);
        displayLine(deCasteljauPoints, 0x000000ff);
        displayLine(bSplinePoints, 0x0000ffff);
    }
  
    displayCenter(courbes.data[currentIndex]);
}

function displayLine(points, color) {
  graphics.lineStyle(2, color);
  for (var i = 0; i < points.length - 1; i++) {
      // Permet de dessiner les lignes entre les points
      graphics.strokeLineShape(new Phaser.Geom.Line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y));
    }  
}

function displayCenter(data) {
  graphics.fillStyle(0xfffff00);
  var center = data.center();
  var circle = new Phaser.Geom.Circle(center.x, center.y, 5);
  graphics.fillCircleShape(circle);
}

function pointerdown (pointer) {
  if (pointer.rightButtonDown()) {
    // On ajoute un point
    courbes.data[courbes.index].polygonPoints.push(new Phaser.Geom.Point(pointer.x, pointer.y));
  } else if(pointer.leftButtonDown()) {
    // On test tout les points pour savoir si le curseur en a selectionné un
    for (var i = 0; i< courbes.data[courbes.index].polygonPoints.length ; i++) {
      var point = courbes.data[courbes.index].polygonPoints[i]
      
      var rect = new Phaser.Geom.Rectangle(point.x - 10, point.y - 10, 20, 20);
      if (Phaser.Geom.Rectangle.ContainsPoint(rect, pointer)) {
        selectedPoint = { value: point, index: i };
      }
    }
  } 
}

function pointermove (pointer) {
  if (selectedPoint.index != -1) {
    selectedPoint.value.x = pointer.x;
    selectedPoint.value.y = pointer.y;
  }
  mouse.x = pointer.x;
  mouse.y = pointer.y;
}

function pointerup (pointer) {
  courbes.data[courbes.index].polygonPoints[selectedPoint.index] = selectedPoint.value;
  selectedPoint.index = -1
}

function keydown (event) {
  console.log(event.key)
  if (event.key == "+") pas += 1;      
  if (event.key == "-") pas = Math.max(pas - 1, 0);
      
  if (event.key == "i") {
    movePointsUp(courbes.data[courbes.index].polygonPoints, translateSpeed);
  }
      
  if (event.key == "k") {
    movePointsDown(courbes.data[courbes.index].polygonPoints, translateSpeed);
  }
      
  if (event.key == "j") {
    movePointsRight(courbes.data[courbes.index].polygonPoints, translateSpeed);
  }
      
  if (event.key == "l") {
    movePointsLeft(courbes.data[courbes.index].polygonPoints, translateSpeed);
  }
      
  if (event.key == "u") {
    rotatePointsRight(courbes.data[courbes.index], translateSpeed);
  }
      
  if (event.key == "ArrowLeft") {
    courbes.index = Math.max(courbes.index - 1, 0);
  }
      
  if (event.key == "ArrowRight") {
    courbes.index = Math.min(courbes.index + 1, courbes.data.length);
    if (courbes.data[courbes.index] == undefined) {
      courbes.data[courbes.index] = new Curve()
    }
  }
      
  if (event.key == "Delete") {
    if (courbes.index < courbes.data.length && courbes.data.length > 1) {
      courbes.data.splice(courbes.index, 1);
      courbes.index = Math.min(Math.max(courbes.index, 0), courbes.data.length - 1);
    } else if(courbes.data.length == 1) {
      courbes.data = [new Curve()]
      courbes.index = 0
    }
  }
      
}