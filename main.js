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
	item.classList.add('dropped')
	item.style.left = centerX + 'px';
	item.style.top = centerY + 'px';
	droppedListArr.push(item.id);
	const droppedElem = document.createElement('p');
	droppedElem.innerText = item.innerText;
	droppedElem.dataset.id = `${item.id}-list`;
	droppedElem.dataset.category = item.dataset.category;
	
	droppedList.appendChild(droppedElem);
}
function returnToSpawn(element) {
	document.body.removeChild(element);

	const elementWidth = 150;
	const gap = 10;
	const positionX = (element.dataset.id - 1) * (elementWidth + gap);
	const positionY = 10;

	element.style.left = `${positionX}px`;
	element.style.top = `${positionY}px`;
	element.classList.remove('dropped')
	spawnArea.appendChild(element);
	element.style.height = '100px';
}

export function cleanDropareas() {
	let toRemove = document.body.querySelectorAll('.dropped');
	console.log(toRemove)
	toRemove.forEach((elem) => {
		
		returnToSpawn(elem);
		removeFromList(elem);
	});
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
		removeFromList(element);

		collisionCapFlag = checkCollision(element, dropAreas[0]);
		collisionMilkFlag = checkCollision(element, dropAreas[1]);
		collisionToppingFlag = checkCollision(element, dropAreas[2]);
		collisionTeabaseFlag = checkCollision(element, dropAreas[3]);
	};

	element.onmouseup = function () {
		document.onmousemove = null;
		element.onmouseup = null;

		if (collisionCapFlag && element.dataset.category === 'cap') {
			element.style.height = '150px';

			let sameCategoryElemsInList = droppedList.querySelectorAll(
				`[data-category="${element.dataset.category}" ]`
			);

			if (sameCategoryElemsInList.length > 0) {
				sameCategoryElemsInList.forEach((sameElem) => {
					let sameElemId = sameElem.dataset.id;
					let cuttedID = sameElemId.substring(0, sameElemId.length - 5);

					let elemToRemove = document.querySelector(`[data-id="${cuttedID}" ]`);
					if (cuttedID !== element.id) {
						returnToSpawn(elemToRemove);
					}
				});
			}
			dropItem(element, dropAreas[0]);

		} else if (collisionMilkFlag && element.dataset.category === 'milk') {
			element.style.height = '150px';
			dropItem(element, dropAreas[1]);
		} else if (collisionToppingFlag && element.dataset.category === 'topping') {
			element.style.height = '150px';
			dropItem(element, dropAreas[2]);
		} else if (collisionTeabaseFlag && element.dataset.category === 'teabase') {
			element.style.height = '150px';
			dropItem(element, dropAreas[3]);
		} else {
			returnToSpawn(element);
		}
	};
}

function removeFromList(element) {
	let elemToDropFromList = droppedList.querySelector(
		`[data-id="${element.dataset.id}-list" ]`
	);
	// console.log('remove: ', elemToDropFromList);
	if (elemToDropFromList !== null) {
		let filteredList = droppedListArr.filter(
			(item) => item !== element.dataset.id
		);
		droppedListArr = filteredList;

		droppedList.removeChild(elemToDropFromList);
	}
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
