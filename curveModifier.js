function movePointsUp(tab, speed) {
  // On bouges les points vers le haut
  for (var i = 0; i < tab.length; i++) {
    tab[i].y -= speed;
  }
}

function movePointsDown(tab, speed) {
  // On bouges les points vers le haut
  for (var i = 0; i < tab.length; i++) {
    tab[i].y += speed;
  }
}

function movePointsRight(tab, speed) {
  // On bouges les points vers le haut
  for (var i = 0; i < tab.length; i++) {
    tab[i].x -= speed;
  }
}

function movePointsLeft(tab, speed) {
  // On bouges les points vers le haut
  for (var i = 0; i < tab.length; i++) {
    tab[i].x += speed;
  }
}

function rotatePointsRight(data, speed) {
  console.log(data.center());
}