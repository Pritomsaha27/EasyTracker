import Cookies from "js-cookie";
import { useContext,useEffect,useReducer,createContext } from "react";

const UserContext = createContext();

const initialState = {
    name:Cookies.get("username") || "" ,
    loggedIn: !!Cookies.get("username")
};

function userReducer(state,action){
    switch(action.type){
        case "LOGIN":
            return{name: action.payload, loggedIn:true};
        case "LOGOUT":
            return { name: "", loggedIn: false };
            default:
                return state;
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
  
    useEffect(() => {
      if (state.loggedIn) {
        Cookies.set("username", state.name, { expires: 7 }); 
      } else {
        Cookies.remove("username");
      }
    }, [state]);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
          {children}
        </UserContext.Provider>
      );
    };

    export const useUser = () => useContext(UserContext);