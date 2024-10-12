import {
	itemsArr,
	capsArr,
	milksArr,
	teabasesArr,
	toppingsArr,
} from './items.js';
import { droppedListArr } from './main.js';
import { cleanDropareas } from './main.js';

let taskContainer = document.querySelector('.task');
let taskListArr = [];
let timer = document.querySelector('.timer');
let startBtn = document.querySelector('.start-btn');
let restartBtn = document.querySelector('.restart-btn');

let startModal = document.getElementById('startGameModal');
let endModal = document.getElementById('endGameModal');

// startModal.style.display = 'flex';
console.log(startModal);

let scoreContainer = document.querySelector('.score');

let records = JSON.parse(localStorage.getItem('records')) || [];

startBtn.onclick = () => {
	startGame();
};
restartBtn.onclick = () => {
	startGame();
};
let character = document.querySelector('.character');
let charactersArr = [
	{ id: 1, img: './customer_1.png' },
	{ id: 2, img: './customer_2.png' },
	{ id: 3, img: './customer_3.png' },
	{ id: 4, img: './customer_4.webp' },
	{ id: 5, img: './customer_5.webp' },
];
function loadNewList() {
	taskListArr = [];
	taskContainer.innerHTML = '';

	let randomIndex = Math.floor(Math.random() * charactersArr.length);
    let randomCharacter = charactersArr[randomIndex];

   
    character.style.backgroundImage = `url(${randomCharacter.img})`;
    
	let shuffledArr = [
		teabasesArr[Math.floor(Math.random() * 4)],
		toppingsArr[Math.floor(Math.random() * 4)],
		milksArr[Math.floor(Math.random() * 4)],
		capsArr[Math.floor(Math.random() * 4)],
	];

	let taskList = document.createElement('div');

	shuffledArr.forEach((item) => {
		let li = document.createElement('div');
		li.dataset.id = `${item.id}-tasklist`;
		let img = document.createElement('img');
		img.src = item.img;
		img.alt = item.title;
		img.style.borderRadius = '6px';
		img.style.height = '100px';
		img.style.width = '100px';
		li.appendChild(img);
		li.classList.add(`${item.category}`);
		li.style.borderRadius = '10px';
		// li.appendChild(item.title);
		taskList.appendChild(li);
		taskListArr.push(String(item.id));
	});

	taskContainer.appendChild(taskList);
}

function displayRecords() {
	const recordList = document.querySelector('.record');
	recordList.innerHTML = '';

	records.forEach((record, index) => {
		const li = document.createElement('li');
		li.textContent = `${index + 1}. ${record.name} - ${record.score}`;
		recordList.appendChild(li);
	});
}
let playerName = document.getElementById('playerName');
playerName.focus();
let currentGameCount = Number(localStorage.getItem('gameCount')) + 1 || 1;
localStorage.setItem('gameCount', currentGameCount);

playerName.value =
	localStorage.getItem('playername') || `Player ${currentGameCount}`;

function addRecord() {
	const newRecord = {
		name: playerName.value,
		score: parseInt(score),
	};
	records.push(newRecord);
	records.sort((a, b) => b.score - a.score);

	localStorage.setItem('records', JSON.stringify(records));

	displayRecords();
}

displayRecords();

function startGame() {
	startModal.style.display = 'none';
	endModal.style.display = 'none';
	displayRecords();
	cleanDropareas();
	loadNewList();

	let score = 0;
	let counter = 60;
	let prevTaskEndTime = counter;

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
			addRecord();
			endModal.style.display = 'block';
		}

		if (isTaskComplete() === true) {
			loadNewList();
			console.log(prevTaskEndTime);
			console.log(counter);
			score += 25 - (prevTaskEndTime - counter);
			scoreContainer.innerText = score;
			cleanDropareas();
			prevTaskEndTime = counter;
		}
	}, 1000);
}

function isTaskComplete() {
	let check = [false];
	taskListArr.forEach((taskItemID, ind) => {
		let isFind = droppedListArr.map((item) => item.id).indexOf(taskItemID) > -1;
		console.log(isFind);
		if (isFind) {
			check[ind] = true;
		} else check[ind] = false;
	});
	if (check.filter((elem) => elem !== true).length > 0) return false;
	else return true;
}

loadNewList();
