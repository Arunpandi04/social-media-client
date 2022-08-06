import { useState,useEffect } from "react";

const Header = () => {
    const [user,setUser] = useState('')
    useEffect(()=>{
    const myUser =  sessionStorage.getItem('email');
    setUser(myUser);
    },[])
    return(
        <div className="header-container">
            <h4>Hi {user} Welcome You !</h4>
        </div>
    )
}

export default Header;