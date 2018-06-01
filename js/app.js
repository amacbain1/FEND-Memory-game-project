/*
 * Create a list that holds all of your cards
 */


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

const deck = document.querySelectorAll('.card');
const match = document.querySelectorAll('.match');
const cardsShowing = [];

deck.forEach(function(card) {
  card.addEventListener('click', function(e){
    if (cardsShowing.length === 2) {
      console.log('click');
    }else{
      cardsShowing.push(deck);
      card.classList.add('open', 'show');
    }
  });
});

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
