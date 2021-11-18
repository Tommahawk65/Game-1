document.addEventListener('DOMContentLoaded', () => {
   
    // Hidden Pokemon 
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

    // Initialise Game
    let gamePause = true;
    let flippedCard = false;
    let firstCard, secondCard;
    let pairs = 6;
    let cardsChosen = [];
    let cardsChosenId = [];
    let winAudio = document.getElementById("win-audio");
    let mainTheme = document.getElementById("main-theme");
    document.getElementById("reset-btn").addEventListener('click', reset);
    document.getElementById("start-btn").addEventListener('click', () => {    
        hideWelcome();
        resetAudio();    
    });
    cardArray.sort(() => 0.5 - Math.random()); // Shuffle Cards
    const grid = document.getElementById('game-board');

    // Hide Welcome Message
    function hideWelcome() {
        gamePause = false;
        const begin = document.getElementById("intro-msg");
        begin.style.display = 'none';
    }
    
    // Restart Main Audio & Pause Win Audio 
    function resetAudio () {
        mainTheme.currentTime=0;
        mainTheme.play();
        winAudio.pause();
    }
    
    // Build Gameboard
    function board() {
        for (let i = 0; i < cardArray.length; i++) {
            var gamecard = document.createElement('div');
            gamecard.className = 'pokeball';
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

    // Flip Over Cards
    function cardFlip() {
        if (gamePause) {return;}
        gamePause = false;
        this.className = ('pokeball flip');
        let cardId = this.getAttribute('data-id');
        var front = document.createElement('img');
        front.className = "front-face";
        front.src = cardArray[cardId].img;
        front.alt = "front card" ;
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        if (this === firstCard) return;
        this.appendChild(front);

        // Check Match
        if (!flippedCard) {
            flippedCard = true;
            firstCard = this;
            gamePause = false;
        } else {
            flippedCard = false;
            secondCard = this;
        
            if (cardsChosen[0] === cardsChosen[1]) {  
                match ();
            } else { 
                flipBack ();    
            }
            cardsChosen = [];
            cardsChosenId = [];
        } 
       // Win Message
       if (pairs <= 0) {
        const done = document.getElementById('done-msg');
        document.getElementById("replay-btn").addEventListener('click', reset);
        setTimeout(() => {
        done.style.display = 'block';
        winAudio.currentTime=0;
        winAudio.play();
        mainTheme.pause();
        }, 1000);   
      }
    }

    // Cards Match 
    function match() {
        gamePause = true;
        setTimeout(() => {
        firstCard.removeEventListener('click', cardFlip);
        firstCard.classList.add('green-light');
        secondCard.removeEventListener('click', cardFlip);
        secondCard.classList.add('green-light');
        document.getElementById("match-audio").play();
        }, 1600); 
        pairs --;
        setTimeout(() => {
            gamePause= false;
        }, 3000);
    }
        
    // Dont Match
    function flipBack() {
        gamePause = true;
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
        setTimeout(() => {
        gamePause= false;
        }, 3000);
    }

    // Wipe Game Board
    function reset() {
        document.getElementById("game-board").innerHTML = ""
        setTimeout(() => {
            flippedCard = false;
            cardsChosen = [];
            cardsChosenId = [];
            pairs = 6;
            cardArray.sort(() => 0.5 - Math.random());
            board ();
            resetAudio();
        }, 800);
    } 
});
