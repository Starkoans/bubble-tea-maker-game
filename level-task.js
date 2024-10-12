import {
	itemsArr,
	capsArr,
	milksArr,
	teabasesArr,
	toppingsArr,
} from './items.js';
import { droppedListArr } from './main.js';
import { cleanDropareas } from './main.js';

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Обмен элементов
	}
	return array;
}

let taskContainer = document.querySelector('.task');
let taskListArr = [];
let timer = document.querySelector('.timer');
let startBtn = document.querySelector('.start-btn');

function loadNewList() {
	taskListArr = [];
	taskContainer.innerHTML = '';

	let shuffledArr = [
		teabasesArr[Math.floor(Math.random() * 4)],
		toppingsArr[Math.floor(Math.random() * 4)],
		milksArr[Math.floor(Math.random() * 4)],
		capsArr[Math.floor(Math.random() * 4)],
	];

	let taskList = document.createElement('ul');

	shuffledArr.forEach((item) => {
		let li = document.createElement('li');
		li.dataset.id = item.id;
		li.innerText = item.title;
		taskList.appendChild(li);
		taskListArr.push(String(item.id));
	});

	taskContainer.appendChild(taskList);
}

let scoreContainer = document.querySelector('.score');
let score = 0;
let recordContainer = document.querySelector('.record');
if (localStorage.getItem('record')) {
	recordContainer.innerText = localStorage.getItem('record');
}

startBtn.onclick = function () {
	if (localStorage.getItem('record')) {
		recordContainer.innerText = localStorage.getItem('record');
	}
	let counter = 60;
	score = 0;
	startBtn.disabled = true;
	timer.innerText = counter;
	let counterID = setInterval(() => {
		counter = counter - 1;
		timer.innerText = counter;
		console.log(taskListArr, droppedListArr);
		if (counter === 0) {
			clearInterval(counterID);
			startBtn.disabled = false;
			if (localStorage.getItem('redord') < score) {
				localStorage.setItem('record', score);
			}
		}

		if (isTaskComplete() === true) {
			loadNewList();
			score++;
			scoreContainer.innerText = score;
			cleanDropareas();
		}
	}, 1000);
};

function isTaskComplete() {
	let check = [false];
	taskListArr.forEach((taskItemID, ind) => {
		let isFind = droppedListArr.indexOf(taskItemID) > -1;
		console.log(isFind);
		if (isFind) {
			check[ind] = true;
		} else check[ind] = false;
	});
	if (check.filter((elem) => elem !== true).length > 0) return false;
	else return true;
}

loadNewList();
