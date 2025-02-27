import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
    "https://yzqvmbqldetynnuovoaa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cXZtYnFsZGV0eW5udW92b2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNDQ5MDUsImV4cCI6MjA1NTkyMDkwNX0.RqKlTYb99bDHc9YrJaVpl9KRkCLg7FPDOxjperIu5wU"
);

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                console.error("Login error:", error.message);
                setMessage(`Login failed: ${error.message}`);
                return;
            }

            if (!data || !data.session) {
                console.error("Unexpected response:", data);
                setMessage("Unexpected error occurred. Please try again.");
                return;
            }

            console.log("Login successful:", data.session);
            navigate("/dashboard"); // Redirect to Dashboard
        } catch (err) {
            console.error("Unhandled login error:", err);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;

