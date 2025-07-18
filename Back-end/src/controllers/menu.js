import { getMenus, getMenu, createMenu, updateMenu, deleteMenu } from "../repositories/repository.js";

export async function get(req, res) {
    const { id } = req.params;
    const menu = await getMenu(id);
    res.status(200).json(menu);
}

export async function getAll(req, res) {
    const menus = await getMenus();
    res.status(200).json(menus);
}

export async function create(req, res) {
    const { category, icon } = req.body;
    const menu = await createMenu(category, icon);
    res.status(201).json(menu);
}

export async function update(req, res) {
    const { id } = req.params;
    const { category, icon} = req.body;
    const menu = await updateMenu(id, category, icon);
    res.status(200).json(menu);
}

export async function remove(req, res) {
    const { id } = req.params;
    const menu = await deleteMenu(id);
    res.status(200).json("Delete success");
}