import { useContext, useEffect, useReducer, createContext } from "react";

const UserContext = createContext();

const initialState = {
  name: localStorage.getItem("username") || "",
  loggedIn: !!localStorage.getItem("username"),
  balance: Number(localStorage.getItem("balance") || 0),
  income: Number(localStorage.getItem("income") || 0),
  expense: Number(localStorage.getItem("expense") || 0),
};

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, name: action.payload, loggedIn: true };
    case "LOGOUT":
      return { name: "", loggedIn: false, balance: 0, income: 0, expense: 0 };
    case "UPDATE_BALANCE":
      return { ...state, balance: action.payload.balance };
    case "UPDATE_INCOME":
      return { ...state, income: action.payload.income };
    case "UPDATE_EXPENSE":
      return { ...state, expense: action.payload.expense };
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("username", state.name);
    } else {
      localStorage.removeItem("username");
    }
    localStorage.setItem("balance", state.balance);
    localStorage.setItem("income", state.income);
    localStorage.setItem("expense", state.expense);
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
