import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

  const backendUrl = "https://pawar-gym-backend.onrender.com" 

// ---------------------------------------------------------------------------

  const [account, setAccount] = useState(() => {
    const savedAccount = sessionStorage.getItem("account")
    return savedAccount ? JSON.parse(savedAccount) : {
      username:"",
      password:"",
    }
  })

  useEffect(() => {
    sessionStorage.setItem("account", JSON.stringify(account))
  },[account])

// ----------------------------------------------------------------------------

  return (

    <DataContext.Provider
      value={{
        backendUrl,
        account,
        setAccount,
      }}
    >
      {children}
    </DataContext.Provider>

  );
};
export default DataProvider;
