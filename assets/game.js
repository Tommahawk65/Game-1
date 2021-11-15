document.addEventListener('DOMContentLoaded', () => {
   
    const cardArray = [
        {
            name: 'bulbasaur',
            img: 'assets/images/bulba.png'
        },
        {
            name: 'bulbasaur',
            img: 'assets/images/bulba.png'
        },
        {
            name: 'butterfree',
            img: 'assets/images/butterfree.png'
        },
        {
            name: 'butterfree',
            img: 'assets/images/butterfree.png'
        },
        {
            name: 'charmander',
            img: 'assets/images/charmander.png'
        },
        {
            name: 'charmander',
            img: 'assets/images/charmander.png'
        },
        {
            name: 'meowth',
            img: 'assets/images/meowth.png'
        },
        {
            name: 'meowth',
            img: 'assets/images/meowth.png'
        },
        {
            name: 'pikachu',
            img: 'assets/images/pikachu.png'
        },
        {
            name: 'pikachu',
            img: 'assets/images/pikachu.png'
        },
        {
            name: 'squirtle',
            img: 'assets/images/squirtle.png'
        },
        {
            name: 'squirtle',
            img: 'assets/images/squirtle.png'
        },
    ];
    
    let flippedCard = false;
    let firstCard, secondCard;
    let pairs = 6;
    const card = document.querySelectorAll('.card');
    let cardsChosen = [];
    let cardsChosenId = [];
    document.getElementById("main-theme").play();
    document.getElementById("reset-btn").addEventListener('click', reset);
    cardArray.sort(() => 0.5 - Math.random());
    const grid = document.getElementById('game-content');
    
    
    function board() {
        for (let i = 0; i < cardArray.length; i++) {
            var gamecard = document.createElement('div');
            gamecard.className = 'card';
            gamecard.setAttribute('data-id', i);
            gamecard.innerHTML = '<img class="back-face" src="assets/images/pokeball.png" alt="back card">';
            gamecard.addEventListener('click', cardFlip);
            grid.appendChild(gamecard);
        }
            var donemsg = document.createElement('div');
            donemsg.id = 'done-msg';
            donemsg.innerHTML = '<p id="win-msg"></p><p>You Win!</p><button id="replay-btn">Play Again</button>';
            grid.appendChild(donemsg);
    }
    
    board();

    function cardFlip() {
        this.className = ('card flip');
        let cardId = this.getAttribute('data-id');
        var front = document.createElement('img');
        front.className = "front-face";
        front.src = cardArray[cardId].img;
        front.alt = "front card" ;
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
    
       
        if (this === firstCard) return;
        this.appendChild(front);
       
        if (!flippedCard) {
            flippedCard = true;
            firstCard = this;
        } else {
            flippedCard = false;
            secondCard = this;
            if (cardsChosen[0] === cardsChosen[1]) {
                
                match ();
    
            } else { 
                // Not a match
                flipBack ();    
            }
            cardsChosen = [];
            cardsChosenId = [];
        }

        // Check For Match 
        function match() {
            setTimeout(() => {
            firstCard.removeEventListener('click', cardFlip);
            firstCard.classList.add('green-light');
            secondCard.removeEventListener('click', cardFlip);
            secondCard.classList.add('green-light');
            document.getElementById("match-audio").play();
            }, 1200); 
            pairs --;
        }
        
        // Cards Dont Match
        function flipBack() {
            
            setTimeout(() => {
            
            firstCard.classList.add('red-light');
            secondCard.classList.add('red-light');
            document.getElementById("incorrect-audio").play();
            }, 1200);
        
            setTimeout(() => {
                firstCard.classList.remove('flip');
                firstCard.classList.remove('red-light');
                secondCard.classList.remove('flip');
                secondCard.classList.remove('red-light');
               
            }, 2600);
        }

    // Win Message
    if (pairs <= 0) {
        const done = document.getElementById('done-msg');
        document.getElementById("replay-btn").addEventListener('click', reset);
        setTimeout(() => {
        done.style.display = 'block';
       }, 1000);   
      }
    }

    function reset() {
        document.getElementById("game-content").innerHTML = ""
        setTimeout(() => {
            flippedCard = false;
            cardsChosen = [];
            cardsChosenId = [];
            pairs = 6;
            cardArray.sort(() => 0.5 - Math.random());
            card.forEach(cardBg => cardBg.classList.remove('flip'));
            board ();

            }, 800);
        }
            
           
            
          
    
            
        
       

});
