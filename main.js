let dragElems = document.querySelectorAll('.to-drag');
const spawnArea = document.querySelector('.drag-area');
let dropAreas = document.querySelectorAll('.to-drop');
let droppedList = document.querySelector('.dropped-list');
let droppedListArr = [];

dragElems.forEach((dragElement) => {
	dragElement.ondragstart = function () {
		return false;
	};
	dragElement.onmousedown = function (e) {
		handleMousedown(e, dragElement);
	};
});

let collisionHeadFlag = false;
let collisionChestFlag = false;
let collisionHipsFlag = false;
let collisionFeetFlag = false;

function dropItem(item, area) {
	const dragRect = item.getBoundingClientRect();
	const targetRect = area.getBoundingClientRect();

	const centerX = targetRect.left + targetRect.width / 2 - dragRect.width / 2;
	const centerY = targetRect.top;

	item.style.left = centerX + 'px';
	item.style.top = centerY + 'px';
	droppedListArr.shift(item);
	console.dir(item.dataset.title);
	const droppedElem = document.createElement('p');
	droppedElem.innerText = item.innerText;
	droppedElem.dataset.id = item.id;
	droppedList.appendChild(droppedElem);
}

function handleMousedown(event, element) {
	var dragElemCoords = getCoords(element);
	let shiftX = event.pageX - dragElemCoords.left;
	let shiftY = event.pageY - dragElemCoords.top;
	element.style.height = '100px';
	element.style.position = 'absolute';
	moveAt(event, element, shiftX, shiftY);

	document.body.appendChild(element);
	element.style.zIndex = 1000;

	document.onmousemove = function (e) {
		moveAt(e, element, shiftX, shiftY);

		collisionHeadFlag = checkCollision(element, dropAreas[0]);
		collisionChestFlag = checkCollision(element, dropAreas[1]);
		collisionHipsFlag = checkCollision(element, dropAreas[2]);
		collisionFeetFlag = checkCollision(element, dropAreas[3]);
	};

	element.onmouseup = function () {
		document.onmousemove = null;
		element.onmouseup = null;

		if (collisionHeadFlag && element.dataset.category ==='head') {
			element.style.height = '150px';
			dropItem(element, dropAreas[0]);
		} else if (collisionChestFlag && element.classList.category ==='chest') {
			element.style.height = '150px';
			dropItem(element, dropAreas[1]);
		} else if (collisionHipsFlag && element.classList.category ==='hips') {
			element.style.height = '150px';
			dropItem(element, dropAreas[2]);
		} else if (collisionFeetFlag && element.classList.category ==='feet') {
			element.style.height = '150px';
			dropItem(element, dropAreas[3]);
		} else {
			removeItem(element);
		}
	};
}

function removeItem(element) {
	document.body.removeChild(element);
	let elemToDropFromList = droppedList.querySelector(
		`[data-id="${element.id}" ]`
	);
	console.log(elemToDropFromList);
	if (elemToDropFromList !== null) {
		droppedList.removeChild(elemToDropFromList);
	}
	const elementWidth = 150;
	const gap = 10;

	const positionX = element.id * (elementWidth + gap);
	const positionY = 10;

	element.style.left = `${positionX}px`;
	element.style.top = `${positionY}px`;
	spawnArea.appendChild(element);
	element.style.height = '100px';
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
