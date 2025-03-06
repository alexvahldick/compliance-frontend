import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import supabase from "./supabaseClient";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";
import Upload from "./components/Upload";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            console.log("🔍 Restoring session:", user);

            if (error) {
                console.warn("❌ Error restoring session:", error.message);
            }

            setUser(user || null);
            setLoading(false);
        };

        restoreSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("🔄 Supabase Auth Event:", event, session);
            
            if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                console.log("✅ User is signed in.");
                setUser(session?.user || null);
            } else if (event === "SIGNED_OUT") {
                console.log("❌ User is logged out. Resetting state.");
                setUser(null);
                localStorage.removeItem("sb-session");
                sessionStorage.clear();
            }
        });

        return () => authListener.subscription?.unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />
                <Route path="/form" element={user ? <Form /> : <Navigate to="/" replace />} />
                <Route path="/upload" element={user ? <Upload /> : <Navigate to="/" replace />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
