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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
//startTime();

const allCards = document.querySelectorAll('.card');
let cardsShowing = [];
let cardsMatch = [];
let winning = 0;
let moves = document.querySelector('.moves');
let move = 0;


allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      cardsShowing.push(card);
      card.classList.add('open', 'show');
      move++;

    moves.innerHTML = move / 2;  
    console.log(move + " moves");


      if (cardsShowing.length == 2) {
        if (cardsShowing[0].dataset.card == cardsShowing[1].dataset.card){ //if card matches remain open/show and match
          cardsShowing[0].classList.add('match', 'open', 'show');
          //add moves and display modal at end of game.
          winning++;
          if (winning === 8){
            modal.style.display = 'block';
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


//timer

let second = -1;
    second = setInterval(startTime, 1000);
let minute = 0;
let timer = document.querySelector('.timer');

//document.querySelectorAll('.card').addEventListener('click', function(e) {
  //console.log("click");
function startTime() {
    //second = setInterval(startTime, 1000);
  second++;
    if (second >= 60) {
      minute++;
      second = "0";
    }
    function clearInterval() {        //Does not work!!
      if (cardsMatch.length == 16) {
      }
    }
    document.querySelector('.timer').innerHTML = minute + ':' + second;
  }

startTime();

/*function stopTime() {
  clearInterval(timer);
  if (cardsMatch.length == 16) {
  }
stopTime();*/


//star rating
let stars = document.querySelector('.stars');

function removeStars() {
  let removeOne = document.querySelector('.remove-one');
  let removeTwo = document.querySelector('.remove-two');

  if (moves >= '25') { //****Change to integer once you have counter working!!!***
      removeOne.remove();
  }
  if (moves >= '40') {   //****Change to integer once you have counter working!!!***
    removeTwo.remove();
  }
}
removeStars();

//modal box when game is won
const modal = document.querySelector('#modal');
const playAgain = document.querySelector('.play-again');


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
