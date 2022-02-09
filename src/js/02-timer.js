import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/material_blue.css');

const startButtonRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const options = {
  altInput: true,
  altFormat: 'F j, Y (h:S K)',
  dateFormat: 'Y-m-d H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      startButtonRef.setAttribute('disabled', true);
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      startButtonRef.removeAttribute('disabled');
      Notiflix.Notify.success("timer started");
    }
  },
};
const flatpickrRef = flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onStart }) {
    this.selectedTime = null;
    this.intervalId = null;
    this.onStart = onStart;
    startButtonRef.setAttribute('disabled', true);
  }
  start() {
    this.selectedTime = flatpickrRef.selectedDates[0].getTime();

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
    flatpickrRef.setDate(new Date());
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

startButtonRef.addEventListener('click', timer.start.bind(timer));

function updateClock({ days, hours, minutes, seconds }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}























