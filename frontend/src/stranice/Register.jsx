import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/Register.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/server/korisnik/register', { email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <h2 className={styles.title}>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        className={styles.input}
        name="email"
        autoComplete="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        name="password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        className={styles.input}
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button className={styles.button} type="submit">Register</button>
    </form>
  );
}
