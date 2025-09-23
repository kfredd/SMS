import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const LogoutButton = () => {
    const { logout } = useAuth();

    const { clearCart } = useCart();

    const handleLogout = () => {
        logout(); // Clear user authentication
        clearCart(); // Reset cart
        localStorage.removeItem(`cart_${user.id}`);
        localStorage.removeItem("cart"); // Remove cart from localStorage
        setUser(null); // Clear user state
        navigate("/"); // Redirect to homepage

    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
};

export default LogoutButton;
