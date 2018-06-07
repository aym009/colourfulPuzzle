var ColourfulPuzzle = function (colours, numOfColour) {
  this.colours = colours;
  this.numOfColour = 7;
  this.coloursArr = this.createColourArr();
  this.correctAnswer = this.getAnswer();
};

var colours = [
  //set random colours
  randomColour01 = {
    randomR: Math.floor(Math.random() * 256),
    randomG: Math.floor(Math.random() * 256),
    randomB: Math.floor(Math.random() * 256)
  },
  randomColour02 = {
    randomR: Math.floor(Math.random() * 256),
    randomG: Math.floor(Math.random() * 256),
    randomB: Math.floor(Math.random() * 256)
  }
];

ColourfulPuzzle.prototype.getNewValue = function(value1, value2) {
  // make RGB values between randomeColour01 & 02
  var array = [];
  var newValue = value1;
  if (value1 > value2) {
    var valueDiff = Math.floor((value1 - value2) / (this.numOfColour - 1));
    for (var i = 0; i < 5; i++) {
      newValue -= valueDiff;
      array.push(newValue);
    }
  } else {
    var valueDiff = Math.floor((value2 - value1) / (this.numOfColour - 1));
    for (var i = 0; i < 5; i++) {
      newValue += valueDiff;
      array.push(newValue);
    } 
  }
  return array;
}

ColourfulPuzzle.prototype.createColourArr = function() {
  var arrayR = this.getNewValue(this.colours[0].randomR, this.colours[1].randomR);
  var arrayG = this.getNewValue(this.colours[0].randomG, this.colours[1].randomG);
  var arrayB = this.getNewValue(this.colours[0].randomB, this.colours[1].randomB);
  var array = [];
  for (var i = 0; i < arrayR.length; i++) {
    array.push({name: '0' + i,  rgb: 'rgb(' + arrayR[i] + ',' + arrayG[i] + ',' + arrayB[i] + ')'});
  }
  //shuffle colours
  for (var i = array.length - 1; i >= 0; i--){
    var shuffleColours = Math.floor( Math.random() * ( i + 1 ) );
    [array[i], array[shuffleColours]] = [array[shuffleColours], array[i]]
  }
  return array;
}

ColourfulPuzzle.prototype.getAnswer = function() {
  var answer = [];
  for (var i = 0; i < this.coloursArr.length; i++) {
    answer.push(this.coloursArr[i].name);
  }
  answer.sort(function(a, b) {
    if (a < b) return -1;
    if (a > b) return +1;
    return 0;
  });
  return answer.join("");
}

$(document).ready(function () {
  var game = new ColourfulPuzzle(colours, 7);
  var userAnswer = "";
  var moveCounter = 0;

  $('.colour-start').css('background', 'rgb(' + colours[0].randomR + ',' + colours[0].randomG + ',' + colours[0].randomB + ')');
  $('.colour-end').css('background', 'rgb(' + colours[1].randomR + ',' + colours[1].randomG + ',' + colours[1].randomB + ')');
  
  for (var i = 0; i < (game.numOfColour - 2); i++) {
    $('#colour-palette > .palette0' + i).css('background', game.coloursArr[i].rgb).attr('id', game.coloursArr[i].name);
  }

  $("#box, #colour-palette" ).sortable({
    items: '> div:not(:first-child)',
    connectWith: '.connectedSortable',
    update: function(event, ui) {
      moveCounter++;
      var result = $('#box').sortable("toArray");
      console.log(result);
      if (result.length >= (game.numOfColour - 2)) {
        userAnswer = result.join("");
      }
      if (userAnswer === game.correctAnswer) {
        $('.overlay').fadeIn();
        console.log('correct');
      } 
      console.log(moveCounter, game.correctAnswer);
    }
    // var getClass = ui.item.closest('div').attr('class').split(' ')[0];
    // var c = $('.' + getClass).next();
    // console.log(c);
  }).disableSelection();

  $(".play").click(function() {
    $('.overlay').fadeOut();
    location.reload();
  });
  $(".close").click(function() {
    $('.overlay').fadeOut();
  });
  
});
  
