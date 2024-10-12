export const itemsArr = [
	{ id: 1, category: 'teabase', title: 'green tea' },
	{ id: 2, category: 'teabase', title: 'coffee' },
	{ id: 3, category: 'teabase', title: 'black tea' },
	{ id: 4, category: 'teabase', title: 'oolong tea' },

	{ id: 5, category: 'topping', title: 'tapioca' },
	{ id: 6, category: 'topping', title: 'juice ball' },
	{ id: 7, category: 'topping', title: 'strawberries' },
	{ id: 8, category: 'topping', title: 'mango' },

	{ id: 9, category: 'milk', title: 'cow milk' },
	{ id: 10, category: 'milk', title: 'soy milk' },
	{ id: 11, category: 'milk', title: 'almond milk' },
	{ id: 12, category: 'milk', title: 'ice cream' },

	{ id: 13, category: 'cap', title: 'cheese hat', img: './tea.png' },
	{ id: 14, category: 'cap', title: 'caramel' },
	{ id: 15, category: 'cap', title: 'oreo' },
	{ id: 16, category: 'cap', title: 'cream cap' },
];

export const capsArr = itemsArr.filter((item) => item.category === 'cap');
export const teabasesArr = itemsArr.filter(
	(item) => item.category === 'teabase'
);
export const milksArr = itemsArr.filter((item) => item.category === 'milk');
export const toppingsArr = itemsArr.filter(
	(item) => item.category === 'topping'
);
