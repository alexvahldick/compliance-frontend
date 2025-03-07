import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

    // ✅ Restore session on app load
    useEffect(() => {
        const restoreSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error || !session) {
                console.warn("⚠️ No active session found.");
                setUser(null);
            } else {
                console.log("✅ Active session found:", session);
                setUser(session.user);
            }
            setLoading(false);
        };

        restoreSession();

        // ✅ Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(`🔄 Supabase Auth Event: ${event}`, session);
            if (session) {
                setUser(session.user);
            } else {
                console.warn("❌ User signed out. Resetting state.");
                setUser(null);
            }
        });

        return () => authListener.subscription.unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Routes>
            <Route path="/app" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/form" element={user ? <Form /> : <Navigate to="/" />} />
            <Route path="/upload" element={user ? <Upload /> : <Navigate to="/" />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
