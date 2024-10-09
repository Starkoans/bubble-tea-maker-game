const itemsArr = [
	{ id: 1, category: 'head', title: 'hat1' },
	{ id: 2, category: 'chest', title: 'baton' },
	{ id: 3, category: 'hips', title: 'bober' },
	{ id: 4, category: 'feet', title: 'selen' },
	{ id: 5, category: 'head', title: 'oreo' },
	{ id: 6, category: 'head', title: 'pizza' },
];

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Обмен элементов
	}
	return array;
}

const dragArea = document.querySelector('.drag-area');
let shufledArr = shuffleArray(itemsArr);

itemsArr.slice(0, 5).forEach((elem, ind) => {
	const dragElem = document.createElement('div');
	const dragElemText = document.createTextNode(elem.title);
	dragElem.classList.add('to-drag');
	dragElem.dataset.title = elem.title;
	dragElem.dataset.category = elem.category;
	const elementWidth = 150;
	const gap = 10;

	const positionX = ind * (elementWidth + gap);
	const positionY = 10;

	dragElem.style.left = `${positionX}px`;
	dragElem.style.top = `${positionY}px`;
	dragElem.id = ind;
	dragElem.classList.add(elem.category);
	dragElem.appendChild(dragElemText);
	dragArea.appendChild(dragElem);
});
