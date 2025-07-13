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
                attributes: ['name', 'price', 'menuId'],
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
}
export async function getTables() {
    const tables = await Table.findAll();
    return tables;
}
// Items
export async function createItem(name, price, menuId) {
    const item = await Item.create({ name, price, menuId });
}

export async function getItems() {
    const items = await Item.findAll();
    return items;
}

// Menu
export async function createMenu(category, icon) {
    const menu = await Menu.create({ category, icon });
}

export async function getMenus() {
    const menus = await Menu.findAll();
    return menus;
}
