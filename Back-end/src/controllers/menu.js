import { getMenus } from "../repositories/repository.js";

export async function get(req, res) {
    const menus = await getMenus();
    res.status(200).json(menus);
}