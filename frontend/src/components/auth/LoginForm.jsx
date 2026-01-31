
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [apiStatus, setApiStatus] = useState("checking");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // For demo, always succeed with these credentials
            if (formData.email === "demo@idea2project.com" && formData.password === "demo123") {
                const user = {
                    id: 1,
                    name: "Demo User",
                    email: formData.email,
                    skills: ["React", "Node.js", "JavaScript"],
                    experience: "intermediate"
                };
                
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", "demo-jwt-token");
                
                if (rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                }
                
                // Delay for realistic feel
                setTimeout(() => {
                    alert("🎉 Login successful! Redirecting to dashboard...");
                    navigate("/dashboard");
                    setLoading(false);
                }, 1000);
                
            } else if (!formData.email || !formData.password) {
                setError("Please fill in all fields");
                setLoading(false);
            } else {
                // Auto create demo account
                const newUser = {
                    id: Date.now(),
                    name: formData.email.split('@')[0],
                    email: formData.email,
                    skills: ["React", "JavaScript"],
                    experience: "beginner"
                };
                
                localStorage.setItem("user", JSON.stringify(newUser));
                localStorage.setItem("token", "demo-token-" + Date.now());
                
                setTimeout(() => {
                    alert("🎉 Welcome! Your demo account has been created.");
                    navigate("/dashboard");
                    setLoading(false);
                }, 1000);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    const handleDemoLogin = () => {
        setFormData({
            email: "demo@idea2project.com",
            password: "demo123"
        });
        setRememberMe(true);
        
        // Auto submit after filling
        setTimeout(() => {
            handleSubmit(new Event('submit'));
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            {apiStatus === "offline" && (
                <div style={{
                    backgroundColor: "#fef3c7",
                    color: "#92400e",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <span>⚠️</span>
                    <span>Backend is offline. Using demo mode.</span>
                </div>
            )}

            {/* Email Field */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                    fontWeight: "500",
                    fontSize: "14px"
                }}>
                    Email Address
                </label>
                <div style={{ position: "relative" }}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "14px 14px 14px 45px",
                            border: "1px solid #d1d5db",
                            borderRadius: "10px",
                            fontSize: "16px",
                            boxSizing: "border-box",
                            transition: "all 0.3s"
                        }}
                        placeholder="you@example.com"
                    />
                    <span style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#9ca3af"
                    }}>
                        📧
                    </span>
                </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{
                        color: "#374151",
                        fontWeight: "500",
                        fontSize: "14px"
                    }}>
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() => alert("Use: demo123 for demo account")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#4F46E5",
                            fontSize: "14px",
                            cursor: "pointer",
                            padding: "0"
                        }}
                    >
                        Forgot password?
                    </button>
                </div>
                <div style={{ position: "relative" }}>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "14px 14px 14px 45px",
                            border: "1px solid #d1d5db",
                            borderRadius: "10px",
                            fontSize: "16px",
                            boxSizing: "border-box",
                            transition: "all 0.3s"
                        }}
                        placeholder="••••••••"
                    />
                    <span style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#9ca3af"
                    }}>
                        🔒
                    </span>
                </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                        marginRight: "10px",
                        width: "18px",
                        height: "18px",
                        cursor: "pointer"
                    }}
                />
                <label htmlFor="rememberMe" style={{
                    color: "#374151",
                    fontSize: "14px",
                    cursor: "pointer"
                }}>
                    Remember me for 30 days
                </label>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {/* Login Button */}
            <button
                type="submit"
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: loading ? "#9ca3af" : "#4F46E5",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    marginBottom: "15px",
                    opacity: loading ? 0.7 : 1
                }}
            >
                {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Demo Login Button */}
            <button
                type="button"
                onClick={handleDemoLogin}
                style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginBottom: "25px"
                }}
            >
                🎯 Try Demo Account
            </button>
        </form>
    );
};

export default LoginForm;
