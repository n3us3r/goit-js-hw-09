import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formField =  document.querySelector('.form');
formField.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
	e.preventDefault();

	let {delay, step, amount} = e.currentTarget.elements;
	delay = Number(delay.value);
	step = Number(step.value);
	amount = Number(amount.value);

	for (let position = 1; position <= amount; position += 1) {
		createPromise(position, delay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delay += step;
	}
	e.currentTarget.reset();
}


function createPromise(position, delay) {
	const shouldResolve = Math.random() > 0.3;
	return new Promise((resolve, reject) => {
	setTimeout(() => {
		if (shouldResolve) {
			resolve( {position, delay} );
		  // Fulfill
		} else {
			reject( {position, delay} );
		  // Reject
		}
	}, delay)

})
}