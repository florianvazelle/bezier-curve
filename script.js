var config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: {
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var points;
var graphics;

// Methode executé une seul fois au début
function create() {
    graphics = this.add.graphics();

    points = []
    for (var i = 0; i < 4; i++) {
        points[i] = []
    }

    // Points initiaux aux stade 0
    points[0][0] = new Phaser.Geom.Point(150, 450);
    points[1][0] = new Phaser.Geom.Point(260, 200);
    points[2][0] = new Phaser.Geom.Point(460, 200);
    points[3][0] = new Phaser.Geom.Point(600, 400);
  
    // A chaque fois que l'on clique on ajoute un point
    this.input.on('pointerdown', function (pointer) {
      points.push([new Phaser.Geom.Point(pointer.x, pointer.y)]);
    }, this);
}

// Methode executé a chaque frame
function update() {
    // Clear le canvas
    graphics.clear();
    graphics.fillStyle(0xffffff);
  
    // Dessine les traits verts
    graphics.lineStyle(2, 0x00ff00);
    for (var i = 0; i < points.length - 1; i++) {
        // Permet de dessiner les lignes entre les points
        graphics.strokeLineShape(new Phaser.Geom.Line(points[i][0].x, points[i][0].y, points[i + 1][0].x, points[i + 1][0].y));
    }
    
    deCasteljau(points);
}

// Algorithme de De Casteljau
function deCasteljau(points) {
    var n = 3;
    for (var t = 0; t <= 1 ; t += 1/n) {
        for(var j = 1; j <= n; j++) {
            for (var i = 0; i <= n - j; i++) {
                points[i][j] = new Phaser.Geom.Point(0, 0);
                points[i][j].x = (1 - t) * points[i][j - 1].x + points[i + 1][j - 1].x * t
                points[i][j].y = (1 - t) * points[i][j - 1].y + points[i + 1][j - 1].y * t
            }
        }
        
        // Affiche les points blancs
        graphics.fillPointShape(points[0][n], 15);
    }
}