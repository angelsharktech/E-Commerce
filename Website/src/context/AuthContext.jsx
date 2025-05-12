import { createContext, useEffect, useReducer } from "react"

const INITIAL_STATE = {
    webuser: JSON.parse(localStorage.getItem('webuser')) || null,
    loading : false,
    error : null
}

export const userInformation = createContext(INITIAL_STATE) 

export const AuthReducer = (state, action) =>{
    switch (action.type) {
        case  'LOGIN_START' :
            return{
                webuser:null,
                loading:true,
                error:null
            } 
        case 'LOGIN_SUCCESS' :
            return{
                webuser : action.payload,
                loading : false,
                error : null
            }
        case 'LOGIN_FAILURE' : 
        return{
            webuser : null,
            loading : false,
            error : action.payload
        }
        case 'LOGOUT' : 
        return{
            webuser : null,
            loading : false,
            error : null
        }
        default :
        return state ;
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state , dispatch] = useReducer(AuthReducer , INITIAL_STATE) ;
    useEffect(()=>{
        localStorage.setItem('webuser',JSON.stringify(state.webuser))
    },[state.webuser])
    return(
        <userInformation.Provider
         value={{
        webuser: state.webuser,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}>
          {children}
      </userInformation.Provider>
    )

}