import React from 'react'
import auth from '../firebase.init';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageLoading from './PageLoading';

const ProtectedRoute = ({children}) => {
    const [user, loading] = useAuthState(auth);

    if(loading){
        return <PageLoading/>
    }
    if(!user){
        return <Navigate to='/login'/>
    }

  return children;
}

export default ProtectedRoute