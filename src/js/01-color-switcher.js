const refs = {
	startButton: document.querySelector('button[data-start]'),
	stopButton: document.querySelector('button[data-stop]'),
	colorWindow: document.querySelector('body'),
}

const changeColor = () => {
	refs.colorWindow.style.backgroundColor = getRandomHexColor();
}
let firstTimer = null;

window.addEventListener('click', (e) => {
	if (e.target === refs.startButton) {
		firstTimer = setInterval(changeColor, 1000);
		e.target.setAttribute('disabled', true);
		
	} else if (e.target === refs.stopButton) {
		clearInterval(firstTimer);
		refs.startButton.removeAttribute('disabled');
	}
});



function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
 }
