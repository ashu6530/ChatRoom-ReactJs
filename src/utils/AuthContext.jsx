import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";



const AuthContext = createContext()

export const AuthProvider=({children})=>{
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        getUserOnLoad()
    },[])
    const getUserOnLoad= async ()=>{
        try {
            const accountDetails = await account.get()
            setUser(accountDetails)
            
            
        } catch (error) {
            console.error(error)
            
        }
        setLoading(false)
        
    }
    const handUserLogin= async (e,credentials)=>{
       e.preventDefault()
       try {
        let responce = await account.createEmailPasswordSession(credentials.email,credentials.password)
        const accountDetails = await account.get()
        setUser(accountDetails)
        navigate('/')
       } catch (error) {
        console.error(error)
        
       }
    }
    const handleUserlogout= async ()=>{
       await account.deleteSession('current')
       setUser(null)
    }
    const handleUserRegister= async (e,credentials) =>{
        e.preventDefault()
        if(credentials.password1 !== credentials.password2) {
            alert ("Password do not match")
            return 
        }
       try {
        let responce = await account.create(ID.unique(),credentials.email,credentials.password1,credentials.name)
        console.log(responce);
        await account.createEmailPasswordSession(credentials.email,credentials.password1)
        const accountDetails = await account.get()
        setUser(accountDetails)
        navigate('/')
       } 
       
       catch (error) {
        console.error(error)
       }
    }

    const contextData={
       user,
       handUserLogin,
       handleUserlogout,
       handleUserRegister
    }
    return(
        <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
    )
  
}
export const useAuth=()=>{
   return useContext(AuthContext)
}

export default AuthContext