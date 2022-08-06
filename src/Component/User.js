import { useEffect,useState } from "react";
import { Table,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, follow, unfollow } from "../Store/Action/authAction";
import PaginationComponent from './Pagination';
import Header from "./Header";
import Sidebar from "./Sidebar";

const User = () => {
  const email = sessionStorage.getItem("email")
  const id = sessionStorage.getItem("id")
  const [total,setTotal] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
 
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllUser(((currentPage-1)*10),10));
  }, [dispatch,currentPage]);
  const followUser = async(e,fid) =>{
    e.preventDefault();
    await dispatch(follow(id,fid));
    await dispatch(getAllUser(((currentPage-1)*10),10));
  }
useEffect(() =>{
if(selector.total > 0){
console.log("bhvhbn",selector.total)
  setTotal(selector.total);
}
},[selector.users.length])
  const unfollowUser = async(e,fid) =>{
    e.preventDefault();
    await dispatch(unfollow(id,fid));
    await dispatch(getAllUser(((currentPage-1)*10),10));
  }
  const renderFollow = (user) => {
    const isFollowed = user?.following.find(e => e?.user?.email === email);
    const isDisable = !isFollowed ? true : false
    console.log("isDisable",isDisable)
    return isDisable ? <Button className="follow-btn" onClick={(e) => followUser(e,user._id)}>follow</Button> : <Button className="follow-btn" onClick={(e) => unfollowUser(e,user._id)}>unfollow</Button>;
  }

  const onPageChange = (count) => {
    setCurrentPage(count);
  }

  console.log("renderUnFollow")
  console.log("selector",selector.users)
  
  return (
    <>
      <Header />
      <Sidebar />
      <div className="custom-container">
      <Table striped bordered hover variant="dark">
        <tbody>
          {selector?.users.map((e,index) => {
           return (
           <tr key = {index}>
              <td>
                <div className='table-body'>
                {e.firstName}
                {e.lastName}
                {renderFollow(e)}
                </div>
              </td>
            </tr>
          )})}
        </tbody>
      </Table>
      <PaginationComponent total={total} currentPage={currentPage} itemsPerPage={10} onPageChange={onPageChange}/>
      </div>
    </>
  );
};

export default User;
