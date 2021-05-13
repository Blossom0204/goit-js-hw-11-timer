const daysRef = document.querySelector('span[data-value="days"]');
const hoursRef = document.querySelector('span[data-value="hours"]');
const minsRef = document.querySelector('span[data-value="mins"]');
const secsRef = document.querySelector('span[data-value="secs"]');

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.clockFace = document.querySelector(selector);
    this.targetDate = targetDate.getTime();

    this.start();
  }

  init() {
    const currentDate = Date.now();
    const time = this.targetDate-currentDate;

    this.getCountdown(time);
  }

  start() {
      this.intervalId = setInterval(() => {
      this.init();
    }, 1000);
  }
   
  getCountdown(time) {
    /*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
const hours = this.pad (Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    const newTime = { days, hours, mins, secs };
    updateClockface(newTime);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
};

const endDate = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 25, 2021'),
});

function  updateClockface({ days, hours, mins, secs }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minsRef.textContent = mins;
  secsRef.textContent = secs;
}