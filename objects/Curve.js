class Curve {
  constructor() {  
    this.polygonPoints = []
    this.deCasteljauPoints = []
    this.bSplinePoints = []  
  }
  
  update () {
    this.deCasteljauPoints = deCasteljau(this.polygonPoints);
    this.bSplinePoints = applyDeBoor(this.polygonPoints);
  }
  
  center () {
    var center = new Phaser.Geom.Point(0, 0);
    var pointsTab = this.polygonPoints;
    for (var i = 0; i < pointsTab.length; i++) {
      center.x += pointsTab[i].x;
      center.y += pointsTab[i].y;
    }
    center.x = center.x / pointsTab.length;
    center.y = center.y / pointsTab.length;
    return center;
  }
}