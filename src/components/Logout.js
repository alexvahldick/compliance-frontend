import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("🚪 Logging out...");

        // Step 1: Sign out from Supabase
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("❌ Logout error:", error.message);
            return;
        }

        console.log("✅ Successfully logged out!");

        // Step 2: Manually clear local storage
        localStorage.removeItem("sb-session");
        localStorage.removeItem("supabase.auth.token");
        sessionStorage.clear();

        // Step 3: Redirect to login and force a full page reload
        navigate("/", { replace: true });
        window.location.reload();
    };

    return (
        <button onClick={handleLogout} style={styles.button}>
            Logout
        </button>
    );
};

const styles = {
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Logout;
