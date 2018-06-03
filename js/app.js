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

function initGame() {

  const deck = document.querySelector('.deck');
  const cardHTML = shuffle(cards).map(function(card) { //shuffle deck and call generate card function
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join('');

}
startTime();
initGame();


const allCards = document.querySelectorAll('.card');
let cardsShowing = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      cardsShowing.push(card);
      card.classList.add('open', 'show');

    console.log(card.innerHTML);


      if (cardsShowing.length == 2) {
        if (cardsShowing[0].dataset.card == cardsShowing[1].dataset.card){ //if card matches remain open/show and match
          cardsShowing[0].classList.add('match', 'open', 'show');

          cardsShowing[1].classList.add('match', 'open', 'show');

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

const repeat = document.querySelector('.fa-repeat');
const replay = document.querySelector('.play-again');

repeat.addEventListener('click', function(e) {
  location.reload();
});

replay.addEventListener('click', function(e) {
  location.reload();
});



//timer
let clock = setInterval(startTime, 1000);
let timer = document.querySelector('.timer');

function startTime() {
  let d = new Date();
  let time = d.toLocaleTimeString();
  document.querySelector('.timer').innerHTML = time;
}

function stopTimer() {
    clearInterval(timer);
    timer.insertAdjacentHTML('beforeend', 'This game was ' +(parseInt(stopTimer) - parseInt(startTime)) + ' seconds');
}

stopTimer();
//modal box when game is won
const modal = document.querySelector('#modal');
const temp = document.querySelector('#temp'); //temporary button for testing.
const playAgain = document.querySelector('.play-again');

temp.onclick = function() {  //temporary button to test modal
  modal.style.display = 'block';
}

playAgain.onclick = function(){  //click to get rid of display
  modal.style.display = 'none';
}


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
