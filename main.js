let dragElems = document.querySelectorAll('.to-drag');
const spawnArea = document.querySelector('.drag-area');
let dropAreas = document.querySelectorAll('.to-drop');
export let droppedList = document.querySelector('.dropped-list');
export let droppedListArr = [];

dragElems.forEach((dragElement) => {
	dragElement.ondragstart = function () {
		return false;
	};
	dragElement.onmousedown = function (e) {
		handleMousedown(e, dragElement);
	};
});

let collisionCapFlag = false;
let collisionMilkFlag = false;
let collisionToppingFlag = false;
let collisionTeabaseFlag = false;

function dropItem(item, area) {
	const dragRect = item.getBoundingClientRect();
	const targetRect = area.getBoundingClientRect();

	const centerX = targetRect.left + targetRect.width / 2 - dragRect.width / 2;
	const centerY = targetRect.top;
	// item.classList.add('dropped');
	item.style.left = centerX + 'px';
	item.style.top = centerY + 'px';

	document.body.appendChild(item);
	droppedListArr.push(item);
}

function returnToSpawn(element) {
	document.body.removeChild(element);

	const elementWidth = 130;
	const gap = 10;
	const positionX = (element.dataset.id - 1) * (elementWidth + gap);
	const positionY = 10;

	element.style.left = `${positionX}px`;
	element.style.top = `${positionY}px`;
	element.classList.remove('dropped');

	spawnArea.appendChild(element);
	element.style.height = '100px';
	
	element.style.width = '100px';
	let newDroppedList = droppedListArr.filter((item) => item.id !== element.id);
	droppedListArr = newDroppedList;
}

export function cleanDropareas() {
	let toRemove = document.body.querySelectorAll('.dropped');
	console.log(toRemove);
	toRemove.forEach((elem) => {
		returnToSpawn(elem);
	});
}

function returnToSpawnSameCategoryElem(elem) {
	let sameCategoryElemsInList = droppedListArr.filter(
		(dropped) => dropped.dataset.category === elem.dataset.category
	);
	if (sameCategoryElemsInList.length > -1) {
		sameCategoryElemsInList.forEach((sameElem) => {
			let elemToRemove = document.querySelector(`[data-id="${sameElem.id}" ]`);
			if (elemToRemove.id !== elem.id) {
				returnToSpawn(elemToRemove);
			}
		});
	}
}

function handleMousedown(event, element) {
	var dragElemCoords = getCoords(element);
	let shiftX = event.pageX - dragElemCoords.left;
	let shiftY = event.pageY - dragElemCoords.top;
	element.style.height = '100px';
	element.style.width = '100px';
	element.style.position = 'absolute';
	moveAt(event, element, shiftX, shiftY);

	document.body.appendChild(element);
	element.style.zIndex = 1000;

	document.onmousemove = function (e) {
		moveAt(e, element, shiftX, shiftY);

		collisionCapFlag = checkCollision(element, dropAreas[0]);
		collisionMilkFlag = checkCollision(element, dropAreas[1]);
		collisionToppingFlag = checkCollision(element, dropAreas[2]);
		collisionTeabaseFlag = checkCollision(element, dropAreas[3]);
	};

	element.onmouseup = function () {
		document.onmousemove = null;
		element.onmouseup = null;

		if (collisionCapFlag && element.dataset.category === 'cap') {
			returnToSpawnSameCategoryElem(element);
			element.style.height = '130px';
			element.style.width = '130px';
			dropItem(element, dropAreas[0]);
		} else if (collisionMilkFlag && element.dataset.category === 'milk') {
			returnToSpawnSameCategoryElem(element);
			element.style.height = '130px';
			element.style.width = '130px';
			dropItem(element, dropAreas[1]);
		} else if (collisionToppingFlag && element.dataset.category === 'topping') {
			returnToSpawnSameCategoryElem(element);
			element.style.height = '130px';
			element.style.width = '130px';
			dropItem(element, dropAreas[2]);
		} else if (collisionTeabaseFlag && element.dataset.category === 'teabase') {
			returnToSpawnSameCategoryElem(element);
			element.style.height = '130px';
			element.style.width = '130px';
			dropItem(element, dropAreas[3]);
		} else {
			returnToSpawn(element);
		}
	};
}

function moveAt(e, element, shiftX, shiftY) {
	element.style.left = e.pageX - shiftX + 'px';
	element.style.top = e.pageY - shiftY + 'px';
}

function getCoords(elem) {
	// кроме IE8-
	var box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset,
	};
}

function checkCollision(dragElement, dropArea) {
	const dragRect = dragElement.getBoundingClientRect();
	const targetRect = dropArea.getBoundingClientRect();

	const isInTarget = !(
		dragRect.right < targetRect.left ||
		dragRect.left > targetRect.right ||
		dragRect.bottom < targetRect.top ||
		dragRect.top > targetRect.bottom
	);

	if (isInTarget) {
		return true;
	} else {
		return false;
	}
}
