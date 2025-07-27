import { getTables, createTable, updateTableStatus, getTable, updateTable, deleteTable } from "../repositories/repository.js";

export async function getAll(req, res) {
    const tables = await getTables();
    res.status(200).json(tables);
}

export async function create(req, res) {
    try {
        const { name, status, seat } = req.body;
        const table = await createTable(name, status, seat);
        res.status(201).json(table);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const table = await updateTableStatus(id, status);
    res.status(200).json(table);
}

export async function get(req, res) {
    const { id } = req.params;
    const table = await getTable(id);
    res.status(200).json(table);
}

export async function update(req, res) {
    const { id } = req.params;
    const { name, seat } = req.body;
    const table = await updateTable(id, name, seat);
    res.status(200).json(table);
}

export async function remove(req, res) {
    const { id } = req.params;
    const table = await deleteTable(id);
    res.status(200).json("Delete success");
}