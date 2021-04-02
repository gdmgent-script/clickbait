let dot; // declareren, maar nog niet toewijzen
let amountClicks = 0;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const btnStart = document.querySelector('#btnStart');


const randomColor = () => {
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255); 
    return `rgb(${red}, ${green}, ${blue})`;
}

const makeDot = () => {
    // dom element: div
    dot = document.createElement('div');

    // class: hideandseek
    dot.className = 'hideandseek';

    // in body plaatsen
    document.body.appendChild(dot);
}

const moveDot = () => {
    // random positie tussen 0 en breedte van het scherm-breedtevdbol
    const randomLeft = Math.abs(Math.floor(Math.random() * windowWidth) - dot.offsetWidth);
    const randomTop = Math.abs(Math.floor(Math.random() * windowHeight) - dot.offsetHeight);
    // positie instellen door css te wijzigen
    dot.style.left = randomLeft +'px';
    dot.style.top = randomTop +'px';
}

const clickDot = (event) => {
    
    amountClicks++; // een waarde verhogen
    document.querySelector('#score-span').innerHTML = amountClicks;

    // kleur veranderen
    dot.style.backgroundColor = randomColor();
}

const gameOver = () => {
    document.body.innerHTML = 'GAME OVER, you clicked ' + amountClicks + ' times';
}

const startGame = (difficulty = 'easy', stopAfter = 10) => {
    let speed;
    switch(difficulty) {
        case 'hard' : 
            speed = 500;
            break;
        case 'medium':
            speed = 1500;
            break;
        case 'easy':
        default:
            speed = 3000;
            break
    }

    // maak de dot en voeg die toe aan de body
    makeDot();

    // interval logic
    moveDot(); // voer het meteen een eerste keer uit
    const intervalDot = setInterval(moveDot, speed); // na 3 seconden + elke 3 seconden

    // na een bepaalde tijd stoppen we het interval
    setTimeout( () => { 
        clearInterval(intervalDot); 
        gameOver();
    }, stopAfter * 1000 );


    // click logic
    dot.addEventListener('click', clickDot);
}

// start na klik op de knop
btnStart.addEventListener('click', () => { startGame('medium', 10) });

