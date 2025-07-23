import { getOrderItems } from "../repositories/repository.js";

export async function getAll(req, res) {
    const orderItems = await getOrderItems();
    res.status(200).json(orderItems);
}