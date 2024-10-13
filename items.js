export const itemsArr = [
	{ id: 1, category: 'teabase', title: 'green tea', img:'./teabase_green_tea.webp'  },
	{ id: 2, category: 'teabase', title: 'coffee', img:'./teabase_coffee.webp'  },
	{ id: 3, category: 'teabase', title: 'black tea', img:'./teabase_black_tea.webp' },
	{ id: 4, category: 'teabase', title: 'oolong tea', img:'./teabase_oolong_tea.webp'  },

	{ id: 5, category: 'topping', title: 'tapioca', img:'./topping_Topioka.png' },
	{ id: 6, category: 'topping', title: 'juice ball' , img:'./topping_Juiceballs.png'},
	{ id: 7, category: 'topping', title: 'strawberries', img:'./topping_Strawberry.png' },
	{ id: 8, category: 'topping', title: 'mango' , img:'./topping_Mango.png'},

	{ id: 9, category: 'milk', title: 'cow milk', img: './milk_CowMilk.png' },
	{ id: 10, category: 'milk', title: 'soy milk', img: './milk_SoyMilk.png' },
	{ id: 11, category: 'milk', title: 'almond milk', img: './milk_mindal.png' },
	{ id: 12, category: 'milk', title: 'ice cream', img: './milk_IceCream.png' },

	{ id: 13, category: 'cap', title: 'cheese hat', img: './cap_cheese.png' },
	{ id: 14, category: 'cap', title: 'caramel', img: './cap_caramel.png' },
	{ id: 15, category: 'cap', title: 'oreo', img: 'cap_Oreo.png' },
	{ id: 16, category: 'cap', title: 'cream cap', img: './cap_CreamCap.png' },
];

export const capsArr = itemsArr.filter((item) => item.category === 'cap');
export const teabasesArr = itemsArr.filter(
	(item) => item.category === 'teabase'
);
export const milksArr = itemsArr.filter((item) => item.category === 'milk');
export const toppingsArr = itemsArr.filter(
	(item) => item.category === 'topping'
);
