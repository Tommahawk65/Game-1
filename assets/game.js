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
    ]
    
    
    const card = document.querySelectorAll('.card');
    document.getElementById("reset-btn").addEventListener('click', reset);
    document.getElementById("replay-btn").addEventListener('click', reset);
    cardArray.sort(() => 0.5 - Math.random())
    const grid = document.getElementById('game-content')
    
    function board() {
        for (let i = 0; i < cardArray.length; i++) {
            var gamecard = document.createElement('div')
            gamecard.className = 'card';
            gamecard.setAttribute('data-id', i)
            gamecard.innerHTML = '<img class="back-face" src="assets/images/pokeball.png" alt="back card">'
            grid.appendChild(gamecard)
            
        }
    }
    
    board()

})
