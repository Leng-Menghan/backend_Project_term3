import Item from "./item.js";
import Order from "./order.js";
import Table from "./table.js";
import Menu from "./menu.js";
import orderItem from "./orderItem.js";
// Menu and Item
Menu.hasMany(Item);
Item.belongsTo(Menu);

// Item and Order
Item.belongsToMany(Order, { through: orderItem });
Order.belongsToMany(Item, { through: orderItem });

// Order and Table
Table.hasMany(Order);
Order.belongsTo(Table);

// OrderItem and Item
orderItem.belongsTo(Item, { foreignKey: 'itemId' });
Item.hasMany(orderItem, { foreignKey: 'itemId' });



