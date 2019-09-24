var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ['red', 'blue', 'green', 'yellow'];

var level = 0;

var start = false;

$(document).on('keydown', function () {
    if (!start) {
        $('level-title').text('level ' + level);
        nextSequence();
        start = true;
    }
});

function nextSequence() {
    level++;
    $('#level-title').text('Level ' + level);
    var randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(200).fadeIn(200);
    userClickedPattern = [];
};

$('.btn').on('click', function (){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound();
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
});

function playSound (name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress (currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
};

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $('#level-title').text('Game Over Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
};

function startOver () {
    level = 0;
    gamePattern = [];
    start = false;
}

