// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).


const bodyColor = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

btnStart.addEventListener('click', () => {
    timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    bodyColor.style.backgroundColor = randomColor;
    }, 1000);

    btnStart.disabled = true;
    btnStop.disabled = false;
});

btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
});





      