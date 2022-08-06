import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../Store/Action/authAction'
import { useNavigate } from 'react-router'

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOff = async() => {
     await dispatch(logout())
     console.log("logOff =>>>>>>>>>>>>")
     navigate('/')
  }
  return (
    <>
      <div className="dashboard-container">
        <Link className="link" to="/dashboard">
          <div className="nav-Link">Dashboard</div>
        </Link>
        <Link className="link-decorate" to="/chat">
          <div className="nav-Link">Chat</div>
        </Link>
        <Link className="link" to="/product">
          <div className="nav-Link">Product</div>
        </Link>
        <Link className="link" to="/users">
          <div className="nav-Link">Users</div>
        </Link>
        <div className="logout">
          <div className="nav-Link" onClick={logOff}>Logout</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
