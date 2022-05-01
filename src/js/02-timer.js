import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
const TIMER_INTERVAL = 1000;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const selectedDate = selectedDates[0].getTime();
        const currentDate = Date.now();
        const ms = selectedDate - currentDate;

        if (selectedDate < currentDate) {
            Notify.failure('Please choose a date in the future');
            return;
        } else {
            refs.startBtn.disabled = false;

            timer.getCheckedTimeMs(ms);
        }
    },
};

flatpickr('#datetime-picker', options);

const timer = {
    checkedTimeMs: 0,
    checkedTimeData: {},
    intervalId: null,

    getCheckedTimeMs(ms) {
        this.checkedTimeMs = ms;
    },

    getCheckedTimeData(checkedTimeMs) {
        this.checkedTimeData = convertMs(checkedTimeMs);
    },

    startTimer() {
        refs.startBtn.disabled = true;
        Notify.success('Here we go!');

        this.intervalId = setInterval(() => {
            this.checkedTimeMs -= TIMER_INTERVAL;
            this.checkedTimeData = convertMs(this.checkedTimeMs);

            if (this.checkedTimeMs <= 1000) {
                this.stopTimer();
            }

            refs.days.textContent = String(this.checkedTimeData.days).padStart(2, '0');
            refs.hours.textContent = String(this.checkedTimeData.hours).padStart(2, '0');
            refs.minutes.textContent = String(this.checkedTimeData.minutes).padStart(2, '0');
            refs.seconds.textContent = String(this.checkedTimeData.seconds).padStart(2, '0');
        }, TIMER_INTERVAL);
    },

    stopTimer() {
        clearInterval(this.intervalId);
        Notify.success('Finish!');
    },
};

refs.startBtn.addEventListener('click', timer.startTimer.bind(timer));

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
