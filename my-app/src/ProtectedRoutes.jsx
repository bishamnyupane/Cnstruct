import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// type ProtectedRouteProps = {
//     children: React.ReactNode
// }

const ProtectedRoutes = ({children}) => {

    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    useEffect(() => {
        checkAuth()
        if (!token) {
            navigate('/')
        }
    }, [])

    const checkAuth = async () => {
        try {
            await axios.get('http://localhost:3000/api/protected-resource', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>
        {token && children}
    </div>
  )
}

export default ProtectedRoutes
