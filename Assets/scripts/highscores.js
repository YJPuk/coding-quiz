// Clearing Highscore by wiping local storage
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// Highscores obtained by reading local storage and function to display name with score
function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    //function that sorts scores according to value
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    //how the scores are printed on the highscore page
    highscores.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.name + " - " + score.score;
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
}

printHighscores();