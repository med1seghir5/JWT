import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [serverErr, setServerErr] = useState('');
    const navigate = useNavigate();

    const LoginPost = async (e) => {
        e.preventDefault();
        setUsernameErr('');
        setPasswordErr('');
        setServerErr('');

        try {
                await axios.post('http://localhost:3000/login', { Username: username, Password: password }, {
                withCredentials: true
            });

            navigate('/Home');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setServerErr('Invalid username or password');
                } else if (error.response.status === 500) {
                    setServerErr('Internal server error. Please try again later.');
                }
            } else {
                setServerErr('Network error. Please check your connection.');
            }
        }
    }

    return (
        <div className='flex flex-col items-center justify-center space-y-5 bg-gradient-to-r h-screen from-[#47BBE1] to-[#0093D1]'>
            <h1 className='text-6xl'>Login</h1>
            <form className="flex flex-col space-y-4" onSubmit={LoginPost}>
                <div>
                    <h1>Username</h1>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='rounded-lg p-1' 
                        required 
                    />
                    {usernameErr && <p className='text-red-500'>{usernameErr}</p>}
                </div>
                <div>
                    <h1>Password</h1>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='rounded-lg p-1' 
                        required 
                    />
                    {passwordErr && <p className='text-red-500'>{passwordErr}</p>}
                </div>
                <div>
                    <button type="submit" className='rounded-lg border-slate-300 w-20 bg-slate-200 border-2'>
                        Login
                    </button>
                </div>
                {serverErr && <p className='text-red-500'>{serverErr}</p>}
            </form>
        </div>
    );
}

export default Login;

