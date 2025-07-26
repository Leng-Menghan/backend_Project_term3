import { loginUser, createUser, getUsers, getUser, updateUser, deleteUser } from "../repositories/repository.js";

export const get = async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);
    res.status(200).json(user);
}
export const update = async (req, res) => {
    const { id } = req.params;
    const { name, gender, DOB, address, phoneNumber, email, password, role } = req.body;
    const user = await updateUser(id, name, gender, DOB, address, phoneNumber, email, password, role);
    res.status(200).json(user);
}

export const remove = async (req, res) => {
    const { id } = req.params;
    const user = await deleteUser(id);
    res.status(200).json(user);
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);

        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { name, gender, DOB, address, phoneNumber, email, password, role } = req.body;
        const user = await createUser(name, gender, DOB, address, phoneNumber, email, password, role);

        res.status(201).json({
            message: "User registered",
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAll = async (req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
}