import { createContext, useState } from "react";

const UserContext = createContext();

function UserContextProvider({ children }) {
    const [user, setUser] = useState();

    const value = {
        user,
        setUser,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider};