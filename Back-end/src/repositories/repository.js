import Order from "../models/order.js";
import Item from "../models/item.js";
import Menu from "../models/menu.js";
import Table from "../models/table.js";

// Orders
export async function createOrder(status, guest, tableId, items) {
    const order = await Order.create({ status, guest, tableId });
    for (const { id, quantity } of items) {
        await order.addItem(id, { through: { quantity } });
    }
    return order;
}
export async function getOrder(orderId) {
    const order = await Order.findByPk(orderId, {
        attributes: ['id', 'status', 'guest', 'tableId', 'createdAt'],
        include: [
            {
                model: Item,
                attributes: ['id', 'name', 'price', 'menuId'],
                through: { attributes: ['quantity'] }
            },
        ]
    });
    return order;
}

export async function getOrders() {
    const orders = await Order.findAll({
        attributes: ['id', 'status', 'guest', 'tableId', 'createdAt'],
        include: [
            {
                model: Item,
                attributes: ['name', 'price'],
                through: { attributes: ['quantity'] }
            }
        ]
    });
    return orders;
}
export async function updateOrder(guest, tableId, items, orderId) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error("Order not found");
    await order.update({guest, tableId });
    await order.setItems([]);
    for (const { id, quantity } of items) {
        await order.addItem(id, { through: { quantity } });
    }
}


export async function deleteOrder(orderId) {
    const order = await Order.findByPk(orderId);
    await order.destroy();
}

export async function updateOrderStatus(orderId, status) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error("Order not found");
    await order.update({ status });
}
// Tables
export async function createTable(name, status, seat) {
    const table = await Table.create({ name, status, seat });
    return table;
}
export async function updateTableStatus(tableId, status) {
    const table = await Table.findByPk(tableId);
    if (!table) throw new Error("Table not found");
    await table.update({ status });
}
export async function getTables() {
    const tables = await Table.findAll();
    return tables;
}
// Items
export async function createItem(name, price, menuId) {
    const item = await Item.create({ name, price, menuId });
    return item;
}

export async function getItems() {
    const items = await Item.findAll();
    return items;
}

export async function getItem(id) {
    const item = await Item.findByPk(id);
    return item;
}

export async function updateItem(id, name, price, menuId) {
    const item = await Item.findByPk(id);
    await item.update({ name, price, menuId });
    return item;
}

export async function deleteItem(id) {
    const item = await Item.findByPk(id);
    await item.destroy();
}

export async function getItemsByMenuId(menuId) {
    const items = await Item.findAll({ where: { menuId } });
    return items;
}

// Menu
export async function createMenu(category, icon) {
    const menu = await Menu.create({ category, icon });
    return menu;
}

export async function getMenus() {
    const menus = await Menu.findAll();
    return menus;
}

export async function getMenu(id) {
    const menu = await Menu.findByPk(id);
    return menu;
}

export async function updateMenu(id, category, icon) {
    const menu = await Menu.findByPk(id);
    await menu.update({ category, icon });
    return menu;
}

export async function deleteMenu(id) {
    const menu = await Menu.findByPk(id);
    await menu.destroy();
}
