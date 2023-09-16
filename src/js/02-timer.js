// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.
// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.
// Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.
// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість в документації «Options», і використовуй його у своєму коді.

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
require("flatpickr/dist/themes/dark.css")

const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      startBtn.setAttribute('disabled', true);
      Notiflix.Notify.failure("Please choose a date in the future!");
    } else {
      startBtn.removeAttribute('disabled');
      Notiflix.Notify.success("Congratulations! The timer has started.");
    }
  },
};
const calendar = flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onStart }) {
    this.selectedTime = null;
    this.intervalId = null;
    this.onStart = onStart;
    startBtn.setAttribute('disabled', true);
  }
  start() {
    this.selectedTime = calendar.selectedDates[0].getTime();

    this.intervalId = setInterval(() => {
      const deltaTime = this.selectedTime - Date.now();

      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        return;
      }

      const convertedTime = this.convertMs(deltaTime);
      this.onStart(convertedTime);
    }, 1000);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  reset() {
    clearInterval(this.intervalId);
    calendar.setDate(new Date());
    daysRef.textContent = '';
    hoursRef.textContent = '';
    minutesRef.textContent = '';
    secondsRef.textContent = '';
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onStart: updateClock,
});

startBtn.addEventListener('click', timer.start.bind(timer));

function updateClock({ days, hours, minutes, seconds }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}

    
    

















