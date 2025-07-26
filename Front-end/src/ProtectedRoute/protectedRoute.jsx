import { isAuthenticated } from "../utils/auth";
import {Navigate} from "react-router-dom";  

const ProtectedRoute = ({children}) => {
    if(!isAuthenticated()){
        return <Navigate to="/" replace/>;
    }
    return children;
}

export default ProtectedRoute;