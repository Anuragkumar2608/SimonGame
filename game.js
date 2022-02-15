buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];

var fired = false;

var level = 0;

$(document).on("keydown", function() {
  if (!fired) {
    nextSequence();
    fired = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("Success");
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
      console.log("Next Sequence Called");
    }
  } else {
    console.log("Wrong");
    userClickedPattern = [];
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3 + 1);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  console.log("Level " + level);
  $("#level-title").text("Level " + level);
  $("." + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  return randomChosenColour;
}

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
})

function playSound(name) {
  var src = "sounds/" + name + ".mp3"
  var audio = new Audio(src);
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  fired = false;
}
