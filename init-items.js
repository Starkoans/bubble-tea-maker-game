import { itemsArr } from "./items.js";

const dragArea = document.querySelector('.drag-area');

itemsArr.forEach((elem, ind) => {
	const dragElem = document.createElement('div');
	const dragElemText = document.createTextNode(elem.title);
	dragElem.classList.add('to-drag');
	dragElem.dataset.id = elem.id;
	dragElem.dataset.title = elem.title;
	dragElem.dataset.category = elem.category;
	const elementWidth = 150;
	const gap = 10;

	const positionX = (Number(elem.id)-1) * (elementWidth + gap);
	const positionY = 10;

	dragElem.style.left = `${positionX}px`;
	dragElem.style.top = `${positionY}px`;
	dragElem.style.backgroundImage = `url('${elem.img}')`
	dragElem.id = elem.id;
	dragElem.classList.add(elem.category);
	dragElem.appendChild(dragElemText);
	dragArea.appendChild(dragElem);
});

