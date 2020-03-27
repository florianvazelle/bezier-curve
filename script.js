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

var lines;
var points;
var graphics;

function create() {
    graphics = this.add.graphics();

    points = []
    for (var i = 0; i < 4; i++) {
        points[i] = []
    }

    points[0][0] = new Phaser.Geom.Point(150, 450);
    points[1][0] = new Phaser.Geom.Point(260, 200);
    points[2][0] = new Phaser.Geom.Point(460, 200);
    points[3][0] = new Phaser.Geom.Point(600, 400);
  
    this.input.on('pointerdown', function (pointer) {
      console.log('here')
      points.push([new Phaser.Geom.Point(pointer.x, pointer.y)]);
    }, this);
    
    console.log(points)
    deCasteljau(points);
}

function update() {
    graphics.clear();
    graphics.fillStyle(0xffffff);
    graphics.lineStyle(2, 0x00ff00);
    for (var i = 0; i < points.length - 1; i++) {
        graphics.strokeLineShape(new Phaser.Geom.Line(points[i][0].x, points[i][0].y, points[i + 1][0].x, points[i + 1][0].y));
    }
    
}

function deCasteljau(points) {
    var n = 3;
    for (var t = 0; t < 1 ; t += 1/n) {

        for(var j = 1; j < n; j++) {
            for (var i = 0; i < n - j; i++) {
                points[i][j] = (1 - t) * points[i][j - 1] + points[i + 1][j - 1]
            }
        }

        graphics.fillPointShape(new Phaser.Geom.Point(points[0][n], points[0][n]), 15);
    }
  
    console.log(points)
}