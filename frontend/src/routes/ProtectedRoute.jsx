// This handles logic if logged in then sidebar, no then go to login
import { Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";


const ProtectedRoute = ({ children }) => {
    const {user, loading} = useAuth();

    if (loading){
        return <div className="p-10 text-center">Loading...</div>;
    }

    return user ? <Layout> {children}</Layout> : <Navigate to = "/login" />
} 
export default ProtectedRoute;

