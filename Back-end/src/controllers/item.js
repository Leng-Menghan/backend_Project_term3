import { getItems, getItem, createItem, updateItem, deleteItem, getItemsByMenuId } from "../repositories/repository.js";

export async function get(req, res) {
    const { id } = req.params;
    const item = await getItem(id);
    res.status(200).json(item);
}

export async function getAll(req, res) {
    const items = await getItems();
    res.status(200).json(items);
}

export async function getAllByMenuId(req, res) {
    const { id } = req.params;
    const items = await getItemsByMenuId(id);
    res.status(200).json(items);
}

export async function create(req, res) {
    try {
        const { name, price, menuId } = req.body;
        const item = await createItem(name, price, menuId);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function update(req, res) {
    const { id } = req.params;
    const { name, price, menuId } = req.body;
    const item = await updateItem(id, name, price, menuId);
    res.status(200).json(item);
}
export async function remove(req, res) {
    const { id } = req.params;
    const item = await deleteItem(id);
    res.status(200).json("Delete Success");
}