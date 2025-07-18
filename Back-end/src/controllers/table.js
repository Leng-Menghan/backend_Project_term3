import {getTables, createTable, updateTableStatus} from "../repositories/repository.js";

export async function getAll(req, res) {
    const tables = await getTables();
    res.status(200).json(tables);
}

export async function create(req, res) {
    const {name, status, seat} = req.body;
    const table = await createTable(name, status, seat);
    res.status(201).json(table);
}

export async function updateStatus(req, res) {
    const {id} = req.params;
    const {status} = req.body;
    const table = await updateTableStatus(id, status);
    res.status(200).json(table);
}