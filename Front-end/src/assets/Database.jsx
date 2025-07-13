export const orders = [
  {
    id: 1,
    table: 3,
    status: 'Ready',
    items: ['Burger', 'Fries'],
    total: 15.99,
    date: '2025-07-11T18:30:00',
    guest: 2
  },
  {
    id: 2,
    table: 1,
    status: 'In Progress',
    items: [
      'Burger',
      'Fries',
      'Coke',
      'Fries',
      'Coke',
      'Fries',
      'Coke',
      'Fries',
      'Coke',
      'Fries',
      'Coke',
      'Fries',
      'Coke',
      'Fries',
      'Coke'
    ],
    total: 12.99,
    date: '2025-07-11T19:10:00',
    guest: 1
  },
  {
    id: 3,
    table: 5,
    status: 'Ready',
    items: ['Salad'],
    total: 8.99,
    date: '2025-07-11T19:45:00',
    guest: 1
  },
  {
    id: 4,
    table: 2,
    status: 'All',
    items: ['Soda'],
    total: 2.99,
    date: '2025-07-11T17:50:00',
    guest: 1
  },
  {
    id: 5,
    table: 7,
    status: 'In Progress',
    items: ['Pasta'],
    total: 10.99,
    date: '2025-07-11T20:00:00',
    guest: 2
  },
  {
    id: 6,
    table: 6,
    status: 'Ready',
    items: ['Dessert'],
    total: 5.99,
    date: '2025-07-11T20:10:00',
    guest: 1
  }
];



export const menus = [
  { id: 1, category: 'Coffee', item: 2, icon: '<i class="fa-solid fa-mug-hot"></i>' },
  { id: 2, category: 'Tea', item: 2, icon: '<i class="fa-solid fa-mug-saucer"></i>' },
  { id: 3, category: 'Juice', item: 2, icon: '<i class="fa-solid fa-glass-water"></i>' },
  { id: 4, category: 'Sandwich', item: 2, icon: '<i class="fa-solid fa-burger"></i>' },
  { id: 5, category: 'Wrap', item: 2, icon: '<i class="fa-solid fa-utensils"></i>' },
  { id: 6, category: 'Soup', item: 2, icon: '<i class="fa-solid fa-bowl-food"></i>' },
  { id: 7, category: 'Steak', item: 2, icon: '<i class="fa-solid fa-steak"></i>' },
  { id: 8, category: 'Fish', item: 2, icon: '<i class="fa-solid fa-fish-fins"></i>' },
]

export const items = [
  { id: 1, name: 'Americano', price: 2, menuId: 1 }, // Coffee
  { id: 2, name: 'Latte', price: 3, menuId: 1 },     // Coffee
  { id: 3, name: 'Green Tea', price: 2, menuId: 2 }, // Tea
  { id: 4, name: 'Black Tea', price: 2, menuId: 2 }, // Tea
  { id: 5, name: 'Orange Juice', price: 3, menuId: 3 }, // Juice
  { id: 6, name: 'Apple Juice', price: 3, menuId: 3 },  // Juice
  { id: 7, name: 'Chicken Sandwich', price: 4, menuId: 4 },
  { id: 8, name: 'Egg Sandwich', price: 4, menuId: 4 },
  { id: 9, name: 'Beef Wrap', price: 5, menuId: 5 },
  { id: 10, name: 'Veggie Wrap', price: 4, menuId: 5 },
  { id: 11, name: 'Tomato Soup', price: 3, menuId: 6 },
  { id: 12, name: 'Mushroom Soup', price: 3, menuId: 6 },
  { id: 13, name: 'Grilled Steak', price: 10, menuId: 7 },
  { id: 14, name: 'Pepper Steak', price: 11, menuId: 7 },
  { id: 15, name: 'Grilled Salmon', price: 9, menuId: 8 },
  { id: 16, name: 'Fried Fish', price: 8, menuId: 8 },
  { id: 17, name: 'Americano', price: 2, menuId: 1 }, // Coffee
  { id: 18, name: 'Latte', price: 3, menuId: 1 },     // Coffee
  { id: 19, name: 'Americano', price: 2, menuId: 1 }, // Coffee
  { id: 20, name: 'Latte', price: 3, menuId: 1 },     // Coffee
  { id: 21, name: 'Americano', price: 2, menuId: 1 }, // Coffee
  { id: 22, name: 'Latte', price: 3, menuId: 1 },     // Coffee
  { id: 23, name: 'Americano', price: 2, menuId: 1 }, // Coffee
  { id: 24, name: 'Latte', price: 3, menuId: 1 },     // Coffee
];

export const tables = [
  { id: 1, name: 'Table 1', status: 'Occupied', seat: 5 },
  { id: 2, name: 'Table 2', status: 'Available', seat: 6 },
  { id: 3, name: 'Table 3', status: 'Available', seat: 4 },
  { id: 4, name: 'Table 4', status: 'Available', seat: 2 },
  { id: 5, name: 'Table 5', status: 'Available', seat: 3 },
  { id: 6, name: 'Table 6', status: 'Available', seat: 2 },
  { id: 7, name: 'Table 7', status: 'Available', seat: 2 },
  { id: 8, name: 'Table 8', status: 'Available', seat: 2 },
  { id: 9, name: 'Table 9', status: 'Available', seat: 2 },
  { id: 10, name: 'Table 10', status: 'Available', seat: 2 },
]


