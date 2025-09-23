// import React, { createContext, useState, useEffect, useContext } from "react";

// // ✅ Create context
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);  // { id, role, token, etc. }
//     const [loading, setLoading] = useState(true);

//     // Load user from localStorage on mount
//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//         setLoading(false);
//     }, []);

//     // Save user to localStorage on login
//     const login = (userData) => {
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);
//     };

//     const logout = () => {
//         localStorage.removeItem("user");
//         localStorage.removeItem("token"); // ✅ clear token too
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // ✅ Custom hook for cleaner usage
// export const useAuth = () => {
//     return useContext(AuthContext);
// };



import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { token, role, email, firstname }
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // ✅ Store token, role, email, firstname
    const login = (userData) => {
        console.log("Saving user to localStorage:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        console.log("Clearing user from localStorage");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Custom hook for cleaner usage
export const useAuth = () => {
    return useContext(AuthContext);
};
