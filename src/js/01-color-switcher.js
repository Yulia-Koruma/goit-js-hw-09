function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const bodyStyleRef = document.querySelector('body');
const startButtonRef = document.querySelector('button[data-start]');
const stopButtonRef = document.querySelector('button[data-stop]');

let getInterval;

const letChangeColor = () => {
    bodyStyleRef.style.backgroundColor = getRandomHexColor();
    getInterval = setInterval(() => {
        bodyStyleRef.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startButtonRef.disabled = true;
    stopButtonRef.disabled = false;
};

startButtonRef.addEventListener('click', letChangeColor);

stopButtonRef.addEventListener('click', () => {
    clearInterval(getInterval);
    stopButtonRef.disabled = true;
    startButtonRef.disabled = false;

}
);
