/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
               'fa-paper-plane-o', 'fa-paper-plane-o',
               'fa-anchor', 'fa-anchor',
               'fa-bolt', 'fa-bolt',
               'fa-cube', 'fa-cube',
               'fa-leaf', 'fa-leaf',
               'fa-bicycle', 'fa-bicycle',
               'fa-bomb', 'fa-bomb'];

function generateCard(card) {    //generate interactive card list with data-card
  return `<li class="card" data-card=${card}><i class="fa ${card}"></i></li>`;
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
const deck = document.querySelector('.deck');
function initGame() {


  const cardHTML = shuffle(cards).map(function(card) { //shuffle deck and call generate card function
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join('');

}

initGame();


const allCards = document.querySelectorAll('.card');
let cardsShowing = [];
let cardsMatch = [];
let winning = 0;
let moves = document.querySelector('.moves');
let move = 0;

//flip and match cards
allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      cardsShowing.push(card);
      card.classList.add('open', 'show');


      if (cardsShowing.length == 2) {
        if (cardsShowing[0].dataset.card == cardsShowing[1].dataset.card){ //if card matches remain open/show and match
          cardsShowing[0].classList.add('match', 'open', 'show');
          //add moves and display modal at end of game.
          winning++;
          if (winning === 8){
            modal.style.display = 'block';
            stopTime(); //stop clock
          }

          cardsShowing[1].classList.add('match', 'open', 'show');
          cardsMatch.push(card);
          cardsShowing = [];

        }else {
          setTimeout(function(){  //if card does not match, remove classes
            cardsShowing.forEach(function(card) {
              card.classList.remove('open', 'show');
          });
          cardsShowing = [];
        }, 600);
      }
      }
    }
  });
});

//count Moves-change star level
let stars = document.querySelector('.fa-star');
let starOne = document.querySelector('.remove-one');
let starTwo = document.querySelector('.remove-two');
let starCount = 3;
let modal = document.querySelector('#modal');

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    move++
    if (move >= 24) {
      starOne.remove();  //removes one star
      starCount = 2;
      //document.querySelector('.star-rating').innerHTML = ' Your star rating is ' + starCount;

    }

    if (move >= 30) {
      starTwo.remove();  //removes second star
      starCount = 1;
    }
    document.querySelector('.star-rating').innerHTML = ' Your star rating is ' + starCount;
    moves.innerHTML = Math.ceil(move / 2);  //displays number of moves made
    document.querySelector('.modal-moves').innerHTML = 'Number of moves ' + Math.ceil(move / 2);
  });
});


const playAgain = document.querySelector('.play-again');
let modalTime = document.querySelector('.modal-time');

//game timer
let second = 0,
    minute = 0,
    timer  = setInterval(startTime, 1000);
let finishTime = '';

let timerElement = document.querySelector('.timer');
//let modal = document.querySelector('#modal');

function startTime() {
  second++;
    if (second >= 60) {
      minute++;
      second = 0;
    }
  finishTime = minute + ' minutes : ' + second +' seconds';
  document.querySelector('.modal-time').innerHTML = 'Your time is ' + finishTime;
  document.querySelector('.timer').innerHTML = minute + ' minutes : ' + second +' seconds';

  }
startTime();

//stop timer function
function stopTime() {
  clearInterval(timer);
}




//modal box when game is won
//const modal = document.querySelector('#modal');
/*const playAgain = document.querySelector('.play-again');
let modalStars = document.querySelector('.star-rating');
let modalTime = document.querySelector('.modal-time');*/



//TEST BUTTON FOR MODAL
document.querySelector('#myBtn').onclick = function() { //button for testing
    modal.style.display = "block";
  }



playAgain.onclick = function(){  //click to get rid of display
  modal.style.display = 'none';
}



//restart game
const repeat = document.querySelector('.fa-repeat');
const replay = document.querySelector('.play-again');

repeat.addEventListener('click', function(e) {
  location.reload();
});

replay.addEventListener('click', function(e) {
  location.reload();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
