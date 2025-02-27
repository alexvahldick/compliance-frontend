import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";
import Upload from "./components/Upload";

// Initialize Supabase client
const supabase = createClient(
    "https://yzqvmbqldetynnuovoaa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cXZtYnFsZGV0eW5udW92b2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNDQ5MDUsImV4cCI6MjA1NTkyMDkwNX0.RqKlTYb99bDHc9YrJaVpl9KRkCLg7FPDOxjperIu5wU"
);

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error restoring session:", error);
                setUser(null);
            } else {
                setUser(data.user);
            }
            setLoading(false);
        };

        checkSession();

        // Listen for auth changes to keep session updated
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => authListener?.subscription.unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/form" element={user ? <Form /> : <Navigate to="/" />} />
                <Route path="/upload" element={user ? <Upload /> : <Navigate to="/" />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;








