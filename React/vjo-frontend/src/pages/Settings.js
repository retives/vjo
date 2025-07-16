import { AuthContext } from '../utils/AuthProvider' 
import { useContext } from 'react'
const Settings = () => {

    const {user, loading} = useContext(AuthContext)
    return (
        <div>
            
        </div>
    )
}