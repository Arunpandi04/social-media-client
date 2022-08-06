import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlluser } from "./Store/Actions";

const User = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAlluser());
  }, [dispatch]);
  return (
    <div>
      {selector?.user.map((data) => {
          return <p key={data.id}>{data.name}</p>
      })}
    </div>
  );
};

export default User;
