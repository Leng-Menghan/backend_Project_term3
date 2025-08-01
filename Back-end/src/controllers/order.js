import {createOrder, getOrder, getOrders, updateOrder, deleteOrder, updateOrderStatus, updatePaymentStatus} from '../repositories/repository.js';

export async function create(req, res) {
    const { status, guest, tableId, items, amount, paymentStatus } = req.body;
    const order = await createOrder(status, guest, tableId, items, amount, paymentStatus);
    res.status(201).json("Create order success");
}

export async function update(req, res) {
    const { id } = req.params;
    const { guest, tableId, items, amount, paymentStatus } = req.body;
    const order = await updateOrder( guest, tableId, items, id, amount, paymentStatus);
    res.status(200).json(order);
}

export async function updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const order = await updateOrderStatus(id, status);
    res.status(200).json("Update order status success");
}

export async function get(req, res) {
    const { id } = req.params;
    const order = await getOrder(id);
    res.status(200).json(order);
}

export async function getAll(req, res) {
    const orders = await getOrders();
    res.status(200).json(orders);
}

export async function remove(req, res) {
    const { id } = req.params;
    const order = await deleteOrder(id);
    res.status(200).json("Delete success");
}

export async function updatePayment(req, res) {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const order = await updatePaymentStatus(id, paymentStatus);
    res.status(200).json("Update payment status success");
}
