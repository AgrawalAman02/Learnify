import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const {isAuthenticated } = useSelector((store)=>store.auth);
  
  if(!isAuthenticated) {
    return <Navigate to={"/auth"} replace/>;
  }

  return children;
};

export const AuthenticatedUser = ({children})=>{
  const navigate = useNavigate();
  const {isAuthenticated } = useSelector((store)=>store.auth);
  
  if(isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}

export const AdminUser  = ({children})=>{
  const navigate = useNavigate();
  const {user,isAuthenticated } = useSelector((store)=>store.auth);
  
  if(!isAuthenticated) {
    return <Navigate to={"/auth"} replace/>;
  }

  if(user.role !=="Instructor" ){
    return<Navigate to={"/"} replace />;
  }

  return children;
}