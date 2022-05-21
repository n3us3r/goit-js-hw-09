import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { revFormat } from "flatpickr/dist/utils/formatting";

const refs = {
	datePicker: document.querySelector('input#datetime-picker'),
	startBtn: document.querySelector('button[data-start]'),
	daysValue: document.querySelector('.value[data-days]'),
	hoursValue: document.querySelector('.value[data-hours]'),
	minutesValue: document.querySelector('.value[data-minutes]'),
	secondsValue: document.querySelector('.value[data-seconds]'),
}

let chosenDate = null;
let timerId = null;

refs.startBtn.setAttribute('disabled', 'true');
refs.startBtn.addEventListener('click', startTimeout);

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
	//   console.log(selectedDates[0]);
	//   chosenDate = selectedDates[0].valueOf();
	  chosenDate = selectedDates[0].getTime();
	  if (chosenDate < Date.now()) {
		  Notify.warning('Please choose a date in the future');
		  refs.startBtn.setAttribute('disabled', 'true');
		  return
	  } else {
		  refs.startBtn.removeAttribute('disabled');
	  }
	},
 };

function startTimeout() {
	timerId = setInterval(() => {
		const timeDif = chosenDate - Date.now();
		updateView(convertMs(timeDif));
		stopTimeOut(timeDif);
	}, 1000)
}

function stopTimeOut(timeCounter) {
	if (timeCounter <= 1000) {
		clearInterval(timerId);
		Notify.success("Countdown finished");
	}
}

function updateView({ days, hours, minutes, seconds }) {
	refs.daysValue.textContent = addLeadingZero(days);
	refs.hoursValue.textContent = addLeadingZero(hours);
	refs.minutesValue.textContent = addLeadingZero(minutes);
	refs.secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
	return String(value).padStart(2, 0);
}

function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
 
	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
	return { days, hours, minutes, seconds };
 }

 flatpickr(refs.datePicker, options);