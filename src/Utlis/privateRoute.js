import { useLocation, Navigate } from 'react-router-dom';
 
 const PrivateRoute = ({ children}) => {
    const location = useLocation();
    const Auth = sessionStorage.getItem("authenticate");
    console.log("ghbjb",Auth)
    return Auth ? children : <Navigate  to={'/'} state={{ from: location?.pathname }} replace/>
  }

  export default PrivateRoute;