import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords don't match");
    try {
      await axios.post('http://localhost:5000/api/register', { email, password });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input name="password" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input name="confirmPassword" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
