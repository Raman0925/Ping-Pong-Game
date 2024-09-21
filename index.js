const ball = document.getElementById("ball");
const table = document.getElementById('ping-pong-table');
const paddle = document.getElementById("paddle");
const startButton = document.getElementById("btn-start");
const stopButton = document.getElementById("btn-stop");

let gameRunning = false; // Game state
let gameLoopId;
let ballx = 50; 
let bally = 50;
let dx = 2;
let dy = 2;
let paddleY = 0;
const dpy = 5;

const mousecontrol = (event) => {
    const mouseDistanceFromTop = event.clientY;
    const distanceOfTableFromTop = table.offsetTop;
    const mousePointControl = mouseDistanceFromTop - distanceOfTableFromTop - paddle.offsetHeight / 2;

    // Ensure the paddle stays within the boundaries of the table
    paddleY = Math.max(0, Math.min(mousePointControl, table.offsetHeight - paddle.offsetHeight));
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

    // Add event listeners for controls
    document.addEventListener('keydown', controls);
    document.addEventListener('mousemove', mousecontrol);
};

const gameLoop = () => {
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

    // Request the next frame
    gameLoopId = requestAnimationFrame(gameLoop);
};

const startGame = () => {
    if (!gameRunning) {
        gameRunning = true; // Update game state
        startButton.disabled = true; // Disable start button
        stopButton.disabled = false; // Enable stop button
        pingpongloading(); // Initialize game loading
        gameLoop(); // Start the game loop
    }
};

const stopGame = () => {
    if (gameRunning) {
        gameRunning = false; // Update game state
        startButton.disabled = false; // Enable start button
        stopButton.disabled = true; // Disable stop button
        cancelAnimationFrame(gameLoopId); // Stop the game loop

        // Reset ball and paddle positions
        ballx = 50;
        bally = 50;
        paddleY = (table.offsetHeight - paddle.offsetHeight) / 2; // Center paddle
        ball.style.left = `${ballx}px`;
        ball.style.top = `${bally}px`;
        paddle.style.top = `${paddleY}px`;
    }
};

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
document.addEventListener('DOMContentLoaded', () => {
    stopGame(); // Ensure the game starts in a stopped state
});
