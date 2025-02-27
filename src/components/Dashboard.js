import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";

// Initialize Supabase client
const supabase = createClient(
    "https://yzqvmbqldetynnuovoaa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cXZtYnFsZGV0eW5udW92b2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNDQ5MDUsImV4cCI6MjA1NTkyMDkwNX0.RqKlTYb99bDHc9YrJaVpl9KRkCLg7FPDOxjperIu5wU"
);

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error);
                navigate("/"); // Redirect to login if no user session
            } else {
                setUser(data.user);
            }
        };

        getUser();
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? <p>Welcome, {user.email}!</p> : <p>Loading user info...</p>}

            {/* ✅ Use Link instead of <a href=""> to preserve auth state */}
            <Link to="/form">Go to Form</Link>
            <Link to="/upload">Go to Upload</Link>

            <button onClick={async () => {
                await supabase.auth.signOut();
                navigate("/"); // Redirect to login page after logout
            }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;


