import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await loginUser({ 
                email: formData.email, 
                password: formData.password 
            });

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError('Connection error. Please check your internet.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const result = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (result.success) {
                setSuccess('Account created! Redirecting...');
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (err) {
            setError('Error connecting to Neon Auth.');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = () => {
        setFormData({
            ...formData,
            email: 'demo@idea2project.com',
            password: 'demo123',
        });
        setTimeout(() => {
            const fakeEvent = { preventDefault: () => {} };
            handleLogin(fakeEvent);
        }, 100);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo">🚀</div>
                    <h1>Idea2Project</h1>
                    <p className="subtitle">
                        {isLogin ? 'Welcome back!' : 'Create your account'}
                    </p>
                </div>

                <div className="toggle-buttons">
                    <button className={`toggle-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>
                        Sign In
                    </button>
                    <button className={`toggle-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>
                        Sign Up
                    </button>
                </div>

                {error && <div className="alert error">{error}</div>}
                {success && <div className="alert success">{success}</div>}

                <form onSubmit={isLogin ? handleLogin : handleRegister} className="login-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••••" />
                        </div>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>

                    {isLogin && (
                        <button type="button" className="demo-btn" onClick={handleDemoLogin} disabled={loading}>
                            🎯 Try Demo Account
                        </button>
                    )}
                </form>

                <div className="login-footer">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;