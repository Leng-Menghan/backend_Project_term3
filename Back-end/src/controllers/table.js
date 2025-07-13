import {getTables} from "../repositories/repository.js";

export async function get(req, res) {
    const tables = await getTables();
    res.status(200).json(tables);
}