function movePointsUp(tab) {
  // On bouges les points vers le haut
  for (var i = 0; i < tab.length; i++) {
    tab[i].y -= translateSpeed;
  }
}

function movePointsDown() {
  // On bouges les points vers le bas
  for (var i = 0; i < courbes.data[courbes.index].polygonPoints.length; i++) {
    courbes.data[courbes.index].polygonPoints[i].y += translateSpeed;
  }
}