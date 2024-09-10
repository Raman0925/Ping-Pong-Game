const ball = document.getElementById("ball");
const table = document.getElementById('ping-pong-table');
const paddle = document.getElementById("paddle");

let ballx = 50; 
let bally = 50;
let dx = 2;
let dy = 2;
let paddleY = 0;
const dpy = 5;

const mousecontrol = (event) => {
    // Get the mouse position relative to the top of the document
    let mouseDistanceFromTop = event.clientY;

    // Calculate the mouse position relative to the top of the table
    let distanceOfTableFromTop = table.offsetTop;
    let mousePointControl = mouseDistanceFromTop - distanceOfTableFromTop - paddle.offsetHeight / 2;

    // Ensure the paddle stays within the boundaries of the table
    if (mousePointControl < 0) {
        paddleY = 0;
    } else if (mousePointControl > table.offsetHeight - paddle.offsetHeight) {
        paddleY = table.offsetHeight - paddle.offsetHeight;
    } else {
        paddleY = mousePointControl;
    }

    // Update the paddle's position
    paddle.style.top = `${paddleY}px`;
};

const controls = (event) => {
    event.preventDefault();
    if (event.keyCode === 38) { // Up arrow key
        paddleY = Math.max(0, paddleY - dpy);
    } else if (event.keyCode === 40) { // Down arrow key
        paddleY = Math.min(table.offsetHeight - paddle.offsetHeight, paddleY + dpy);
    }
    paddle.style.top = `${paddleY}px`;
};

const pingpongloading = () => {
    // Initialize ball position
    ball.style.top = `${bally}px`;
    ball.style.left = `${ballx}px`;

    // Start the game loop
    setInterval(exec, 16); // 60 FPS
    
    // Add event listeners for controls
    document.addEventListener('keydown', controls);
    document.addEventListener('mousemove', mousecontrol);
};

const exec = () => {
    // Update ball position
    ballx += dx;
    bally += dy;

    // Ball position updates
    ball.style.left = `${ballx}px`;
    ball.style.top = `${bally}px`;

    // Ball collision with the walls
    if (ballx + ball.offsetWidth > table.offsetWidth || ballx < 0) {
        dx *= -1;
    }
    if (bally + ball.offsetHeight > table.offsetHeight || bally < 0) {
        dy *= -1;
    }

    // Ball collision with the paddle
    if (ballx <= paddle.offsetLeft + paddle.offsetWidth &&
        bally + ball.offsetHeight >= paddle.offsetTop &&
        bally <= paddle.offsetTop + paddle.offsetHeight) {
        dx *= -1;
    }
};

document.addEventListener('DOMContentLoaded', pingpongloading);
