import Order from "../models/order.js";
import Item from "../models/item.js";
import Menu from "../models/menu.js";
import Table from "../models/table.js";
import orderItem from "../models/orderItem.js";
import User from "../models/user.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function getUsers() {
    const users = await User.findAll();
    return users;
}

export async function loginUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return { token, user };
}

export async function createUser(name, gender, DOB, address, phoneNumber, email, password, role) {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
        throw new Error('Email already registered');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
        name: name,
        gender: gender,
        DOB: DOB,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        password: hashedPassword,
        role: role
    });
    return user;
}

export async function getUser(id) {
    const user = await User.findByPk(id);
    return user;
}

export async function updateUser(id, name, gender, DOB, address, phoneNumber, email, password, role) {
    const user = await User.findByPk(id);
    await user.update({ name, gender, DOB, address, phoneNumber, email, password, role });
    return user;
}

export async function deleteUser(id) {
    const user = await User.findByPk(id);
    await user.destroy();
    return user;
}

// Orders
export async function createOrder(status, guest, tableId, items, amount, paymentStatus) {
    const order = await Order.create({ status, guest, tableId, amount, paymentStatus });
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
        attributes: ['id', 'status', 'guest', 'tableId', 'createdAt', 'paymentStatus', 'amount'],
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
export async function updateOrder(guest, tableId, items, orderId, amount, paymentStatus) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error("Order not found");
    await order.update({ guest, tableId, amount, paymentStatus });
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

export async function updatePaymentStatus(orderId, paymentStatus) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error("Order not found");
    await order.update({ paymentStatus });
}

// Tables
export async function createTable(name, status, seat) {
    const existingTable = await Table.findOne({ where: { name } });
    if (existingTable) {
        throw new Error('Table name already exists');
    }
    const table = await Table.create({ name, status, seat });
    return table;
}
export async function updateTableStatus(tableId, status) {
    const table = await Table.findByPk(tableId);
    if (!table) throw new Error("Table not found");
    await table.update({ status });
    return table;
}
export async function getTables() {
    const tables = await Table.findAll();
    return tables;
}

export async function getTable(id) {
    const table = await Table.findByPk(id);
    return table;
}

export async function updateTable(id, name, seat) {
    const table = await Table.findByPk(id);
    await table.update({ name, seat });
    return table;
}

export async function deleteTable(id) {
    const table = await Table.findByPk(id);
    await table.destroy();
}
// Items
export async function createItem(name, price, menuId) {
    const existingItem = await Item.findOne({ where: { name } });
    if (existingItem) {
        throw new Error('Item name already exists');
    }
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
    const existingMenu = await Menu.findOne({ where: { category } });
    if (existingMenu) {
        throw new Error('Menu category already exists');
    }
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

// Payment
export async function createPayment(orderId, status, method, amount) {
    const order = await Order.findByPk(orderId);
    await order.create({ status, method, amount });
    return order;
}

// OrderItem
export async function getOrderItems() {
    const orderItems = await orderItem.findAll(
        {
            include: [
                {
                    model: Item,
                    attributes: ['id', 'name', 'price', 'menuId'],
                },
            ]
        }
    );
    return orderItems;
}