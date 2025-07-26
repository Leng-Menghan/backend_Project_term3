import { jwtDecode } from "jwt-decode";
export function isAuthenticated() {
    // Implement your authentication logic here
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return false;
        }
        return true;
    } catch (err) {
        return false; 
    }
}

export function setToken(token) {
    // implement your logic to set the token
    return localStorage.setItem('token', token);
}

export function logout() {
    // implement your logic to remove the token
    return localStorage.removeItem('token');
}