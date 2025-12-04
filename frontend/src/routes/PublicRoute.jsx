// this handles public routes if guest then show login/signup if not then go to dashboard
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({children}) => {
    const {user, loading} = useAuth();
    
    if (loading){
        return <div className="p-10 text-center">Loading...</div>;
    }

    return !user ? children : <Navigate to  = "/dashboard"/>;

}
export default PublicRoute;