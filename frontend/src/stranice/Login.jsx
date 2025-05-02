import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      if (!email && !password) setError('Email is required\nPassword is required');
      else if (!email) setError('Email is required');
      else setError('Password is required');
      return;
    }

    try {
      const req = await axios.post('http://localhost:5000/server/korisnik/login', { email, password });

      const { data } = req;
      if (data.message === 'Uspješna prijava') {
        localStorage.setItem('user', JSON.stringify(data.korisnik));
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <h2 className={styles.title}>Login</h2>
      {error && error.split('\n').map((msg, i) => (
        <p key={i} className={styles.error}>{msg}</p>
      ))}
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
      <button className={styles.button} type="submit">Login</button>
    </form>
  );
}
