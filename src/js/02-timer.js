// Described in documentation
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

let selectedTime = null;
const currentDate = Date.now();

const startInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000));
// console.log(convertMs(140000));
// console.log(convertMs(24140000));

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
  };

  const flatpickrEl = new flatpickr(startInput, options);
  startBtn.addEventListener('click', updateClockRun);

  function updateClockRun(){

    const intervalId = setInterval(() => {
        const timeDifference = selectedTime - currentDate;
        days.textContent = convertMs(timeDifference).days;
        hours.textContent = convertMs(timeDifference).hours;
        minutes.textContent = convertMs(timeDifference).minutes;
        seconds.textContent = convertMs(timeDifference).seconds;

        startBtn.disabled = true;

        flatpickrEl.input.setAttribute("disabled", "disabled")
        if (timeDifference < 1000) {
            clearInterval(intervalId);
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            startBtn.disabled = false;
            startInput.disabled = true;
            flatpickrEl.input.disabled = false;
        }
    }, 1000);
}

function pad(value) {
  return String(value).padStart(2,"0")
}