let attemptsCount = 0;
let winsCount = 0;
document.getElementById('rollButton').addEventListener('click', rollDice);

function rollDice() {
    const initialGif = document.querySelector('.initial-gif');
    const fastRollGif = document.querySelector('.fast-roll-gif');
    const diceElement = document.getElementById('dice');
    const confetti = document.querySelector('.confetti');
    initialGif.style.display = 'none';

    // Get the input number
    const inputNumber = parseInt(document.getElementById('number').value);

    // Validate if the input number is between 1 and 6
    if (inputNumber < 1 || inputNumber > 6 || isNaN(inputNumber)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please choose a number between 1 and 6.',
        });
        return;
    }

    // Increment the attempts count
    attemptsCount++;

   
        fastRollGif.style.display = 'flex';

        // Hide the fast roll gif after another 1 second
        setTimeout(() => {
            fastRollGif.style.display = 'none';
        }, 1000);
   

    // Reset the animation
    diceElement.style.animation = 'none';
    void diceElement.offsetWidth; // Trigger reflow
    diceElement.style.animation = 'rotateDice 1s ease-in-out forwards';

    // Hide the fast roll gif after 2 seconds
    setTimeout(() => {
        // Simulate the dice roll
        const randomNumber = Math.floor(Math.random() * 6) + 1;

        // Update the dice face with the corresponding image
        diceElement.innerHTML = `<img src="images/dice${randomNumber}.png" alt="Dice ${randomNumber}">`;

        // Check if the input number matches the rolled number
        if (inputNumber === randomNumber) {
            // Increment the wins count
            winsCount++;
            document.getElementById('result').innerText = 'Congratulations! You guessed correctly!';
            const diceSound = document.getElementById('cong');
            diceSound.currentTime = 1; // Reset sound to start
            diceSound.play();
            confetti.style.display = 'flex';

            // Hide the fast roll gif after another 1 second
            setTimeout(() => {
                confetti.style.display = 'none';
            }, 2500);
        } else {
            document.getElementById('result').innerText = 'Sorry! Try again.';
        }

        // Update the counters
        updateCounters();
    }, 1000);

    const diceSound = document.getElementById('diceSound');
    diceSound.currentTime = 1; // Reset sound to start
    diceSound.play();
}

function updateCounters() {
    // Display the counters
    document.getElementById('attemptsCounter').innerText = `Attempts: ${attemptsCount}`;
    document.getElementById('winsCounter').innerText = `Wins: ${winsCount}`;
}
