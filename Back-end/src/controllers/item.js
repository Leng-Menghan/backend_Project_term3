import { getItems} from "../repositories/repository.js";

export async function get(req, res) {
    const items = await getItems();
    res.status(200).json(items);
}